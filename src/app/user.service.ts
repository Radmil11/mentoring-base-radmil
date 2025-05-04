import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserRole {
  name: string;
  email: string;
  isAdmin: boolean | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<UserRole | null>(null);
  public readonly user$ = this.userSubject$.asObservable();

  private user: UserRole = {
    name: 'Ильнур',
    email: 'gmail.com',
    isAdmin: null,
  };

  loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  logout() {
    this.userSubject$.next(null);
  }
}
