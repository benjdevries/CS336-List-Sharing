import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  id: number;
  title: string;
  selectedList: string;

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.selectedList = data.selectedList
  }

  // Close the dialog box without doing anything
  close(): void {
    this.dialogRef.close();
  }

  // Close the dialog box by sending the delete message
  delete(): void {
    this.dialogRef.close("delete")
  }

  ngOnInit(): void {
  }

}
