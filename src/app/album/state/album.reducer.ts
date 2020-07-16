import { createReducer, createAction, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { Album } from '../album-list/album-list';
import * as AppState from '../../state/app.state';
import * as AlbumActions from './album.actions';

export interface State extends AppState.State {
    albums: AlbumState
}

export interface AlbumState {
    isRowsCheckedAlbum: boolean;
    albums: Album[];
}

const initialState: AlbumState = {
    isRowsCheckedAlbum: false,
    albums: []
}

const getAlbumFeatureState = createFeatureSelector<AlbumState>('albums');

export const getIsRowsCheckedAlbum = createSelector(
    getAlbumFeatureState,
    state => state.isRowsCheckedAlbum
)

export const getAlbums = createSelector(
    getAlbumFeatureState,
    state => state.albums
)

export const albumReducer = createReducer<AlbumState>(
    initialState,
    on(AlbumActions.toggleRowsButton, (state): AlbumState => {
        // console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            isRowsCheckedAlbum: !state.isRowsCheckedAlbum
        }

    })
);