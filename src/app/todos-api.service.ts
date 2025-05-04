import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from './components/todos/todo-interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosApiService {

  readonly apiservise = inject(HttpClient);
  getTodos(): Observable<Todo[]> {
    return this.apiservise.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
}
