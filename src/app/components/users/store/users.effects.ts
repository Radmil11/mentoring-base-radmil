import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../../../users-api.service';
import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersApi: UsersApiService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        this.usersApi.getUsers().pipe(
          map((users) => UsersActions.set({ users })),
          catchError((error) => of(UsersActions.loadFailure({ error })))
        )
      )
    )
  );
}
