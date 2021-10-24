<script lang="ts">
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdSkipNext from "svelte-icons/md/MdSkipNext.svelte";
  import MdReplay from "svelte-icons/md/MdReplay.svelte";

  import { createEventDispatcher } from "svelte";

  import IconSwitch from "./IconSwitch.svelte";

  function onClickMenu() {
    sidebarOpened = !sidebarOpened;
  }

  function onClickPlayPause() {
    play = !play;
  }

  function onClickStep() {
    dispatch("step");
  }

  function onClickRestart() {
    dispatch("restart");
  }

  export let sidebarOpened: boolean;
  export let play: boolean;

  const dispatch = createEventDispatcher();
</script>

<div class="wrapper">
  <button class="btn" on:click={onClickMenu}>
    <IconSwitch width="25px" switched={sidebarOpened}>
      <div class="icon" slot="a">
        <span class="visually-hidden">open menu</span>
        <MdMenu />
      </div>
      <div class="icon" slot="b">
        <span class="visually-hidden">close menu</span>
        <MdClose />
      </div>
    </IconSwitch>
  </button>
  <button class="btn" on:click={onClickPlayPause}>
    <IconSwitch width="25px" switched={play}>
      <div class="icon" slot="a">
        <span class="visually-hidden">play</span>
        <MdPlayArrow />
      </div>
      <div class="icon" slot="b">
        <span class="visually-hidden">pause</span>
        <MdPause />
      </div>
    </IconSwitch>
  </button>
  <button class="btn" on:click={onClickStep}>
    <div class="icon">
      <span class="visually-hidden">step</span>
      <MdSkipNext />
    </div>
  </button>
  <button class="btn" on:click={onClickRestart}>
    <div class="icon">
      <span class="visually-hidden">restart</span>
      <MdReplay />
    </div>
  </button>
</div>

<style>
  .wrapper {
    position: fixed;
    display: flex;
    left: 20px;
    top: 20px;
    padding: 10px;
    background-color: var(--col-bg-0);
    /* backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px); */
    border-radius: 100px;
    box-shadow: var(--shadow);
  }

  .btn {
    display: block;
    border: none;
    padding: 5px;
    border-radius: 50px;
    cursor: pointer;
    background-color: var(--col-bg-1);
    color: var(--col-fg-0);
  }

  .btn:not(:last-child) {
    margin-right: 10px;
  }

  .btn:hover {
    background-color: var(--col-bg-2);
  }

  .icon {
    max-width: 25px;
    max-height: 25px;
    min-width: 25px;
    min-height: 25px;
    transition-duration: 0.2s;
  }

  .btn:active .icon {
    transform: scale(0.75);
  }
</style>
