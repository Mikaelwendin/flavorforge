import { createAction, props } from '@ngrx/store';

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface User {
  username: string;
  items: string[];
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

export const login = createAction('[Auth] Login', props<{ user: User }>());
export const register = createAction(
  '[Auth] Register',
  props<{ user: User }>()
);
export const logout = createAction('[Auth] Logout');
