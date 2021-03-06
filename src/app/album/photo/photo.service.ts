import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Photo } from './photo';
import { pipe, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    constructor(private http: HttpClient) {}

    private albumUrl = "https://jsonplaceholder.typicode.com/photos/?albumId=";

    getPhotoByAlbumId(id): Observable<Photo[]>
    {
        return this.http.get<Photo[]>(this.albumUrl+id)
            .pipe(
                tap(),
                catchError(this.handleError)
            )
    }

    private handleError(err: any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }
}