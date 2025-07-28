import { createSelector } from '@ngrx/store';
import { IUser, User } from '../user-interface';
import { UsersState } from './users.reducer';

interface AppState {
  users: UsersState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);

export const selectLoading = createSelector(
  selectUsersFeature,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUsersFeature,
  (state) => state.error
);
