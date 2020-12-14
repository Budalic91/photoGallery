import { User } from '../user';
import { createFeatureSelector, createSelector, createReducer, on} from '@ngrx/store';
import * as UserActions from './user.actions';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
    users: UserState
}

export interface UserState {
    currentUser: User;
}

const initialState: UserState = {
    currentUser: null
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

// reducer
export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.setCurrentUser, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user
        }
    })
)
