import { createSelector } from '@ngrx/store';
import { Todo } from '../todo-interface';
import { TodosState } from './todo.reducer';

interface AppState {
  todos: TodosState;
}

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodosState) => state.todos
);

export const selectLoading = createSelector(
  selectTodosFeature,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTodosFeature,
  (state) => state.error
);
