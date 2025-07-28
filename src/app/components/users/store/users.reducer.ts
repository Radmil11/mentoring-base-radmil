import { createReducer, on } from '@ngrx/store';
import { IUser } from '../user-interface';
import { UsersActions } from './users.actions';

export interface UsersState {
  users: IUser[];
  loading: boolean;
  error: unknown | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  on(UsersActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersActions.set, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),

  on(UsersActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.edit, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),

  on(UsersActions.create, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(UsersActions.delete, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== id),
  }))
);
