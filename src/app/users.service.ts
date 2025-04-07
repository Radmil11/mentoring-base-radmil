import { Injectable } from '@angular/core';
import { IUser } from './components/users/user-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public users$ = this.usersSubject$.asObservable();

  setUsers(users: IUser[]) {
    this.usersSubject$.next(users);
  }

  editUser(editedUser: IUser) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user) => {
        return user.id === editedUser.id ? editedUser : user;
      })
    );
  }

  createUser(user: IUser) {
    const existingUser = this.usersSubject$.value.find(
      (currentElement) => currentElement.email === user.email
    );
    if (existingUser !== undefined ) {
      alert('ТАКОЙ EMAIL ЗАРЕГИСТРИРОВАН');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert('НОВЫЙ ЮЗЕР УСПЕШНО ДОБАВЛЕН');
    }
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: IUser) => {
        return id !== user.id;
      })
    );
  }
}
