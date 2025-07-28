import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../todo-interface';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    load: emptyProps(),
    set: props<{ todos: Todo[] }>(),
    loadFailure: props<{ error: unknown }>(),
    edit: props<{ todo: Todo }>(),
    create: props<{ todo: Todo }>(),
    delete: props<{ id: number }>(),
  },
});
