import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { IUser } from '../user-interface';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  imports: [MatDialogModule],
  standalone: true,
})
export class UserCardComponent {
  @Input()
  public user!: IUser;

  @Output()
  public deleteUser = new EventEmitter<number>();

  @Output()
  public editUser = new EventEmitter();

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult: IUser | undefined) => {

      if (editResult) {
        this.editUser.emit(editResult);

        this.snackBar.open('Пользователь обновлён', 'ОК', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Редактирование отменено', '', {
          duration: 3000,
        });
      }
    });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: IUser | undefined) => {
      if (result) {
        this.deleteUser.emit(this.user.id);
        this.snackBar.open('Пользователь удален', 'ОК', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена удаления', '', {
          duration: 3000,
        });
      }
    });
  }
}
