<script lang="ts">
  import { Bot } from "../lib/bot";
  import {
    afterUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
  } from "svelte";

  function onClickDeselect() {
    dispatch("deselect");
  }

  const dispatch = createEventDispatcher();

  export let block: Bot;
</script>

<button on:click={onClickDeselect}>Снять выделение</button>

<div>
  Возраст: <input
    type="number"
    value={block.age}
    on:input={(e) => {
      // @ts-ignore
      block.age = +e.target.value;
    }}
  />
</div>
<div>
  Здоровье: <input
    type="number"
    value={block.health}
    on:input={(e) => {
      // @ts-ignore
      block.health = +e.target.value;
    }}
  />
</div>

<!-- 1327238935998063 -->
<style>
  * {
    /*  */
  }
</style>
