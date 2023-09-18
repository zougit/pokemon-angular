import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-user-detail',
  templateUrl: './dialog-user-detail.component.html',
  styleUrls: ['./dialog-user-detail.component.scss']
})
export class DialogUserDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogUserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(data : any) {
    
    this.dialogRef.close(data);
  }

  onUpdate(data : any) {

  }
}
