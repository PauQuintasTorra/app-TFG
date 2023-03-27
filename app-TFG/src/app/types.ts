export class Wavelet {
  type?: 'haar' | '5:3' | '9:7';
  levels?: number;
}
export class arithmeticOperation {
  value?: number;
  type?: 'add' | 'sub' | 'mul' | 'div';
}

export class quantizer {
  value?: number;
}
