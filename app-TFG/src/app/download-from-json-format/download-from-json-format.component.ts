import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-download-from-json-format',
  templateUrl: './download-from-json-format.component.html',
  styleUrls: ['./download-from-json-format.component.css']
})
export class DownloadFromJsonFormatComponent {
  selectedFormat: string = 'xlsx';
  
  constructor(
    public dialogRef: MatDialogRef<DownloadFromJsonFormatComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.selectedFormat);
  }
}
