import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../user-interface';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(),
    set: props<{ users: IUser[] }>(),
    loadFailure: props<{ error: unknown }>(),
    edit: props<{ user: IUser }>(),
    create: props<{ user: IUser }>(),
    delete: props<{ id: number }>(),
  },
});
