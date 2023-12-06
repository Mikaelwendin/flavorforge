import { User } from './user.model';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};
