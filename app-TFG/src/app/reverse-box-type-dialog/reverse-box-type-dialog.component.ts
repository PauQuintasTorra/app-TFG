import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reverse-box-type-dialog',
  templateUrl: './reverse-box-type-dialog.component.html',
  styleUrls: ['./reverse-box-type-dialog.component.css'],
})
export class ReverseBoxTypeDialogComponent {
  selectedBoxType: string = 'Reverse_Wavelet';
  inputValue: string = '';
  operationNumber: number = 1;
  waveletLevel: number = 1;
  q_step: number = 1;
  operationType: string = 'Add';
  waveletType: string = 'Haar';
  decoderType: string = 'Zip';
  predictorType: string = '1';
  returner: any = { type: '' };

  constructor(
    public dialogRef: MatDialogRef<ReverseBoxTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.returner.type = this.selectedBoxType;
    switch (this.selectedBoxType) {
      case 'Reverse_Wavelet':
        this.returner.waveletType = this.waveletType;
        this.returner.waveletLevel = this.waveletLevel;
        break;

      case 'ArithmeticOperation':
        this.returner.operationType = this.operationType;
        this.returner.operationNumber = this.operationNumber;
        break;

      case 'Dequantizer':
        this.returner.q_step = this.q_step;
        break;

      case 'EntropyDecoder':
        this.returner.decoderType = this.decoderType;
        break;

      case 'Reverse_Prediction':
        this.returner.predictorType = this.predictorType;
        break;
      default:
        break;
    }

    this.dialogRef.close(this.returner);
  }
}
