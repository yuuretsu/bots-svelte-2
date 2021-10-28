import { Rgba } from "./color";
import { IWorldBlock } from "./world-block";

export type BlockVisualiser = (
  block: IWorldBlock,
) => Rgba | null;

export type ViewMode = {
  name: string;
  blockToColor: BlockVisualiser;
};

export const VIEW_MODES: { [key: string]: ViewMode } = {
  normal: {
    name: "Стандартный",
    blockToColor: (block) => block.getColor(),
  },
  health: {
    name: "Здоровье",
    blockToColor: (block) => block.getHealthColor(),
  },
}
