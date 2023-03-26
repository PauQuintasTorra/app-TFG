import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-lets-create',
  templateUrl: './lets-create.component.html',
  styleUrls: ['./lets-create.component.css'],
})
export class LetsCreateComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    console.log(this.boxContainer.nativeElement);
  }

  @ViewChild('boxContainer', { static: false }) boxContainer: ElementRef;

  showDropdown: boolean = false;
  boxes: any = [];

  addNewBox(operator: string) {
    const newBox = {
      id: this.boxes.length + 1,
      operator,
    };
    this.boxes.push(newBox);

    if (this.boxes.length > 1) {
      const prevBox = this.boxes[this.boxes.length - 2];
      const newBoxIndex = this.boxes.length - 1;
      const arrowElement = document.createElement('div');
      arrowElement.classList.add('arrow');
      arrowElement.style.left = `${prevBox.id * 220}px`;
      arrowElement.style.top = `210px`;
      this.boxContainer.nativeElement.appendChild(arrowElement);
      const arrowLineElement = document.createElement('div');
      arrowLineElement.classList.add('arrow-line');
      arrowLineElement.style.width = `${(newBox.id - prevBox.id) * 220}px`;
      arrowLineElement.style.left = `${(prevBox.id + 1) * 220}px`;
      arrowElement.appendChild(arrowLineElement);
    }
  }

  // constructor() {
  //   this.startX = 0;
  //   this.startY = 0;
  //   this.initialLeft = 0;
  //   this.initialTop = 0;
  // }
  // public boxType: string = '';
  // public isBoxVisible = false;
  // private isDragging = false;
  // private startX: number;
  // private startY: number;
  // private initialLeft: number;
  // private initialTop: number;
  // public arrowStartX = 0;
  // public arrowStartY = 0;
  // public arrowEndX = 0;
  // public arrowEndY = 0;

  // showBox() {
  //   this.isBoxVisible = true;
  // }

  // startDrag(event: MouseEvent) {
  //   this.isDragging = true;
  //   this.startX = event.clientX;
  //   this.startY = event.clientY;
  //   const box = document.querySelector('.box') as HTMLElement;
  //   const styles = window.getComputedStyle(box);
  //   this.initialLeft = parseInt(styles.left, 10) || 0;
  //   this.initialTop = parseInt(styles.top, 10) || 0;
  // }

  // stopDrag(event: MouseEvent) {
  //   this.isDragging = false;
  //   this.updateArrow();
  // }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (!this.isDragging) {
  //     return;
  //   }
  //   const x = event.clientX - this.startX + this.initialLeft;
  //   const y = event.clientY - this.startY + this.initialTop;
  //   const box = document.querySelector('.box') as HTMLElement;
  //   box.style.left = `${x}px`;
  //   box.style.top = `${y}px`;
  //   this.updateArrow();
  // }

  // updateArrow() {
  //   const box = document.querySelector('.box') as HTMLElement;
  //   const boxRect = box.getBoundingClientRect();
  //   const square = document.querySelector('.square') as HTMLElement;
  //   const squareRect = square.getBoundingClientRect();
  //   this.arrowStartX = boxRect.left + boxRect.width / 2;
  //   this.arrowStartY = boxRect.top + boxRect.height / 2;
  //   this.arrowEndX = squareRect.left + squareRect.width / 2;
  //   this.arrowEndY = squareRect.top + squareRect.height / 2;
  // }
}
