<script lang="ts">
  import MdClear from "svelte-icons/md/MdClear.svelte";
  export let placeholder: string = "";
  export let value: string = "";
</script>

<div class="wrapper">
  <input {placeholder} type="text" bind:value />
  {#if value}
    <button on:click={() => (value = "")}>
      <div class="close-icon">
        <MdClear />
      </div>
    </button>
  {/if}
</div>

<style>
  .wrapper {
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
  button {
    min-width: 30px;
    min-height: 30px;
    max-width: 30px;
    max-height: 30px;
    padding: 5px;
    border-radius: 0;
    background-color: transparent;
    /* background-color: var(--col-bg-2); */
  }
  button:active {
    box-shadow: none;
  }
  /* input {
    box-sizing: border-box;
    margin: 0;
    padding: 5px 5px;
    margin-bottom: 5px;
    width: 100%;
    border-radius: 5px;
    border: none;
    border-bottom: 1px solid var(--col-bg-2);
    background-color: var(--col-bg-1);
    outline: none;
  } */
</style>
