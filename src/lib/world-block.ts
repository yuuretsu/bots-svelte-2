import { SvelteComponent } from "svelte";
import { Rgba } from "./color";
import { GenePool } from "./gene";
import { Genome } from "./genome";
import { Coords } from "./grid";
import { clamp, clampCircular, randFloat, randInt } from "./helpers";
import { World } from "./world";
import BotComponent from "./../components/Bot.svelte";

export interface IWorldBlock {
  live(x: number, y: number, world: World): void;
  getComponent(): typeof SvelteComponent;
  onAttack(bot: Bot, value: number): number;
  getColor(): Rgba | null;
}

export type BlockVisualiser = (block: IWorldBlock) => Rgba | null;

export function createBotAbilities(): typeof Bot.prototype.abilities {
  return {
    photosynthesis: 0.5,
    attack: 0.5
  };
}

export class Bot implements IWorldBlock {
  age = 0;
  health = 0.5;
  private _narrow: number = randInt(0, 8);
  constructor(
    public rgba: Rgba,
    public energy: number,
    public abilities: {
      photosynthesis: number,
      attack: number
    },
    public genome: Genome
  ) { }
  set narrow(n: number) {
    this._narrow = clampCircular(0, 8, n);
  }
  get narrow(): number {
    return this._narrow;
  }
  multiply(pool: GenePool, energyCoef: number) {
    const energy = this.energy * energyCoef;
    this.energy -= energy;
    return new Bot(
      this.rgba.interpolate(new Rgba(255, 255, 255, 255), 0.1),
      energy,
      { ...this.abilities },
      this.genome.replication(pool)
    );
  }
  onAttack(bot: Bot, value: number) {
    const REAL_VALUE = Math.min(this.energy, value);
    this.energy -= REAL_VALUE;
    bot.energy += REAL_VALUE;
    this.health -= 0.1;
    return REAL_VALUE;
  }
  increaseAbility(ability: keyof typeof Bot.prototype.abilities) {
    for (const name in this.abilities) {
      if (Object.prototype.hasOwnProperty.call(this.abilities, name)) {
        this.abilities[name as keyof typeof Bot.prototype.abilities] = clamp(
          0,
          1,
          this.abilities[name as keyof typeof Bot.prototype.abilities] + (name === ability
            ? 0.01
            : -0.01
          )
        );
      }
    }
  }
  live(x: number, y: number, world: World) {
    if (
      this.age > 2000 ||
      this.energy < 1
    ) {
      world.remove(x, y);
      return;
    }
    this.genome.doAction(this, x, y, world);
    this.age++;
  }
  getComponent() {
    return BotComponent;
  }
  getColor() {
    return this.rgba;
  }
}
