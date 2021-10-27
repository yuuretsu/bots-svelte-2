<script lang="ts">
  import { Bot } from "./../../lib/bot";
  import { createEventDispatcher } from "svelte";
  import NamedEditable from "../NamedEditable.svelte";
  import BlockHederInfo from "./BlockHederInfo.svelte";

  function onClickDeselect() {
    dispatch("deselect");
  }

  const dispatch = createEventDispatcher();

  export let block: Bot;
</script>

<div class="block">
  <BlockHederInfo
    title="Бот"
    label={`Поколение ${String(block.generation)}`}
    color={String(block.getColor())}
  />
</div>

<div class="block">
  <button on:click={onClickDeselect}>Снять выделение</button>
</div>

<div class="block">
  <div class="row">
    <NamedEditable
      value={block.age.toString()}
      name="Возраст"
      on:input={(e) => (block.age = +e.detail)}
    />
  </div>
  <div class="row">
    <NamedEditable
      value={block.energy.toString()}
      name="Энергия"
      on:input={(e) => (block.energy = +e.detail)}
    />
  </div>
  <div class="row">
    Здоровье: <input
      class="inline-range row-value"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={block.health}
      on:input={(e) => {
        // @ts-ignore
        block.health = +e.target.value;
      }}
    />
  </div>
  <div class="row">
    Плотоядность: <input
      class="inline-range row-value"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={block.abilities.attack}
      on:input={(e) => {
        // @ts-ignore
        block.abilities.attack = +e.target.value;
      }}
    />
  </div>
  <div class="row">
    Фотосинтез: <input
      class="inline-range row-value"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={block.abilities.photosynthesis}
      on:input={(e) => {
        // @ts-ignore
        block.abilities.photosynthesis = +e.target.value;
      }}
    />
  </div>
</div>

<!-- 1327238935998063 -->
<style>
  .block:not(:last-child) {
    margin-bottom: 10px;
  }
  .row {
    display: flex;
    align-items: center;
  }
  .row-value {
    margin-left: 10px;
  }
</style>
