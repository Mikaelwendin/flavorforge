import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(UserActions.loginFailure, (state) => ({ ...state, user: null }))
);
