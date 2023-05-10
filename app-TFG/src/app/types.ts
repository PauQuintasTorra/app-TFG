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
  numberBox: number = -1;
  

  getLeft(): number{
    return this.dashedBox.offsetLeft;
  }

  getWidth(): number{
    return this.dashedBox.offsetWidth;
  }

  getHeight(): number{
    return this.dashedBox.offsetHeight
  }

}

export class Boxes{
  box: Box[] = [];

  deleteBoxes(): void{
    this.box = [];
  }

}