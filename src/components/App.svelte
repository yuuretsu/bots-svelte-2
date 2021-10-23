<script lang="ts">
  import Accordion from "./Accordion.svelte";
  import DragWrapper from "./DragWrapper.svelte";
  import Sidebar from "./Sidebar.svelte";
  import ControlsPanel from "./ControlsPanel.svelte";

  import { SquareWorld, World } from "../lib/world";
  import { WorldBlock } from "../lib/world-block";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";

  function step() {
    world.step();
    worldProps = world.getComponentProps();
  }

  function onClickStep() {
    step();
    $play = false;
  }

  function stopLoop(intervalId: number | null) {
    intervalId && window.clearInterval(intervalId);
  }

  function onSetPlay() {
    if ($play) {
      intervalId = window.setInterval(() => {
        step();
      }, 1000 / 60);
    } else {
      stopLoop(intervalId);
    }
  }

  let sidebarOpened = true;
  let intervalId: number | null = null;
  let play = writable(true);
  play.subscribe(onSetPlay);

  let world: World = new SquareWorld(100, 100);
  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      Math.random() > 0.1 && world.set(x, y, new WorldBlock());
    }
  }
  let worldProps = world.getComponentProps();

  let showCss = false;

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
      <svelte:component this={world.getComponent()} {...worldProps} />
    </DragWrapper>
  </div>
  <Sidebar opened={sidebarOpened}>
    <button on:click={onClickStep}>step</button>
    <Accordion title="kek dfg sdgfsdf fsd kek dfg sdgfsdf fsd">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut aperiam
        quos, consequatur esse nostrum omnis mollitia laboriosam, adipisci
        expedita, porro quas necessitatibus qui tempora fugiat. Dignissimos ab
        incidunt eveniet sequi!
      </p>
    </Accordion>
    <Accordion title="dev">
      <label
        ><input type="checkbox" bind:checked={showCss} />Показать сетку</label
      >
    </Accordion>
  </Sidebar>
  <ControlsPanel bind:sidebarOpened bind:play={$play} on:step={onClickStep} />
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
