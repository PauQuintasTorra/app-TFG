import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Wavelet } from '../types';

@Component({
  selector: 'app-lets-create',
  templateUrl: './lets-create.component.html',
  styleUrls: ['./lets-create.component.css'],
})
export class LetsCreateComponent {
  constructor(private elementRef: ElementRef) {}

  @ViewChild('boxContainer') boxContainer!: ElementRef;

  selectedOption = 'wavelet';
  numBoxes = 0;
  boxes: any[] = [];
  operatorBox: any;

  executeSelectedOption() {
    switch (this.selectedOption) {
      case 'wavelet':
        this.operatorBox = new Wavelet();
        this.createBox('green');
        break;
      case 'arithmeticOperation':
        this.createBox('blue');
        break;
      case 'quantizer':
        this.createBox('red');
        break;
      default:
        break;
    }
  }

  createBox(color: string) {
    if (this.numBoxes < 4) {
      const newBox = document.createElement('div');
      newBox.classList.add('dashed-box');
      newBox.style.width = '200px';
      newBox.style.height = '100px';
      newBox.style.position = 'fixed';
      newBox.style.border = '2px dashed ' + color;
      newBox.style.top = '35%';
      newBox.style.left = 200 + this.numBoxes * 250 + 'px';
      newBox.style.transform = 'translateX(-50%)';
      this.elementRef.nativeElement.appendChild(newBox);
      this.boxes.push(newBox);
      if (this.numBoxes < 3) {
        const newIcon = document.createElement('i');
        newIcon.classList.add('fas', 'fa-plus');
        // establece las propiedades del icono
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
    } else {
      alert("You can't create more than 4 boxes");
    }
    this.numBoxes++;
  }

  // drawArrow(newBox: any) {
  //   const arrow = document.createElement('i');
  //   arrow.className = 'fa-solid fa-arrow-right fa-beat fa-2xl';
  //   console.log(newBox);

  //   this.elementRef.nativeElement.appendChild(arrow);
  // }
}
