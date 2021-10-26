<script lang="ts">
  import { Bot } from "../lib/world-block";
  import { createEventDispatcher } from "svelte";

  function onClickDeselect() {
    dispatch("deselect");
  }

  const dispatch = createEventDispatcher();

  export let block: Bot;
</script>

<button on:click={onClickDeselect}>Снять выделение</button>
Возраст: {block.age}
