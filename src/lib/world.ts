import { Coords, Grid } from "./grid";
import type { IWorldBlock } from "./world-block";
import { Pixels } from "./pixels";

import SquareWorldComponent from "./../components/SquareWorld.svelte";
import { SvelteComponent } from "svelte";
import { Rgba } from "./color";
import { clampCircular, randFloat } from "./helpers";
import { GenePool } from "./gene";
import { BlockVisualiser, VIEW_MODES } from "./view-modes";

export abstract class World extends Grid<IWorldBlock> {
  prevStepTime = 0;
  getEnergyStrategy = (_x: number, _y: number, _world: World) => 1;
  constructor(
    width: number,
    height: number,
    public genePool: GenePool
  ) {
    super(width, height);
  }
  abstract step(): void;
  setGetEnergyStrategy(strategy: (x: number, y: number, world: World) => number) {
    this.getEnergyStrategy = strategy;
  }
  abstract getEnergy(x: number, y: number): number;
  abstract getComponentProps(selected: IWorldBlock | null, visualiser: BlockVisualiser): Object;
  abstract getComponent(): typeof SvelteComponent;
  abstract narrowToCoords(x: number, y: number, narrow: number, length: number): Coords;
}

export class SquareWorld extends World {
  step() {
    const start = performance.now();
    const blocks: Readonly<{ block: IWorldBlock, pos: Coords }>[] = [];
    this.forEach((value, x, y) => {
      if (!value) return;
      blocks.push({ block: value, pos: [x, y] });
    });
    const shuffled = blocks.sort(() => randFloat(0, 1) - 0.5);
    shuffled.forEach(({ block, pos }) => block.live(...pos, this));
    this.prevStepTime = performance.now() - start;
  }
  getEnergy(x: number, y: number): number {
    return this.getEnergyStrategy(x, y, this);
  }
  private getPixels(selected: IWorldBlock | null, visualiser: BlockVisualiser) {
    const pixels = new Pixels(this.width, this.height);
    this.forEach((block, x, y) => {
      if (!block) return;
      const color = selected === block
        ? new Rgba(255, 0, 255, 255)
        : (visualiser(block) || new Rgba(0, 0, 0, 0));
      pixels.setPixel(
        x,
        y,
        ...color.toArray()
      );
    });
    return pixels;
  }
  getComponentProps(selected: IWorldBlock | null, visualiser: BlockVisualiser) {
    return { imageData: this.getPixels(selected, visualiser), pixelSize: 5 };
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
