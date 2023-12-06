import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const logout = createAction('[Auth] Logout');

export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);

export const UserActions = {
  login,
  loginSuccess,
  loginFailure,
  logout,
  register,
};
