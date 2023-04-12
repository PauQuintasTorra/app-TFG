import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Box, Boxes, Wavelet } from '../types';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BoxTypeDialogComponent } from '../box-type-dialog/box-type-dialog.component';

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
  public nameImage: string = '';
  public imageSrc: string = "";
  public originalFormat: string = '';

  constructor(private elementRef: ElementRef, private http: HttpClient, private dialog: MatDialog) {
    this.boxes = new Boxes;
  }

  @ViewChild('boxContainer') boxContainer!: ElementRef;

  selectedOption = 'Wavelet';
  numBoxes = 0;
  boxes!: Boxes;
  operatorBox: any;
  deletedNum: number[] = [];


  selectImage(event: any) {
    this.selectedImage = <File>event.target.files[0];
    this.isUploaded = true;
    let name = this.selectedImage.name.split('')
    this.nameImage = name[0];
    this.originalFormat = name[name.length - 1];
  }
  
  seePhoto() {
    console.log(this.boxes)
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('originalFormat', this.originalFormat);
    formData.append('boxes', JSON.stringify(this.boxes.box));

    this.http.post('/api/seeImage', formData).subscribe((data: any) => {
      // this.imageSrc = `data:image/${this.originalFormat};base64,` + data.image;
    })
    this.isSent = true;
    this.isFormatChange = true;
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
  
  executeSelectedOption(resultClass: any) {
    switch (this.selectedOption) {
      case 'Wavelet':
        this.operatorBox = new Wavelet();
        this.createBox('green', resultClass);
        break;
      case 'ArithmeticOperation':
        this.createBox('blue', resultClass);
        break;
      case 'Quantizer':
        this.createBox('red', resultClass);
        break;
      default:
        break;
    }
  }

  // FUNCTION TO REMOVE
  // const elementToRemove = document.getElementById('my-element');
  // elementToRemove.remove();

  createNormalBox(color: string, resultClass: any){
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
    this.elementRef.nativeElement.appendChild(newBox);
    box.dashedBox = newBox;
    this.boxes?.box.push(box);

    const newDelete = document.createElement('button');
    // establece las propiedades del icono
    newDelete.textContent = 'DELETE';
    newDelete.id = `delete_${this.numBoxes}`;
    newDelete.addEventListener('click', () =>{
      const parent = newDelete.parentElement;
      parent?.remove();
      this.deleteBox(parent?.id);
    })

    newDelete.style.position = 'absolute';
    newDelete.style.top = `${parseInt(newBox.style.height) + 20}px`;
    newDelete.style.left = '35%';

    newBox.appendChild(newDelete);

    const span = document.createElement('span');
    span.classList.add('text');
    span.style.display = 'inline-block';
    span.style.textAlign = 'center';
    span.style.left = `${parseInt(newBox.style.width)/2}px`;
    span.textContent = `${resultClass.type}`;
    newBox.appendChild(span);
    
    // switch (resultClass.type) {
    //   case 'wavelet':
    //     span.textContent = `
    //       Tipus: Wavelet
    //       ${resultClass.wavelet}
    //     `;
    //     break;
    
    //   default:
    //     break;
    // }

    if (this.numBoxes < 3) {
      const newIcon = document.createElement('i');
      newIcon.classList.add('fas', 'fa-plus');
      // establece las propiedades del icono
      newIcon.id = `icon_${this.numBoxes}`;
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.left = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';

      newBox.appendChild(newIcon);
    } else {
      const newIcon = document.createElement('i');
      newIcon.classList.add(
        'fa-solid',
        'fa-arrow-right',
        'fa-beat',
        'fa-2xl'
      );
      // establece las propiedades del icono
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.left = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';
      newBox.appendChild(newIcon);
    }
  }

  createBox(color: string, resultClass: any) {
    if (this.numBoxes < 4) {
      if(this.deletedNum.length == 0){
        this.createNormalBox(color, resultClass);
      } else {
        this.createSpaceBox(this.deletedNum.pop() as number, color, resultClass );
      } 
      this.numBoxes++;
    } else {
      alert("You can't create more than 4 boxes");
    }


    
  }

  createSpaceBox(numBox: number, color: string, resultClass: any){
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
    this.elementRef.nativeElement.appendChild(newBox);
    box.dashedBox = newBox;
    this.boxes?.box.splice(numBox, 0, box);

    const newDelete = document.createElement('button');
    // establece las propiedades del icono
    newDelete.textContent = 'DELETE';
    newDelete.id = `delete_${numBox}`;
    newDelete.addEventListener('click', () =>{
      const parent = newDelete.parentElement;
      parent?.remove();
      this.deleteBox(parent?.id);
    })

    newDelete.style.position = 'absolute';
    newDelete.style.top = `${parseInt(newBox.style.height) + 20}px`;
    newDelete.style.left = '35%';

    newBox.appendChild(newDelete);

    if (numBox != 3) {
      const newIcon = document.createElement('i');
      newIcon.classList.add('fas', 'fa-plus');
      // establece las propiedades del icono
      newIcon.id = `icon_${numBox}`;
      newIcon.style.position = 'absolute';
      newIcon.style.top = '50%';
      newIcon.style.left = `${parseInt(newBox.style.width) + 20}px`;
      newIcon.style.transform = 'translateY(-50%)';

      newBox.appendChild(newIcon);
    } else {
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

  deleteBox(id: any){
    this.numBoxes -= 1;
    this.boxes?.box.splice(id, 1);
    this.deletedNum.push(parseInt(id));
  }

  deleteAll(){
    console.log(this.boxes)
    for (let i = 0; i < this.numBoxes; i++){
      const elementToRemove = document.getElementById(`${i}`);
      elementToRemove?.remove();
    }
    this.numBoxes = 0;
    this.boxes.deleteBoxes();
    console.log(this.boxes)
  }

}
