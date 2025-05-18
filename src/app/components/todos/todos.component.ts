import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../../todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from './todo-interface';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { selectTodos } from './store/todos.selectors';
import { TodosActions } from './store/todos.actions';
import { Store } from '@ngrx/store';

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

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.store.dispatch(TodosActions.set({ todos: response }));
    });
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
