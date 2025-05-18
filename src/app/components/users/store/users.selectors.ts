import { createSelector } from '@ngrx/store';
import { IUser, User } from '../user-interface';

interface UsersState {
  users: IUser[];
}
interface AppState {
  users: UsersState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);
