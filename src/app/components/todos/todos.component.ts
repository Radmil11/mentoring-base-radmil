import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../../todos-api.service';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from './todo-interface';
import { TodosService } from '../../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';

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
  readonly todosService = inject(TodosService);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  createTodo(formItem: Todo) {
    this.todosService.createTodos({
      id: new Date().getTime(),
      title: formItem.title,
      userId: formItem.userId,
      completed: formItem.completed,
    });
  }
}
