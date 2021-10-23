export class Pixels extends ImageData {
  constructor(width: number, height: number) {
    super(width, height);
  }
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
    const pointer = (x + y * this.width) * 4;
    this.data[pointer] = r;
    this.data[pointer + 1] = g;
    this.data[pointer + 2] = b;
    this.data[pointer + 3] = a;
    return this;
  }
  getPixel(x: number, y: number): [number, number, number, number] {
    const pointer = (x + y * this.width) * 4;
    return [
      this.data[pointer]!,
      this.data[pointer + 1]!,
      this.data[pointer + 2]!,
      this.data[pointer + 3]!
    ];
  }
}
