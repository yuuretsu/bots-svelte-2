import { Gene, GenePool, NULL_GENE, NULL_GENE_TEMPLATE, randGene } from "./gene";
import { clampCircular, clamp, randChoice, randFloat, randInt, random } from "./helpers";
import { World } from "./world";
import { Bot } from "./world-block";

export class Genome {
  private _pointer: number = 0;
  readonly genes: Gene[];
  constructor(length: number) {
    this.genes = new Array<Gene>(length).fill(NULL_GENE);
  }
  set pointer(n: number) {
    this._pointer = clampCircular(0, this.genes.length, n);
  }
  get pointer() {
    return this._pointer;
  }
  fillRandom(pool: GenePool): this {
    for (let i = 0; i < this.genes.length; i++) {
      this.genes[i] = randGene(pool, this.genes.length);
    }
    return this;
  }
  mutateGene(pool: GenePool, gene: Gene): Gene {
    return {
      template: randChoice(Array.from(pool)) || NULL_GENE_TEMPLATE,
      property: {
        option: clamp(0, 1, gene.property.option + randFloat(-0.01, 0.01)),
        branches: gene.property.branches.map(
          i => random() > 0.9
            ? randInt(0, this.genes.length)
            : i
        ) as [number, number]
      }
    }
  }
  replication(pool: GenePool) {
    const genome = new Genome(this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      genome.genes[i] = random() > 0.995
        ? this.mutateGene(pool, this.genes[i] || NULL_GENE)
        : this.genes[i] || NULL_GENE;
    }
    return genome;
  }
  doAction(bot: Bot, x: number, y: number, world: World) {
    // this.recentlyUsedGenes = [];
    for (let i = 0; i < MAX_ACTIONS; i++) {
      const gene = this.genes[this.pointer];
      if (!gene) continue;
      const result = gene
        .template
        .action(bot, x, y, world, gene.property);
      // this.recentlyUsedGenes.push(gene);
      // this.activeGene = gene;
      // bot.lastActions.push(result.msg || gene.template.name);
      if (gene.template.colorInfluence !== null && gene.template.color) {
        bot.rgba = bot.rgba.interpolate(gene.template.color, gene.template.colorInfluence);
      }
      this.pointer = result.goto !== null
        ? this.pointer = result.goto
        : this.pointer = this.pointer + 1;
      if (result.completed) {
        // this.activeGene = this.recentlyUsedGenes.pop() || null;
        return;
      };
    }
    // this.activeGene = this.recentlyUsedGenes.pop() || null;
  }
}

const MAX_ACTIONS = 8;