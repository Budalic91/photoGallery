import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumComponent } from './photo/photo.component';
import { FilterPipe } from './filter.pipe';
import { StoreModule } from '@ngrx/store';
import { albumReducer } from './state/album.reducer';

const albumRoutes: Routes = [
    {   
        path: 'albumlist',
        component: AlbumListComponent
    },
    {
        path: 'album/:id',
        component: AlbumComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(albumRoutes),
        StoreModule.forFeature('albums', albumReducer)
    ],
    declarations: [
        AlbumListComponent,
        AlbumComponent,
        FilterPipe
    ]
})
export class AlbumModule { }