import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dialog-user-detail',
  templateUrl: './dialog-user-detail.component.html',
  styleUrls: ['./dialog-user-detail.component.scss'],
})
export class DialogUserDetailComponent {
  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogUserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    console.log("test");
    
    this.userService
      .deleteUser(this.data)
      .subscribe((x) => this.dialogRef.close(this.data));
  }
}
