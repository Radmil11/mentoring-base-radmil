import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { ICreateUser, IUser } from './user-interface';
import { UsersService } from '../../users.service';
import { CreateUserFormComponent } from '../create-user-form/create-user-form-component';

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
  readonly usersService = inject(UsersService);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: IUser[]) => {
      this.usersService.setUsers(response);
    });
  }

  public deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  editUser(user: IUser) {
    this.usersService.editUser({
      ...user,
      company: {
        name:user.companyName,
      },
    });
  }

  public createUser(formData: ICreateUser) {
    this.usersService.createUser({
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
  }
}