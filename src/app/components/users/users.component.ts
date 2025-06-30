import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { ICreateUser, IUser } from './user-interface';
import { CreateUserFormComponent } from '../create-user-form/create-user-form-component';
import { select, Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { selectUsers } from './store/users.selectors';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers)

  constructor() {
    this.usersApiService.getUsers().subscribe((response: IUser[]) => {
      this.store.dispatch(UsersActions.set({users: response}));
    });
  }

  public deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete ({ id }));

  }

  editUser(user: IUser) {({
      ...user,
      company: {
        name:user.companyName,
      },
    });
    this.store.dispatch(UsersActions.edit({user}));
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
    this.store.dispatch(UsersActions.create({
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
  }));
  }
}
