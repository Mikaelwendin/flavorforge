import { createReducer, on } from '@ngrx/store';
import { initialState, login, logout, register } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ user, isLoggedIn: true })),
  on(register, (state, { user }) => ({ user, isLoggedIn: true })),
  on(logout, () => initialState)
);
