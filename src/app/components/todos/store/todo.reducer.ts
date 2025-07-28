import { createReducer, on } from '@ngrx/store';
import { Todo } from '../todo-interface';
import { TodosActions } from './todos.actions';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: unknown | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = createReducer(
  initialState,

  on(TodosActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosActions.set, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    error: null,
  })),

  on(TodosActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TodosActions.edit, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  })),

  on(TodosActions.create, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),

  on(TodosActions.delete, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }))
);
