import { Rgba } from "./color";
import { GenePool } from "./gene";
import { Genome } from "./genome";
import { clamp, clampCircular, randInt } from "./helpers";
import { World } from "./world";
import { IWorldBlock } from "./world-block";
import BotComponent from "../components/Bot";
import { Store } from "./custom-store";

export type BotAbilities = {
  photosynthesis: number,
  attack: number
}

export function createBotAbilities(): BotAbilities {
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
    private _energy: number,
    readonly generation: number,
    public abilities: BotAbilities,
    public genome: Genome
  ) { }
  set narrow(n: number) {
    this._narrow = clampCircular(0, 8, n);
  }
  get narrow(): number {
    return this._narrow;
  }
  set energy(value: number) {
    this._energy = value;
  }
  get energy() {
    return +this._energy.toFixed(5);
  }
  multiply(pool: GenePool, energyCoef: number) {
    const energy = this.energy * energyCoef;
    this.energy -= energy;
    return new Bot(
      this.rgba.interpolate(new Rgba(255, 255, 255, 255), 0.1),
      energy,
      this.generation + 1,
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
  increaseAbility(ability: keyof BotAbilities) {
    for (const name in this.abilities) {
      if (Object.prototype.hasOwnProperty.call(this.abilities, name)) {
        this.abilities[name as typeof ability] = clamp(
          0,
          1,
          this.abilities[name as typeof ability] + (name === ability
            ? 0.01
            : -0.01
          )
        );
      }
    }
  }
  live(x: number, y: number, world: World) {
    if (
      this.energy <= 0 ||
      this.age >= 2000 ||
      this.health <= 0
    ) {
      world.remove(x, y);
      return;
    }

    if (
      this.energy < 1 ||
      this.energy > 200
    ) this.health -= 0.1;

    this.genome.doAction(this, x, y, world);
    this.energy -= 0.1;
    this.age++;
  }
  getComponent() {
    return BotComponent;
  }
  getColor() {
    return this.rgba;
  }
  getHealthColor() {
    return new Rgba(100, 50, 50, 255)
      .interpolate(new Rgba(150, 200, 255, 255), this.health);
  }
  getEnergyColor() {
    return new Rgba(0, 0, 100, 255)
      .interpolate(new Rgba(255, 255, 0, 255), this.energy / 200);
  }
}
