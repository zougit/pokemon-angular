import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-poke',
  templateUrl: './dialog-poke.component.html',
  styleUrls: ['./dialog-poke.component.scss']
})
export class DialogPokeComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPokeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data : any) {
    this.dialogRef.close(data);
  }
}
