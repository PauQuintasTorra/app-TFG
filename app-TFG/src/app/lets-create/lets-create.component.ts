import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Box, Boxes, Wavelet } from '../types';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BoxTypeDialogComponent } from '../box-type-dialog/box-type-dialog.component';
import { ReverseBoxTypeDialogComponent } from '../reverse-box-type-dialog/reverse-box-type-dialog.component';

@Component({
  selector: 'app-lets-create',
  templateUrl: './lets-create.component.html',
  styleUrls: ['./lets-create.component.css'],
})
export class LetsCreateComponent {
  public selectedImage: File = {} as File;
  public isUploaded: boolean = false;
  public isFormatChange: boolean = false;
  public isSent: boolean = false;
  public isImage: boolean = false;
  public nameImage: string = '';
  public imageSrc: string = '';
  public originalFormat: string = '';
  public selectedOption = 'Wavelet';
  public numBoxes = 0;
  public boxes!: Boxes;
  public deletedNum: number[] = [];
  public numBoxesReverse = 0;
  public boxesReverse!: Boxes;
  public deletedNumReverse: number[] = [];
  public isArrowDraw: boolean = false;
  public container: any;
  public processLogger: any = {};

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.boxes = new Boxes();
    this.boxesReverse = new Boxes();
  }

  @ViewChild('boxContainer') boxContainer!: ElementRef;

  validateP() {
    let message = 'FUNCIONA';
    // console.log(this.boxes);
    const lengthComp = this.boxes.box.length;
    const lengthDesc = this.boxesReverse.box.length;
    if (lengthDesc === lengthComp) {
      for (let i = 0; i < lengthComp; i++) {
        const typeComp = this.boxes.box[i].class['type'];
        const typeDesc = this.boxesReverse.box[i].class['type'];

        switch (typeComp) {
          case 'Wavelet':
            if (typeDesc === 'Reverse_Wavelet') {
              const levelComp = this.boxes.box[i].class['waveletLevel'];
              const levelDesc = this.boxesReverse.box[i].class['waveletLevel'];
              const w_typeComp = this.boxes.box[i].class['waveletType'];
              const w_typeDesc = this.boxesReverse.box[i].class['waveletType'];
              if (levelDesc === levelComp) {
                if (w_typeComp !== w_typeDesc) {
                  return (message = 'Wavelet type is not the same');
                }
              } else {
                return (message = 'Wavelet level is not the same');
              }
            } else {
              return (message = 'Inverse module is not a Reverse_Wavelet');
            }
            break;
          case 'Quantizer':
            if (typeDesc === 'Dequantizer') {
              const q_stepComp = this.boxes.box[i].class['q_step'];
              const q_stepDesc = this.boxesReverse.box[i].class['q_step'];
              if (q_stepComp !== q_stepDesc) {
                return (message = 'Quantizer q_step is not the same');
              }
            } else {
              return (message = 'Inverse module is not a Dequantizer');
            }
            break;
          case 'ArithmeticOperation':
            if (typeDesc === 'ArithmeticOperation') {
              const operationTypeComp =
                this.boxes.box[i].class['operationType'];
              const operationTypeDesc =
                this.boxesReverse.box[i].class['operationType'];
              const operationNumberComp =
                this.boxes.box[i].class['operationNumber'];
              const operationNumberDesc =
                this.boxesReverse.box[i].class['operationNumber'];
              if (operationTypeComp === operationTypeDesc) {
                if (operationNumberComp !== operationNumberDesc) {
                  return (message =
                    'ArithmeticOperation number is not the same');
                }
              } else {
                return (message = 'ArithmeticOperation type is not the same');
              }
            } else {
              return (message = 'Inverse module is not a ArithmeticOperation');
            }
            break;
          case 'EntropyEncoder':
            if (typeDesc === 'EntropyDecoder') {
              const entropyTypeComp = this.boxes.box[i].class['encoderType'];
              const entropyTypeDesc =
                this.boxesReverse.box[i].class['decoderType'];
              if (entropyTypeComp !== entropyTypeDesc) {
                return (message = 'EntropyEncoder type is not the same');
              }
            } else {
              return (message = 'Inverse module is not a EntropyDecoder');
            }
        }
      }
    } else {
      return (message =
        'The reverse boxes have to be the same length as the normal boxes');
    }

    console.log(message);
    return message;
  }

  validate() {
    console.log(this.validateP());
  }
  selectImage(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.isUploaded = true;
    let name = this.selectedImage.name.split('.');
    this.nameImage = name[0];
    this.originalFormat = name[name.length - 1];
  }

  executeProcess() {
    if (!this.isArrowDraw) {
      const lastBox = document.getElementById(
        `${this.boxes.box[this.boxes.box.length - 1].numberBox}`
      );
      if (lastBox) {
        const newIcon = document.createElement('i');
        newIcon.classList.add(
          'fa-solid',
          'fa-arrow-right',
          'fa-beat',
          'fa-2xl'
        );
        newIcon.style.position = 'absolute';
        newIcon.style.top = '50%';
        newIcon.style.left = `${parseInt(lastBox.style.width) + 20}px`;
        newIcon.style.transform = 'translateY(-50%)';
        lastBox.appendChild(newIcon);
      }
    }
    console.log(this.boxes);
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('originalFormat', this.originalFormat);
    formData.append('boxes', JSON.stringify(this.boxes.box));

    this.http.post('/api/seeImage', formData).subscribe((data: any) => {
      console.log(data);
      this.isImage = true;
      this.processLogger = data;
      var te = new Blob([JSON.stringify(data)], { type: 'text/plain' });
      const url = window.URL.createObjectURL(te);
      window.open(url);
    });
    this.isSent = true;
    this.isFormatChange = true;
  }

  showImageNewWindow() {
    this.http
      .post('/api/getFinalImage', this.originalFormat)
      .subscribe((data: any) => {
        // this.imageSrc = `data:image/${this.originalFormat};base64,` + data.image;
        const imagen = new Image();
        const imgElement = new Image();
        imagen.src =
          'data:image/' + this.originalFormat + ';base64,' + data.image;
        imagen.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = imagen.naturalWidth;
          canvas.height = imagen.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(imagen, 0, 0);
          const imagenUrl = canvas.toDataURL();
          imgElement.src = imagenUrl;
          const newWindow = window.open(
            '',
            '_blank',
            'width=${screen.availWidth},height=${screen.availHeight}'
          );
          newWindow?.document.write('<html><body></body></html>');
          newWindow?.document.body.appendChild(imgElement);
        };
      });
  }

  // invisible() {
  //   for (let i = 0; i < this.numBoxes; i++) {
  //     const elementToHide = document.getElementById(`${i}`);
  //     if (elementToHide?.style.display){elementToHide.style.display = 'none';}
  //   }
  // }

  // proces(){
  //   for (let i = 0; i < this.numBoxes; i++) {
  //     const elementToHide = document.getElementById(`${i}`);
  //     if (elementToHide?.style.display){elementToHide.style.display = 'flex';}
  //   }
  // }

  openBoxTypeDialogReverse(): void {
    const dialogRef = this.dialog.open(ReverseBoxTypeDialogComponent, {
      width: '400px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.selectedOption = result.type;

        this.executeSelectedOptionReverse(result);
      }
    });
  }

  openBoxTypeDialog(): void {
    const dialogRef = this.dialog.open(BoxTypeDialogComponent, {
      width: '400px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.selectedOption = result.type;

        this.executeSelectedOption(result);
      }
    });
  }

  executeSelectedOptionReverse(resultClass: any) {
    switch (this.selectedOption) {
      case 'Reverse_Wavelet':
        this.createBoxReverse('green', resultClass);
        break;
      case 'ArithmeticOperation':
        this.createBoxReverse('blue', resultClass);
        break;
      case 'Dequantizer':
        this.createBoxReverse('red', resultClass);
        break;
      case 'EntropyDecoder':
        this.createBoxReverse('purple', resultClass);
        break;
      case 'Reverse_Prediction':
        this.createBoxReverse('brown', resultClass);
        break;
      default:
        break;
    }
  }

  createNormalBoxReverse(color: string, resultClass: any) {
    var box = new Box();
    box.numberBox = this.numBoxesReverse;
    box.class = resultClass;
    const newBox = document.createElement('div');
    newBox.id = `R_${this.numBoxesReverse}`;
    newBox.classList.add('dashed-box');
    newBox.style.width = '200px';
    newBox.style.height = '100px';
    newBox.style.position = 'fixed';
    newBox.style.border = '2px dashed ' + color;
    newBox.style.top = '65%';
    newBox.style.left = 200 + this.numBoxesReverse * 250 + 'px';
    newBox.style.transform = 'translateX(-50%)';
    newBox.style.alignItems = 'center';
    newBox.style.justifyContent = 'center';
    newBox.style.display = 'flex';
    newBox.style.flexDirection = 'column';

    this.elementRef.nativeElement.appendChild(newBox);
    box.dashedBox = newBox;
    this.boxesReverse?.box.push(box);

    const newDelete = document.createElement('button');
    newDelete.textContent = 'DELETE';
    newDelete.id = `R_delete_${this.numBoxesReverse}`;
    newDelete.addEventListener('click', () => {
      const parent = newDelete.parentElement;
      parent?.remove();
      this.deleteBoxReverse(parent?.id);
    });

    newDelete.style.position = 'absolute';
    newDelete.style.top = `${parseInt(newBox.style.height) + 20}px`;
    newDelete.style.left = '35%';

    newBox.appendChild(newDelete);

    const span = document.createElement('span');
    span.classList.add('text');
    span.textContent = `${resultClass.type} `;
    span.style.fontWeight = 'bold';
    span.style.color = color;
    newBox.appendChild(span);

    switch (resultClass.type) {
      case 'Reverse_Wavelet':
        const span1w = document.createElement('span');
        span1w.classList.add('text');
        span1w.textContent = `Nivells: ${resultClass.waveletLevel}`;
        span1w.style.fontWeight = 'bold';
        newBox.appendChild(span1w);
        const span2w = document.createElement('span');
        span2w.classList.add('text');
        span2w.textContent = `Tipus: ${resultClass.waveletType}`;
        span2w.style.fontWeight = 'bold';
        newBox.appendChild(span2w);
        break;

      case 'ArithmeticOperation':
        const span1a = document.createElement('span');
        span1a.classList.add('text');
        span1a.textContent = `Valor: ${resultClass.operationNumber}`;
        span1a.style.fontWeight = 'bold';
        newBox.appendChild(span1a);
        const span2a = document.createElement('span');
        span2a.classList.add('text');
        span2a.textContent = `Tipus: ${resultClass.operationType}`;
        span2a.style.fontWeight = 'bold';
        newBox.appendChild(span2a);
        break;

      case 'Dequantizer':
        const span1q = document.createElement('span');
        span1q.classList.add('text');
        span1q.textContent = `Pas de Quantització: ${resultClass.q_step}`;
        span1q.style.fontWeight = 'bold';
        newBox.appendChild(span1q);
        break;

      case 'EntropyDecoder':
        const span1e = document.createElement('span');
        span1e.classList.add('text');
        span1e.textContent = `Tipus: ${resultClass.decoderType}`;
        span1e.style.fontWeight = 'bold';
        newBox.appendChild(span1e);
        break;

      case 'Reverse_Prediction':
        const span1p = document.createElement('span');
        span1p.classList.add('text');
        span1p.textContent = `Tipus: ${resultClass.predictorType}`;
        span1p.style.fontWeight = 'bold';
        newBox.appendChild(span1p);
        break;

      default:
        break;
    }

    if (this.numBoxesReverse <= 3 && this.numBoxesReverse != 0) {
      const newIcon = document.createElement('i');
      newIcon.classList.add('fas', 'fa-plus');
      newIcon.id = `R_icon_${this.numBoxesReverse}`;
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.right = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';
      newBox.appendChild(newIcon);
    } else {
      if (this.numBoxesReverse == 0) {
        this.isArrowDraw = true;
        const newIcon = document.createElement('i');
        newIcon.classList.add(
          'fa-solid',
          'fa-arrow-right',
          'fa-beat',
          'fa-2xl'
        );
        newIcon.style.position = 'absolute';
        newIcon.style.top = '50%';
        newIcon.style.right = `${parseInt(newBox.style.width) + 20}px`;
        newIcon.style.transform = 'translateY(-50%)';
        newBox.appendChild(newIcon);
      }
    }
  }

  createBoxReverse(color: string, resultClass: any) {
    if (this.numBoxesReverse < 4) {
      if (this.deletedNumReverse.length === 0) {
        this.createNormalBoxReverse(color, resultClass);
      } else {
        this.createSpaceBoxReverse(
          this.deletedNumReverse.pop() as number,
          color,
          resultClass
        );
      }
      this.numBoxesReverse++;
    } else {
      alert("You can't create more than 4 boxes");
    }
  }

  createSpaceBoxReverse(numBox: number, color: string, resultClass: any) {
    var box = new Box();
    box.numberBox = numBox;
    box.class = resultClass;
    const newBox = document.createElement('div');
    newBox.id = `R_${numBox}`;
    newBox.classList.add('dashed-box');
    newBox.style.width = '200px';
    newBox.style.height = '100px';
    newBox.style.position = 'fixed';
    newBox.style.border = '2px dashed ' + color;
    newBox.style.top = '65%';
    newBox.style.left = 200 + numBox * 250 + 'px';
    newBox.style.transform = 'translateX(-50%)';
    newBox.style.alignItems = 'center';
    newBox.style.justifyContent = 'center';
    newBox.style.display = 'flex';
    newBox.style.flexDirection = 'column';

    this.elementRef.nativeElement.appendChild(newBox);
    box.dashedBox = newBox;
    this.boxesReverse?.box.splice(numBox, 0, box);

    const newDelete = document.createElement('button');
    newDelete.textContent = 'DELETE';
    newDelete.id = `R_delete_${numBox}`;
    newDelete.addEventListener('click', () => {
      const parent = newDelete.parentElement;
      parent?.remove();
      this.deleteBoxReverse(parent?.id);
    });

    newDelete.style.position = 'absolute';
    newDelete.style.top = `${parseInt(newBox.style.height) + 20}px`;
    newDelete.style.left = '35%';

    newBox.appendChild(newDelete);

    const span = document.createElement('span');
    span.classList.add('text');
    span.textContent = `${resultClass.type} `;
    span.style.fontWeight = 'bold';
    span.style.color = color;
    newBox.appendChild(span);

    switch (resultClass.type) {
      case 'Reverse_Wavelet':
        const span1w = document.createElement('span');
        span1w.classList.add('text');
        span1w.textContent = `Nivells: ${resultClass.waveletLevel}`;
        span1w.style.fontWeight = 'bold';
        newBox.appendChild(span1w);
        const span2w = document.createElement('span');
        span2w.classList.add('text');
        span2w.textContent = `Tipus: ${resultClass.waveletType}`;
        span2w.style.fontWeight = 'bold';
        newBox.appendChild(span2w);
        break;

      case 'ArithmeticOperation':
        const span1a = document.createElement('span');
        span1a.classList.add('text');
        span1a.textContent = `Valor: ${resultClass.operationNumber}`;
        span1a.style.fontWeight = 'bold';
        newBox.appendChild(span1a);
        const span2a = document.createElement('span');
        span2a.classList.add('text');
        span2a.textContent = `Tipus: ${resultClass.operationType}`;
        span2a.style.fontWeight = 'bold';
        newBox.appendChild(span2a);
        break;

      case 'Dequantizer':
        const span1q = document.createElement('span');
        span1q.classList.add('text');
        span1q.textContent = `Pas de Quantització: ${resultClass.q_step}`;
        span1q.style.fontWeight = 'bold';
        newBox.appendChild(span1q);
        break;

      case 'EntropyDecoder':
        const span1e = document.createElement('span');
        span1e.classList.add('text');
        span1e.textContent = `Tipus: ${resultClass.decoderType}`;
        span1e.style.fontWeight = 'bold';
        newBox.appendChild(span1e);
        break;

      case 'Reverse_Prediction':
        const span1p = document.createElement('span');
        span1p.classList.add('text');
        span1p.textContent = `Tipus: ${resultClass.predictorType}`;
        span1p.style.fontWeight = 'bold';
        newBox.appendChild(span1p);
        break;

      default:
        break;
    }

    if (numBox <= 3 && numBox != 0) {
      const newIcon = document.createElement('i');
      newIcon.classList.add('fas', 'fa-plus');
      newIcon.id = `R_icon_${numBox}`;
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.right = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';

      newBox.appendChild(newIcon);
    } else {
      if (numBox == 0) {
        this.isArrowDraw = true;
        const newIcon = document.createElement('i');
        newIcon.classList.add(
          'fa-solid',
          'fa-arrow-right',
          'fa-beat',
          'fa-2xl'
        );
        newIcon.style.position = 'absolute';
        newIcon.style.top = '50%';
        newIcon.style.right = `${parseInt(newBox.style.width) + 20}px`;
        newIcon.style.transform = 'translateY(-50%)';
        newBox.appendChild(newIcon);
      }
    }
  }

  // FUNCTION TO REMOVE
  // const elementToRemove = document.getElementById('my-element');
  // elementToRemove.remove();

  executeSelectedOption(resultClass: any) {
    switch (this.selectedOption) {
      case 'Wavelet':
        this.createBox('green', resultClass);
        break;
      case 'ArithmeticOperation':
        this.createBox('blue', resultClass);
        break;
      case 'Quantizer':
        this.createBox('red', resultClass);
        break;
      case 'EntropyEncoder':
        this.createBox('purple', resultClass);
        break;
      case 'Predictor':
        this.createBox('brown', resultClass);
        break;

      default:
        break;
    }
  }

  createNormalBox(color: string, resultClass: any) {
    var box = new Box();
    box.numberBox = this.numBoxes;
    box.class = resultClass;
    const newBox = document.createElement('div');
    newBox.id = `${this.numBoxes}`;
    newBox.classList.add('dashed-box');
    newBox.style.width = '200px';
    newBox.style.height = '100px';
    newBox.style.position = 'fixed';
    newBox.style.border = '2px dashed ' + color;
    newBox.style.top = '35%';
    newBox.style.left = 200 + this.numBoxes * 250 + 'px';
    newBox.style.transform = 'translateX(-50%)';
    newBox.style.alignItems = 'center';
    newBox.style.justifyContent = 'center';
    newBox.style.display = 'flex';
    newBox.style.flexDirection = 'column';

    this.elementRef.nativeElement.appendChild(newBox);
    box.dashedBox = newBox;
    if (this.boxes.box) {
      this.boxes.box.push(box);
    }

    const newDelete = document.createElement('button');
    newDelete.textContent = 'DELETE';
    newDelete.id = `delete_${this.numBoxes}`;
    newDelete.addEventListener('click', () => {
      const parent = newDelete.parentElement;
      parent?.remove();
      this.deleteBox(parent?.id);
    });

    newDelete.style.position = 'absolute';
    newDelete.style.top = `${parseInt(newBox.style.height) + 20}px`;
    newDelete.style.left = '35%';

    newBox.appendChild(newDelete);

    const span = document.createElement('span');
    span.classList.add('text');
    span.textContent = `${resultClass.type} `;
    span.style.fontWeight = 'bold';
    span.style.color = color;
    newBox.appendChild(span);

    switch (resultClass.type) {
      case 'Wavelet':
        const span1w = document.createElement('span');
        span1w.classList.add('text');
        span1w.textContent = `Nivells: ${resultClass.waveletLevel}`;
        span1w.style.fontWeight = 'bold';
        newBox.appendChild(span1w);
        const span2w = document.createElement('span');
        span2w.classList.add('text');
        span2w.textContent = `Tipus: ${resultClass.waveletType}`;
        span2w.style.fontWeight = 'bold';
        newBox.appendChild(span2w);
        break;

      case 'ArithmeticOperation':
        const span1a = document.createElement('span');
        span1a.classList.add('text');
        span1a.textContent = `Valor: ${resultClass.operationNumber}`;
        span1a.style.fontWeight = 'bold';
        newBox.appendChild(span1a);
        const span2a = document.createElement('span');
        span2a.classList.add('text');
        span2a.textContent = `Tipus: ${resultClass.operationType}`;
        span2a.style.fontWeight = 'bold';
        newBox.appendChild(span2a);
        break;

      case 'Quantizer':
        const span1q = document.createElement('span');
        span1q.classList.add('text');
        span1q.textContent = `Pas de Quantització: ${resultClass.q_step}`;
        span1q.style.fontWeight = 'bold';
        newBox.appendChild(span1q);
        break;

      case 'EntropyEncoder':
        const span1e = document.createElement('span');
        span1e.classList.add('text');
        span1e.textContent = `Tipus: ${resultClass.encoderType}`;
        span1e.style.fontWeight = 'bold';
        newBox.appendChild(span1e);
        break;

      case 'Predictor':
        const span1p = document.createElement('span');
        span1p.classList.add('text');
        span1p.textContent = `Tipus: ${resultClass.predictorType}`;
        span1p.style.fontWeight = 'bold';
        newBox.appendChild(span1p);
        break;

      default:
        break;
    }

    if (this.numBoxes < 3 && this.numBoxes != 0) {
      const newIcon = document.createElement('i');
      newIcon.classList.add('fas', 'fa-plus');
      newIcon.id = `icon_${this.numBoxes}`;
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.right = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';
      newBox.appendChild(newIcon);
    } else {
      if (this.numBoxes == 3) {
        this.isArrowDraw = true;
        const newIconI = document.createElement('i');
        newIconI.classList.add('fas', 'fa-plus');
        newIconI.id = `icon_${this.numBoxes}`;
        newIconI.style.position = 'absolute';
        newIconI.style.top = '50%';
        newIconI.style.right = `${parseInt(newBox.style.width) + 20}px`;
        newIconI.style.transform = 'translateY(-50%)';
        newBox.appendChild(newIconI);
        const newIcon = document.createElement('i');
        newIcon.classList.add(
          'fa-solid',
          'fa-arrow-right',
          'fa-beat',
          'fa-2xl'
        );
        newIcon.style.position = 'absolute';
        newIcon.style.top = '50%';
        newIcon.style.left = `${parseInt(newBox.style.width) + 20}px`;
        newIcon.style.transform = 'translateY(-50%)';
        newBox.appendChild(newIcon);
      }
    }
  }

  createBox(color: string, resultClass: any) {
    if (this.numBoxes < 4) {
      if (this.deletedNum.length == 0) {
        this.createNormalBox(color, resultClass);
      } else {
        this.createSpaceBox(
          this.deletedNum.pop() as number,
          color,
          resultClass
        );
      }
      this.numBoxes++;
    } else {
      alert("You can't create more than 4 boxes");
    }
  }

  createSpaceBox(numBox: number, color: string, resultClass: any) {
    var box = new Box();
    box.numberBox = numBox;
    box.class = resultClass;
    const newBox = document.createElement('div');
    newBox.id = `${numBox}`;
    newBox.classList.add('dashed-box');
    newBox.style.width = '200px';
    newBox.style.height = '100px';
    newBox.style.position = 'fixed';
    newBox.style.border = '2px dashed ' + color;
    newBox.style.top = '35%';
    newBox.style.left = 200 + numBox * 250 + 'px';
    newBox.style.transform = 'translateX(-50%)';
    newBox.style.alignItems = 'center';
    newBox.style.justifyContent = 'center';
    newBox.style.display = 'flex';
    newBox.style.flexDirection = 'column';

    this.elementRef.nativeElement.appendChild(newBox);
    box.dashedBox = newBox;
    this.boxes?.box.splice(numBox, 0, box);

    const newDelete = document.createElement('button');
    newDelete.textContent = 'DELETE';
    newDelete.id = `delete_${numBox}`;
    newDelete.addEventListener('click', () => {
      const parent = newDelete.parentElement;
      parent?.remove();
      this.deleteBox(parent?.id);
    });

    newDelete.style.position = 'absolute';
    newDelete.style.top = `${parseInt(newBox.style.height) + 20}px`;
    newDelete.style.left = '35%';

    newBox.appendChild(newDelete);

    const span = document.createElement('span');
    span.classList.add('text');
    span.textContent = `${resultClass.type} `;
    span.style.fontWeight = 'bold';
    span.style.color = color;
    newBox.appendChild(span);

    switch (resultClass.type) {
      case 'Wavelet':
        const span1w = document.createElement('span');
        span1w.classList.add('text');
        span1w.textContent = `Nivells: ${resultClass.waveletLevel}`;
        span1w.style.fontWeight = 'bold';
        newBox.appendChild(span1w);
        const span2w = document.createElement('span');
        span2w.classList.add('text');
        span2w.textContent = `Tipus: ${resultClass.waveletType}`;
        span2w.style.fontWeight = 'bold';
        newBox.appendChild(span2w);
        break;

      case 'ArithmeticOperation':
        const span1a = document.createElement('span');
        span1a.classList.add('text');
        span1a.textContent = `Valor: ${resultClass.operationNumber}`;
        span1a.style.fontWeight = 'bold';
        newBox.appendChild(span1a);
        const span2a = document.createElement('span');
        span2a.classList.add('text');
        span2a.textContent = `Tipus: ${resultClass.operationType}`;
        span2a.style.fontWeight = 'bold';
        newBox.appendChild(span2a);
        break;

      case 'Quantizer':
        const span1q = document.createElement('span');
        span1q.classList.add('text');
        span1q.textContent = `Pas de Quantització: ${resultClass.q_step}`;
        span1q.style.fontWeight = 'bold';
        newBox.appendChild(span1q);
        break;

      case 'EntropyEncoder':
        const span1e = document.createElement('span');
        span1e.classList.add('text');
        span1e.textContent = `Tipus: ${resultClass.encoderType}`;
        span1e.style.fontWeight = 'bold';
        newBox.appendChild(span1e);
        break;

      case 'Predictor':
        const span1p = document.createElement('span');
        span1p.classList.add('text');
        span1p.textContent = `Tipus: ${resultClass.predictorType}`;
        span1p.style.fontWeight = 'bold';
        newBox.appendChild(span1p);
        break;

      default:
        break;
    }

    if (numBox < 3 && numBox != 0) {
      const newIcon = document.createElement('i');
      newIcon.classList.add('fas', 'fa-plus');
      newIcon.id = `icon_${numBox}`;
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.right = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';

      newBox.appendChild(newIcon);
    } else {
      if (this.numBoxes == 3) {
        this.isArrowDraw = true;
        const newIconI = document.createElement('i');
        newIconI.classList.add('fas', 'fa-plus');
        newIconI.id = `icon_${this.numBoxes}`;
        newIconI.style.position = 'absolute';
        newIconI.style.top = '50%';
        newIconI.style.right = `${parseInt(newBox.style.width) + 20}px`;
        newIconI.style.transform = 'translateY(-50%)';
        newBox.appendChild(newIconI);
        const newIcon = document.createElement('i');
        newIcon.classList.add(
          'fa-solid',
          'fa-arrow-right',
          'fa-beat',
          'fa-2xl'
        );
        newIcon.style.position = 'absolute';
        newIcon.style.top = '50%';
        newIcon.style.left = `${parseInt(newBox.style.width) + 20}px`;
        newIcon.style.transform = 'translateY(-50%)';
        newBox.appendChild(newIcon);
      }
    }
  }

  deleteBoxReverse(id: any) {
    const id_split = id.split('_')[1];
    if (id_split === 0) {
      this.isArrowDraw = false;
    }
    this.numBoxesReverse -= 1;
    let position = -1;
    for (let i = 0; i < this.boxesReverse.box.length; i++) {
      if (this.boxesReverse.box[i].numberBox == id_split) {
        position = i;
      }
    }
    if (position != -1) {
      this.boxesReverse?.box.splice(position, 1);
    }
    this.deletedNumReverse.push(parseInt(id_split));
    if (this.numBoxesReverse === 0) {
      this.deletedNumReverse = [];
    }
  }

  deleteBox(id: any) {
    if (id == 3) {
      this.isArrowDraw = false;
    }
    this.numBoxes -= 1;
    let position = -1;
    for (let i = 0; i < this.boxes.box.length; i++) {
      if (this.boxes.box[i].numberBox == id) {
        position = i;
      }
    }
    if (position != -1) {
      this.boxes?.box.splice(position, 1);
    }
    this.deletedNum.push(parseInt(id));
    if (this.numBoxes === 0) {
      this.deletedNum = [];
    }
  }

  deleteAll() {
    this.deletedNum = [];
    this.deletedNumReverse = [];
    this.imageSrc = '';
    for (let i = 0; i < 4; i++) {
      const elementToRemove = document.getElementById(`${i}`);
      elementToRemove?.remove();
    }
    for (let i = 0; i < 4; i++) {
      const elementToRemove = document.getElementById(`R_${i}`);
      elementToRemove?.remove();
    }
    this.isArrowDraw = false;
    this.numBoxes = 0;
    this.numBoxesReverse = 0;
    this.boxes.deleteBoxes();
    this.boxesReverse.deleteBoxes();
  }
}
