import { Rgba } from "./color";
import { GENES } from "./gene-tamplates";
import { randChoice, randInt, random } from "./helpers";
import { World } from "./world";
import { Bot } from "./world-block";

export type GenePool = Set<GeneTemplate>;

export type GeneProperty = {
  option: number,
  branches: [number, number]
};

export type ActionResult = {
  completed: boolean,
  goto: number | null,
  msg?: string
};

export type ActionFn = (
  bot: Bot,
  x: number,
  y: number,
  world: World,
  property: GeneProperty
) => ActionResult;

export type Gene = {
  template: GeneTemplate,
  property: GeneProperty
};

export type GeneTemplate = {
  name: string,
  description?: string,
  defaultEnabled?: boolean,
  color: Rgba | null,
  colorInfluence: number | null,
  action: ActionFn
};

export const NULL_GENE_TEMPLATE: GeneTemplate = {
  name: 'Пустой ген',
  description: `Ничего не происходит`,
  defaultEnabled: false,
  color: new Rgba(127, 127, 127, 255),
  colorInfluence: 0.01,
  action: (_bot, _x, _y, _world, _property) => {
    return { completed: true, goto: null, msg: `Бездействие` };
  }
};

export const NULL_GENE: Gene = {
  template: NULL_GENE_TEMPLATE,
  property: {
    option: 0,
    branches: [0, 0],
  }
}

export function randGeneProperty(genomeLength: number): GeneProperty {
  return {
    option: random(),
    branches: [
      randInt(0, genomeLength),
      randInt(0, genomeLength),
    ]
  }
}

export function randGene(pool: GenePool, genomeLength: number): Gene {
  return {
    template: randChoice(Array.from(pool)) || NULL_GENE_TEMPLATE,
    property: randGeneProperty(genomeLength)
  }
}

// export function enabledGenesToPool(genes: Set<string>): GenePool {
//   return namesToGenePool(
//     Object
//       .keys(genes)
//       .filter(key => genes[key])
//   );
// }

export function namesToGenePool(names: Set<string>, geneTemplates: typeof GENES): GenePool {
  const pool: GenePool = new Set();
  for (const geneName of names) {
    const geneTemplate = geneTemplates[geneName];
    if (geneTemplate) pool.add(geneTemplate);
  }
  // console.log(names, pool);
  return pool;
}