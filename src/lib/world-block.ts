import { SvelteComponent } from "svelte";
import { Rgba } from "./color";
import { World } from "./world";
import { Bot } from "./bot";

export interface IWorldBlock {
  live(x: number, y: number, world: World): void;
  getComponent(): typeof SvelteComponent;
  onAttack(bot: Bot, value: number): number;
  getColor(): Rgba | null;
  getHealthColor(): Rgba | null;
}
