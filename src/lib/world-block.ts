import { Rgba } from "./color";
import { Coords } from "./grid";
import { World } from "./world";

export interface IWorldBlock {
  live(pos: Coords, world: World): void;
  getColor(): Rgba | null;
}

export type BlockVisualiser = (block: IWorldBlock) => Rgba | null;

export class WorldBlock implements IWorldBlock {
  rgba: Rgba;
  constructor() {
    this.rgba = Rgba.randRgb();
  }
  live(pos: Coords, world: World) {
    const coords: Coords = world.fixCoords(pos[0], pos[1] + 1);
    const obj = world.get(...coords);
    if (obj || Math.random() > 0.5) return;
    world.swap(...pos, ...coords);
  }
  getColor() {
    return this.rgba;
  }
}
