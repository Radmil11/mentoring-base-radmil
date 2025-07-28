import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './components/users/store/users.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './components/todos/store/todo.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './components/users/store/users.effects';
import { TodosEffects } from './components/todos/store/todos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(UsersEffects),
    provideEffects(TodosEffects),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      users: userReducer,
      todos: todoReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
