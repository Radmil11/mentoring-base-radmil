import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrangeDirective } from '../directives/orange.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../auth/auth.component';
import { UserService } from '../../user.service';

const menuItems: string[] = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems: string[] = menuItems.map((item: string): string => {
  return item.toUpperCase();
});

const newPages: number[] = [5, 4, 3, 2, 1];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, OrangeDirective, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);
  public readonly userService = inject (UserService)

  isShowCatalog = false;

  isShowImg: boolean = true;

  readonly headerItem1 = 'Главная';

  readonly headerItem3 = 'Каталог';

  readonly header2Item1 = upperCaseMenuItems[0];

  readonly header2Item2 = 'Cтройматериалы';

  readonly header2Item3 = 'Инструменты';

  readonly header2Item4 = 'Электрика';

  readonly header2Item5 = 'Интерьер и одежда';

  readonly aboutCompany = 'О компании';

  readonly users = 'Пользователи';

  readonly todos = 'Задачи';

  readonly admin = 'Админка';

  readonly newPages: number[] = newPages;

  menuItems: string[] = upperCaseMenuItems;

  isUpperCase = true;

  currentDate: Date = new Date();

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );

    this.isUpperCase = !this.isUpperCase;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === "admin") {
        this.userService.loginAsAdmin()
      }else if (result === "user") {
        this.userService.loginAsUser()
      } else return undefined;
    });
  }

  public logout() {
    if (confirm('вы точно хотите выйти ?')) {
  return this.userService.logout();
  }
  else return false;
}
}
