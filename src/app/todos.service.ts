import { Injectable } from '@angular/core';
import { Todo } from './components/todos/todo-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {

  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos);
  }

  editTodo(editedTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo) => {
        return todo.id === editedTodo.id ? editedTodo : todo;
      })
    );
  }

  createTodos(todo: Todo) {
    const existingTodo = this.todosSubject$.value.find(
      (currentElement) => currentElement.title === todo.title
    );

    if(existingTodo !== undefined) {
      alert('Такая задача уже зарегистрирована');
    } else {
      this.todosSubject$.next([...this.todosSubject$.value, todo]);
      alert('Задача успешно добавлена')
  }
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((Todo) => {
        return id !== Todo.id;
      })
    );
  }
}