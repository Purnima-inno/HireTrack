// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-confirmation-popup',
//   imports: [],
//   templateUrl: './confirmation-popup.html',
//   styleUrl: './confirmation-popup.scss'
// })
// export class ConfirmationPopup {

// }

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  name: string;
}
@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  templateUrl: './confirmation-popup.html',
  styleUrls: ['./confirmation-popup.scss'],
  imports: [CommonModule, MatDialogModule]
})


 export class ConfirmationPopup  {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopup>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
