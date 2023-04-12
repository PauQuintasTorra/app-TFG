export class Wavelet {
  type?: 'Haar' | '5:3' | '9:7';
  levels?: number;
}
export class ArithmeticOperation {
  value?: number;
  type?: 'Add' | 'Sub' | 'Mult' | 'Div';
}

export class Quantizer {
  value?: number;
}

export class Box{
  dashedBox: any;
  class: any = {};
  numberBox: number = 0;
  

  // getNumberBox(): number{
  //   return this.numberBox;
  // }

  // setNumberBox(numberBox: number): void{
  //   this.numberBox = numberBox;
  // }

  getLeft(): number{
    return this.dashedBox.offsetLeft;
  }

  getWidth(): number{
    return this.dashedBox.offsetWidth;
  }

  getHeight(): number{
    return this.dashedBox.offsetHeight
  }

  // getNameClass(): string{
  //   return this.nameClass;
  // }

  // setNameClass(name: string): void{
  //   this.nameClass = name;
  // }

}

export class Boxes{
  box: Box[] = [];

  deleteBoxes(): void{
    this.box = [];
  }

  deleteBoxById(id: number){
    // recorrer array de box i eliminar el que tingui el numberBox == id
  }

}