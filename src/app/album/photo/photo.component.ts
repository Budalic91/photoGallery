import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from './photo.service';
import { Photo } from './photo';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/material-components/dialog/dialog.component';
import { getCurrentUser } from 'src/app/user/state/user.reducer';
import { State, getIsRowsCheckedAlbum } from '../state/album.reducer';
import { Store } from '@ngrx/store';
import * as AlbumActions from '../state/album.actions';

@Component({
    templateUrl: './photo.component.html',
    styleUrls: ['../album.style.scss']
})
export class AlbumComponent implements OnInit {
    albumId;
    albumPhotos: Photo[];
    isRowsChecked = false;
    searchTerm = "";
    user = null;

    constructor(private activatedRoute: ActivatedRoute,
                private albumService: AlbumService,
                private dialog: MatDialog,
                private router: Router,
                private store: Store<State>){
        this.albumId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.store.select(getCurrentUser).subscribe(
            currentUser => {
                this.user = currentUser;

                if (this.user == null)
                {
                    this.router.navigate(['/login'])
                }
            }
        );

        this.store.select(getIsRowsCheckedAlbum).subscribe(
            isRowsCheckedAlbum => this.isRowsChecked = isRowsCheckedAlbum
        );
        
        this.loadAlbumPhoto(this.albumId);
    }

    loadAlbumPhoto(id)
    {
        this.albumService.getPhotoByAlbumId(id).subscribe(data => {
            this.albumPhotos = data;
        })
    }

    openImage(obj, totalPhotos) {
        let dataObj = {
            albumId: obj.albumId,
            photo: obj,
            totalPhoto: totalPhotos
        
        }

        const dialogRef = this.dialog.open(DialogComponent, {
            width: "100%",
            data: dataObj,
            disableClose:true,
            panelClass: 'full-screen-modal'
        })
    }

    toggleButtonChanged(): void {
        this.store.dispatch(AlbumActions.toggleRowsButton());
    }

    removePhoto(id)
    {
        this.albumPhotos.splice(id,1);
    }

    backToAlbums() 
    {
        this.router.navigate(['album/albumlist'])
    }
}