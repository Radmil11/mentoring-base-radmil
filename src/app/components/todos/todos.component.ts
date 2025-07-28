import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../../todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from './todo-interface';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import {
  selectError,
  selectLoading,
  selectTodos,
} from './store/todos.selectors';
import { TodosActions } from './store/todos.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  readonly todosApiService = inject(TodosApiService);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);
  public readonly loading$ = this.store.select(selectLoading);
  public readonly error$ = this.store.select(selectError);
  public readonly errorMsg$ = this.error$.pipe(
    map((error) => {
      if (!error) return null;
      if (typeof error === 'object' && 'message' in error) {
        return (error as any).message;
      }
      return JSON.stringify(error);
    })
  );

  constructor() {
    this.store.dispatch(TodosActions.load());
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  }

  createTodo(formItem: Todo) {
    this.store.dispatch(
      TodosActions.create({
        todo: {
          id: new Date().getTime(),
          title: formItem.title,
          userId: formItem.userId,
          completed: formItem.completed,
        },
      })
    );
  }
}
