import { Coords, Grid } from "./grid";
import type { IWorldBlock } from "./world-block";
import { Pixels } from "./pixels";

import SquareWorldComponent from "./../components/SquareWorld.svelte";
import { SvelteComponent } from "svelte";
import { Rgba } from "./color";

export abstract class World extends Grid<IWorldBlock> {
  constructor(width: number, height: number) {
    super(width, height);
  }
  abstract step(): void;
  abstract getComponentProps(): Object;
  abstract getComponent(): typeof SvelteComponent;
}

export class SquareWorld extends World {
  step() {
    const blocks: Readonly<{ block: IWorldBlock, pos: Coords }>[] = [];
    this.forEach((value, x, y) => {
      if (!value) return;
      blocks.push({ block: value, pos: [x, y] });
    });
    const shuffled = blocks.sort(() => Math.random() - 0.5);
    shuffled.forEach(({ block, pos }) => block.live(pos, this));
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
    return { imageData: this.getPixels(), pixelSize: 4 };
  }
  getComponent() {
    return SquareWorldComponent;
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
