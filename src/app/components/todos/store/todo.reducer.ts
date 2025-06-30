import { createReducer, on } from '@ngrx/store';
import { Todo } from '../todo-interface';
import { TodosActions } from './todos.actions';

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,

  on(TodosActions.set, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(TodosActions.edit, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((todo) => (todo.id === todo.id ? todo : todo)),
  })),

  on(TodosActions.create, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),

on(TodosActions.delete, (state, { id }) => ({
  ...state,
  todos: state.todos.filter((todo) => todo.id !== id),
})));
