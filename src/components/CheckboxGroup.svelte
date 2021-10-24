<script lang="ts">
  export let values: { value: string; content: string }[] = [];
  export let checked: string[] = [];
</script>

<div class="wrapper">
  <div class="wrapper-inner wrapper__inner">
    {#each values as { value, content }}
      <label class:checked={checked.includes(value)}>
        <input
          type="checkbox"
          class="visually-hidden"
          {value}
          bind:group={checked}
        />
        {@html content}
      </label>
    {/each}
  </div>
</div>

<style>
  /* .wrapper {
    padding: 5px;
    box-shadow: inset var(--shadow);
    border-radius: 10px;
  } */
  .wrapper__inner {
    margin-right: -5px;
    margin-bottom: -5px;
  }
  .wrapper-inner {
    display: flex;
    flex-wrap: wrap;
  }
  label {
    /* flex-grow: 1; */
    display: flex;
    font-family: "IBM Plex Sans" !important;
    align-items: center;
    user-select: none;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 20px;
    padding-left: 5px;
    padding-right: 10px;
    border-radius: 10px;
    text-transform: uppercase;
    font-size: 0.75em;
    font-family: monospace;
    background-color: var(--col-bg-1);
  }
  label::before {
    box-sizing: border-box;
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: rgb(0 0 0 / 50%);
    border-radius: 5px;
    margin-right: 5px;
    border-bottom: 3px solid transparent;
    border-right: 3px solid transparent;
    transition-duration: 0.2s;
  }
  .checked {
    background-color: rgb(114 255 128 / 50%);
  }
  .checked::before {
    width: 7px;
    height: 10px;
    border-bottom: 3px solid rgb(0 0 0 / 50%);
    border-right: 3px solid rgb(0 0 0 / 50%);
    transform: translate(3px, -1px) rotate(45deg);
    background-color: transparent;
    margin-right: 8px;
    border-radius: 0;
  }
</style>
