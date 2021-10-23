import { lerp, randInt } from "./helpers";

type RgbaArray = [number, number, number, number];

export class Rgba {
  private static readonly MAX_DIF = 255 * 4;
  static randRgb(rand: () => number = Math.random) {
    return new Rgba(
      randInt(0, 256, rand),
      randInt(0, 256, rand),
      randInt(0, 256, rand),
      255
    );
  }
  constructor(
    readonly red: number,
    readonly green: number,
    readonly blue: number,
    readonly alpha: number
  ) { }
  interpolate(
    other: Rgba,
    t: number,
    fn: (a: number, b: number, t: number) => number = lerp
  ): Rgba {
    return new Rgba(
      fn(this.red, other.red, t),
      fn(this.green, other.green, t),
      fn(this.blue, other.blue, t),
      fn(this.alpha, other.alpha, t)
    );
  }
  toArray(): RgbaArray {
    return [this.red, this.green, this.blue, this.alpha];
  }
}
