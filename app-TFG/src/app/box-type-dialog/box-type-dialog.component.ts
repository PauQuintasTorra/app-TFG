import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-box-type-dialog',
  templateUrl: './box-type-dialog.component.html',
  styleUrls: ['./box-type-dialog.component.css'],
})
export class BoxTypeDialogComponent {
  selectedBoxType: string = 'Wavelet';
  inputValue: string = '';
  operationNumber: number = 1;
  waveletLevel: number = 0;
  q_step: number = 1;
  operationType: string = 'Add';
  waveletType: string = 'Haar';
  encoderType: string = 'Zip';
  predictorType: string = '1';
  returner: any = { type: '' };

  constructor(
    public dialogRef: MatDialogRef<BoxTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.returner.type = this.selectedBoxType;
    switch (this.selectedBoxType) {
      case 'Wavelet':
        this.returner.waveletType = this.waveletType;
        this.returner.waveletLevel = this.waveletLevel;
        break;

      case 'ArithmeticOperation':
        this.returner.operationType = this.operationType;
        this.returner.operationNumber = this.operationNumber;
        break;

      case 'Quantizer':
        this.returner.q_step = this.q_step;
        break;

      case 'EntropyEncoder':
        this.returner.encoderType = this.encoderType;
        break;

      case 'Predictor':
        this.returner.predictorType = this.predictorType;
        break;

      default:
        break;
    }

    this.dialogRef.close(this.returner);
  }
}
