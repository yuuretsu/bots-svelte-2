<script lang="ts">
  import Accordion from "./Accordion.svelte";
  import DragWrapper from "./DragWrapper.svelte";
  import Sidebar from "./Sidebar.svelte";
  import ControlsPanel from "./ControlsPanel.svelte";

  import { SquareWorld } from "../lib/world";
  import { IWorldBlock } from "../lib/world-block";
  import { Bot, createBotAbilities } from "../lib/bot";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { loop as createLoop } from "./../lib/loop";
  import { initiallySeed, random, setupRandom } from "../lib/helpers";
  import { Rgba } from "../lib/color";
  import { Genome } from "../lib/genome";
  import { GENES } from "../lib/gene-tamplates";
  import { GenePool, namesToGenePool } from "../lib/gene";
  import CheckboxGroup from "./CheckboxGroup.svelte";
  import TextInput from "./TextInput.svelte";
  import NumberInput from "./NumberInput.svelte";
  import { VIEW_MODES } from "../lib/view-modes";

  function step() {
    world.step();
    worldProps = world.getComponentProps(
      selectedBlock,
      VIEW_MODES[$viewMode]!.blockToColor
    );
    selectedBlock && (selectedBlock = selectedBlock);
  }

  function onClickStep() {
    step();
    $play = false;
  }

  function createWorld(width: number, height: number, genePool: GenePool) {
    const world = new SquareWorld(width, height, genePool);
    for (let y = 0; y < world.height; y++) {
      for (let x = 0; x < world.width; x++) {
        if (random() > 0.1) {
          const color = new Rgba(127, 127, 127, 127);
          const genome = new Genome(32).fillRandom(world.genePool);
          world.set(x, y, new Bot(color, 100, 1, createBotAbilities(), genome));
        }
      }
    }
    const worldProps = world.getComponentProps(
      selectedBlock,
      VIEW_MODES[$viewMode]!.blockToColor
    );
    return { world, worldProps };
  }

  function onClickRestart() {
    setupRandom(seed);
    const newWorld = createWorld(
      newWorldWidth,
      newWorldHeight,
      namesToGenePool(new Set(enabledGenes), GENES)
    );
    world = newWorld.world;
    worldProps = newWorld.worldProps;
  }

  function onClickBlock({ detail }: { detail: { x: number; y: number } }) {
    const { x, y } = detail;
    selectedBlock = world.get(x, y) || null;
    showSelectedBlock = !!selectedBlock;
    showSelectedBlock && (sidebarOpened = true);
    // selectedBlock && (selectedBlock.selected = new Rgba(255, 0, 255, 255));
    worldProps = world.getComponentProps(
      selectedBlock,
      VIEW_MODES[$viewMode]!.blockToColor
    );

    const color = new Rgba(127, 127, 127, 127);
    const genome = new Genome(32).fillRandom(world.genePool);

    const energy = GENES["photosynthesis"]!.action(
      new Bot(color, 100, 1, createBotAbilities(), genome),
      x,
      y,
      world,
      { option: 1, branches: [0, 0] }
    ).msg;
    console.log(energy);
  }

  function onClickDeselect() {
    selectedBlock = null;
    worldProps = world.getComponentProps(
      selectedBlock,
      VIEW_MODES[$viewMode]!.blockToColor
    );
  }

  function stopLoop(intervalId: number | null) {
    let id = intervalId;
    if (intervalId) {
      window.clearInterval(intervalId);
      console.log(`stop ${intervalId} loop`);
      intervalId = null;
    }
    return id;
  }

  function onSetPlay() {
    if ($play) {
      loop.start();
    } else {
      loop.stop();
    }
  }

  let seed = initiallySeed;
  let viewMode = writable("normal");
  let sidebarOpened = true;
  let selectedBlock: null | IWorldBlock = null;
  let showSelectedBlock = !!selectedBlock;
  let intervalId: number | null = null;
  let play = writable(false);
  let fpsLimit = writable(240);
  let loop = createLoop(step, $fpsLimit, $play);
  play.subscribe(onSetPlay);
  fpsLimit.subscribe(() => {
    loop.setFps($fpsLimit, $play);
  });

  let showCss = false;

  let enabledGenes: string[] = Object.entries(GENES)
    .filter(([_, template]) => template.defaultEnabled)
    .map(([key, _]) => key);

  $: world.genePool = namesToGenePool(new Set(enabledGenes), GENES);

  let newWorldWidth = 100;
  let newWorldHeight = 100;

  let { world, worldProps } = createWorld(
    newWorldWidth,
    newWorldHeight,
    namesToGenePool(new Set(enabledGenes), GENES)
  );

  viewMode.subscribe(() => {
    worldProps = world.getComponentProps(
      selectedBlock,
      VIEW_MODES[$viewMode]!.blockToColor
    );
  });

  onDestroy(stopLoop.bind(null, intervalId));
</script>

<svelte:window
  on:resize={() => {
    const landscape = window.matchMedia("(orientation: landscape)").matches;
    if (landscape) {
      document.body.classList.add("static");
    } else {
      document.body.classList.remove("static");
    }
  }}
/>
<main class:show-css={showCss}>
  <div class="drag-wrapper-wrapper" class:open={sidebarOpened}>
    <DragWrapper height="100%">
      <svelte:component
        this={world.getComponent()}
        {...worldProps}
        on:click-block={onClickBlock}
      />
    </DragWrapper>
  </div>
  <Sidebar opened={sidebarOpened}>
    <button on:click={onClickStep}>step</button>
    <Accordion title="Всяческое">
      <input type="range" min="1" max="240" bind:value={$fpsLimit} />
      <div>
        <label>seed: <input type="number" bind:value={seed} /></label>
      </div>
      <div>
        checkboxes: {enabledGenes.join(", ")}
      </div>
    </Accordion>
    <Accordion title="Выделенный блок" opened={showSelectedBlock}>
      {#if selectedBlock}
        <svelte:component
          this={selectedBlock.getComponent()}
          block={selectedBlock}
          on:deselect={onClickDeselect}
        />
      {:else}
        Кликните по цветному пикселю на карте, чтобы увидеть информацию о нём.
      {/if}
    </Accordion>
    <Accordion title="Режим просмотра" opened>
      {#each Object.entries(VIEW_MODES) as [key, { name }]}
        <label>
          <input type="radio" bind:group={$viewMode} value={key} />
          {name}
        </label>
      {/each}
    </Accordion>
    <Accordion title="Генофонд" opened>
      <CheckboxGroup
        values={Object.entries(GENES).map(([value, template]) => ({
          value,
          content: template.name,
          color: template.color?.interpolate(new Rgba(255, 255, 255, 255), 0.5),
        }))}
        bind:checked={enabledGenes}
      />
    </Accordion>
    <Accordion title="Новый мир" opened>
      Ширина
      <NumberInput bind:value={newWorldWidth} placeholder="ширина" />
      Высота
      <NumberInput bind:value={newWorldHeight} placeholder="высота" />
      <button on:click={onClickRestart}>Рестарт</button>
    </Accordion>
    <Accordion title="dev">
      <label>
        <input type="checkbox" bind:checked={showCss} />
        Показать сетку
      </label>
    </Accordion>
  </Sidebar>
  <ControlsPanel
    bind:sidebarOpened
    bind:play={$play}
    on:step={onClickStep}
    on:restart={onClickRestart}
  />
</main>

<style>
  main {
    position: fixed;
    inset: 0;
  }
  .drag-wrapper-wrapper {
    height: 100%;
    transition-duration: 0.2s;
  }
  .drag-wrapper-wrapper.open {
    margin-left: 300px;
  }
  :global(.show-css *) {
    outline: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
  @media (prefers-color-scheme: dark) {
    :global(.show-css *) {
      outline: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
  }
</style>
