import { createAction, props } from '@ngrx/store';
import { User } from '../user'

export const setCurrentUser = createAction(
    '[User] Set Current User',
    props<{user: User}>()
)