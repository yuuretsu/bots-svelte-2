<script lang="ts">
  export let innerHTML: string;
</script>

<span contenteditable bind:innerHTML on:input />

<style>
  span {
    /* border-radius: 5px; */
    /* background-color: var(--col-bg-1); */
    padding: 0 3px;
    font-family: var(--font-mono);
    border-bottom: 1px solid var(--col-bg-2);
    transition-duration: 0.2s;
  }
  span:hover,
  span:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--col-bg-2);
  }
</style>
