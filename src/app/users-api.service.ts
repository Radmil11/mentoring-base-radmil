import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from './components/users/user-interface';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  
  readonly apiservise = inject(HttpClient);
  getUsers() {
    return this.apiservise.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
