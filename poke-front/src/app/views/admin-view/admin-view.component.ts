import { Component, OnInit, afterNextRender, afterRender } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserDetailComponent } from 'src/app/components/dialog/dialog-user-detail/dialog-user-detail.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService, public dialog: MatDialog) {
    afterRender(() => {
      console.log(this.users);
    });
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((x) => (this.users = x.data));
  }

  onClick(user: User) {
    const dialogRef = this.dialog.open(DialogUserDetailComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
