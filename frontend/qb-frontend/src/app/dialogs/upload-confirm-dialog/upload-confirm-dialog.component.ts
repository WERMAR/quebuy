import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-upload-confirm-dialog',
  templateUrl: './upload-confirm-dialog.component.html',
  styleUrls: ['./upload-confirm-dialog.component.css']
})
export class UploadConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UploadConfirmDialogComponent>) {
  }

  ngOnInit(): void {

  }

  onDenied() {
    this.dialogRef.close(false)
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
