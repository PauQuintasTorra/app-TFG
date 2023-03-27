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
  boxes = {};
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
      newBox.style.left = 250 + this.numBoxes * 250 + 'px';
      newBox.style.transform = 'translateX(-50%)';
      this.elementRef.nativeElement.appendChild(newBox);
    } else {
      alert("You can't create more than 4 boxes");
    }
    this.numBoxes++;
    if (this.numBoxes == 4) {
      this.drawArrow();
    }
  }

  drawArrow() {
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');

    const startX = 300;
    const startY = 100;
    const endX = 300;
    const endY = 150;

    const angle = (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI;
    arrow.style.width =
      Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) + 'px';
    arrow.style.transform = 'rotate(' + angle + 'deg)';
    arrow.style.left = startX + 'px';
    arrow.style.top = startY + 'px';
    arrow.style.border = '2px solid black';

    this.elementRef.nativeElement.appendChild(arrow);
  }
}
