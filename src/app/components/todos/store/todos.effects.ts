import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosApiService } from '../../../todos-api.service';
import { TodosActions } from './todos.actions';
import { catchError, map, switchMap } from 'rxjs';
import { UsersActions } from '../../users/store/users.actions';
import { of } from 'rxjs';

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosApi: TodosApiService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.load),
      switchMap(() =>
        this.todosApi.getTodos().pipe(
          map((todos) => TodosActions.set({ todos })),
          catchError((error) => of(TodosActions.loadFailure({ error })))
        )
      )
    )
  );
}
