import { Rgba } from "./color";
import { GeneTemplate } from "./gene";
import { lerp } from "./helpers";

export const GENES: { [index: string]: GeneTemplate } = {
  doNothing: {
    name: 'Отдых',
    description: `Прибавляет 0.1 к здоровью`,
    defaultEnabled: true,
    color: new Rgba(100, 100, 0, 255),
    colorInfluence: 0.01,
    action: (bot, x, y, world, property) => {
      const value = 0.1;
      // bot.health = Math.min(1, bot.health + 0.1);
      return { completed: true, goto: null, msg: `Лечение +${value}` };
    }
  },
  multiply: {
    name: 'Размножение',
    description: `Бот теряет 1/10 энергии на попытку размножения. Если клетка перед ним пуста, энергии больше 5 единиц, а возраст больше 10 кадров, бот размножается. Потомку передается количество энергии, равное параметру гена, такое же количество вычитается из собственной энергии.`,
    defaultEnabled: true,
    color: new Rgba(0, 0, 200, 255),
    colorInfluence: 0.01,
    action: (bot, x, y, world, property) => {
      const fCoords = world.narrowToCoords(x, y, bot.narrow, 1);
      const fBlock = world.get(...fCoords);
      bot.energy *= 0.9;
      if (fBlock) return { completed: true, goto: null, msg: `Размножение не удалось: спереди блок` };
      if (bot.energy <= 5) return { completed: true, goto: null, msg: `Размножение не удалось: мало энергии` };
      if (bot.age <= 10) return { completed: true, goto: null, msg: `Размножение не удалось: бот слишком молод` };
      world.set(...fCoords, bot.multiply(world.genePool, property.option));
      return { completed: true, goto: null, msg: `Размножение` };
    }
  },
  rotate: {
    name: 'Поворот',
    description: `Бот поворачивается по часовой стрелке, если параметр гена > 0.5, иначе против часовой стрелки`,
    defaultEnabled: true,
    color: null,
    colorInfluence: null,
    action: (bot, x, y, world, property) => {
      bot.narrow = property.option > 0.5
        ? bot.narrow + 1
        : bot.narrow - 1
      return { completed: false, goto: null, msg: `Поворот ${property.option > 0.5 ? 'направо' : 'налево'}` };
    }
  },
  photosynthesis: {
    name: 'Фотосинтез',
    description: `Бот получает энергию путем фотосинтеза.При этом эффективность его фотосинтеза возрастает, а эффективность атак -- падает.Восстанавливает своё здоровье на 0.01.`,
    defaultEnabled: true,
    color: new Rgba(0, 255, 0, 255),
    colorInfluence: 0.01,
    action: (bot, x, y, world, property) => {
      const energy = 1 * bot.abilities.photosynthesis ** 2;
      bot.energy += energy;
      bot.increaseAbility('photosynthesis');
      bot.health = Math.min(1, bot.health + 0.01);
      return { completed: true, goto: null, msg: `Фототсинтез: +${energy.toFixed(2)} энергии` };
    }
  },
  attack: {
    name: 'Атака',
    description: `Бот атакует блок перед собой, забирая себе часть его энергии.Повышает здоровье на 0.01.`,
    defaultEnabled: true,
    color: new Rgba(255, 0, 0, 255),
    colorInfluence: 0.01,
    action: (bot, x, y, world, property) => {
      const fBlock = world.get(
        ...world.narrowToCoords(x, y, bot.narrow, 1)
      );
      let msg: string;
      if (fBlock) {
        const value = lerp(0, 5, property.option) * bot.abilities.attack ** 2;
        const result = fBlock.onAttack(bot, value);
        bot.increaseAbility('attack');
        bot.health = Math.min(1, bot.health + 0.01);
        msg = `Атака: +${result.toFixed(2)} энергии`;
      } else {
        msg = `Атака не удалась`;
      }
      bot.energy -= 0.5;
      return { completed: true, goto: null, msg };
    }
  },
  moveForward: {
    name: 'Двигаться вперед',
    description: `Бот перемещется в клетку перед собой, если она пустая.Расходует 0.5 энергии.`,
    defaultEnabled: true,
    color: new Rgba(200, 200, 200, 255),
    colorInfluence: null,
    action: (bot, x, y, world, property) => {
      const F_COORDS = world.narrowToCoords(x, y, bot.narrow, 1);
      const F_BLOCK = world.get(...F_COORDS);
      let msg: string;
      if (!F_BLOCK) {
        world.swap(x, y, ...F_COORDS);
        msg = `Передвижение`;
      } else {
        msg = `Передвижение не удалось`;
      }
      bot.energy -= 0.5;
      return { completed: true, goto: null, msg };
    }
  },
  movePointer: {
    name: 'Переместить указатель',
    description: `Следующая команда генома будет той, которая указана в ветке 1 текущего гена.`,
    defaultEnabled: true,
    color: null,
    colorInfluence: null,
    action: (bot, x, y, world, property) => {
      const goto = property.branches[0];
      const msg = `Перенос указателя → ${goto}`;
      return { completed: false, goto, msg };
    }
  },
}