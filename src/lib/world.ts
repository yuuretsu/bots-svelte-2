import { Coords, Grid } from "./grid";
import type { IWorldBlock } from "./world-block";
import { Pixels } from "./pixels";

import SquareWorldComponent from "./../components/SquareWorld.svelte";
import { SvelteComponent } from "svelte";
import { Rgba } from "./color";
import { clampCircular, randFloat } from "./helpers";
import { GenePool } from "./gene";

export abstract class World extends Grid<IWorldBlock> {
  constructor(
    width: number,
    height: number,
    public genePool: GenePool
  ) {
    super(width, height);
  }
  abstract step(): void;
  abstract getComponentProps(): Object;
  abstract getComponent(): typeof SvelteComponent;
  abstract narrowToCoords(x: number, y: number, narrow: number, length: number): Coords;
}

export class SquareWorld extends World {
  step() {
    const blocks: Readonly<{ block: IWorldBlock, pos: Coords }>[] = [];
    this.forEach((value, x, y) => {
      if (!value) return;
      blocks.push({ block: value, pos: [x, y] });
    });
    const shuffled = blocks.sort(() => randFloat(0, 1) - 0.5);
    shuffled.forEach(({ block, pos }) => block.live(...pos, this));
  }
  private getPixels() {
    const pixels = new Pixels(this.width, this.height);
    this.forEach((block, x, y) => {
      if (!block) return;
      pixels.setPixel(
        x,
        y,
        ...(block.getColor() || new Rgba(0, 0, 0, 0))
          .toArray()
      );
    });
    return pixels;
  }
  getComponentProps() {
    return { imageData: this.getPixels(), pixelSize: 7 };
  }
  getComponent() {
    return SquareWorldComponent;
  }
  narrowToCoords(x: number, y: number, narrow: number, length: number) {
    narrow = clampCircular(0, 8, narrow);
    const x2 = x + SQUARE_MOORE_NEIGHBOURHOOD[narrow]![0] * length;
    const y2 = y + SQUARE_MOORE_NEIGHBOURHOOD[narrow]![1] * length;
    return this.fixCoords(x2, y2);
  }
}

const SQUARE_MOORE_NEIGHBOURHOOD: Coords[] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];
