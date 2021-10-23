<script lang="ts">
  export let width: string;
  export let height = width;
  export let switched = false;

  let style = `width: ${width}; height: ${height};`;
</script>

<div class="icon-switch" {style}>
  <div class="icon-switch__inner" class:switched>
    <div class="icon" class:hidden={switched}>
      <slot name="a" />
    </div>
    <div class="icon" class:hidden={!switched}>
      <slot name="b" />
    </div>
  </div>
</div>

<style>
  .icon-switch {
    /* width: 25px;
    height: 25px; */
    overflow: hidden;
    /* background-color: red; */
    border-radius: 5px;
  }

  .icon {
    transition-property: transform, opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  .icon.hidden {
    opacity: 0;
    transform: scale(0);
  }

  .icon-switch__inner {
    display: flex;
    flex-direction: column;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  .icon-switch__inner.switched {
    transform: translateY(-50%);
  }
</style>
