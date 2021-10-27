<script lang="ts">
  import MdKeyboardArrowUp from "svelte-icons/md/MdKeyboardArrowUp.svelte";
  import MdKeyboardArrowDown from "svelte-icons/md/MdKeyboardArrowDown.svelte";
  export let placeholder: string = "";
  export let value: number = NaN;
</script>

<div class="wrapper">
  <input {placeholder} type="number" bind:value />
  <!-- {#if value}
    <button on:click={() => (value = "")}>
      <div class="close-icon">
        <MdClear />
      </div>
    </button>
  {/if} -->
  <!-- <div class="spin">
    <button on:click={() => value++}>
      <div class="icon">
        <MdKeyboardArrowUp />
      </div>
    </button>
    <button on:click={() => value--}>
      <div class="icon">
        <MdKeyboardArrowDown />
      </div>
    </button>
  </div> -->
</div>

<style>
  .wrapper {
    box-sizing: border-box;
    display: flex;
    height: 30px;
    background-color: var(--col-bg-1);
    border-radius: 10px;
    border-bottom: 1px solid var(--col-bg-2);
    overflow: hidden;
  }
  input {
    width: 100%;
    align-self: stretch;
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0;
    padding: 0 10px;
  }
  .spin {
    display: flex;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    width: 30px;
  }
  button:hover {
    background-color: var(--col-bg-1);
  }
  .icon {
    display: flex;
    align-items: center;
    max-width: 20px;
    min-width: 20px;
    max-height: 20px;
    min-height: 20px;
  }
  input::-webkit-inner-spin-button {
    display: none;
  }
</style>
