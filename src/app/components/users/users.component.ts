import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { ICreateUser, IUser } from './user-interface';
import { CreateUserFormComponent } from '../create-user-form/create-user-form-component';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import {
  selectError,
  selectLoading,
  selectUsers,
} from './store/users.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);
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
    this.store.dispatch(UsersActions.load());
  }

  public deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  public editUser(user: IUser) {
    ({
      ...user,
      company: {
        name: user.companyName,
      },
    });
    this.store.dispatch(UsersActions.edit({ user }));
  }

  public createUser(formData: ICreateUser) {
    ({
      phone: formData.phone,
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName,
      },
      companyName: formData.companyName,
    });
    this.store.dispatch(
      UsersActions.create({
        user: {
          phone: formData.phone,
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          companyName: formData.companyName,
          company: {
            name: formData.companyName,
          },
        },
      })
    );
  }
}
