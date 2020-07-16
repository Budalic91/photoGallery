import { Component, OnInit } from "@angular/core";
import { Album } from './album-list';
import { AlbumListService } from './album-list.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, getIsRowsCheckedAlbum } from '../state/album.reducer';
import * as AlbumActions from '../state/album.actions';
import { getCurrentUser } from 'src/app/user/state/user.reducer';

@Component({
    templateUrl: './album-list.component.html',
    styleUrls: ['../album.style.scss']
})
export class AlbumListComponent implements OnInit {
   constructor(private albumListService: AlbumListService,
                private router: Router,
                private store: Store<State>)
   {}

    isRowsCheckedAlbum: boolean;
    albumLists: Album[];
    user = null;
    
    ngOnInit():void {
        this.store.select(getCurrentUser).subscribe(
            currentUser => {
                this.user = currentUser;

                if (this.user == null)
                {
                    this.router.navigate(['/login'])
                }
            }
        );
        this.loadAlbumLists();
        
        this.store.select(getIsRowsCheckedAlbum).subscribe(
            isRowsCheckedAlbum => this.isRowsCheckedAlbum = isRowsCheckedAlbum
        );
    }

    loadAlbumLists()
    {
        this.albumListService.getListOfAlbums().subscribe((data) => {
            this.albumLists = data;
        })
    }

    toggleButtonChanged(): void {
        this.store.dispatch(AlbumActions.toggleRowsButton());
    }

    openAlbum(albumId)
    {
        this.router.navigate(['/album/album/'+albumId]);
    }
}