<script lang="ts">
  function onMouseDown(e: MouseEvent) {
    initPos = [e.clientX - currentPos[0], e.clientY - currentPos[1]];
    onMouseMove = mouseMoveInner;
    onMouseUp = clearMouseEvents;
  }

  function mouseMoveInner(e: MouseEvent) {
    e.preventDefault();
    currentPos = [e.clientX - initPos[0], e.clientY - initPos[1]];
    document.body.style.cursor = "grabbing";
  }

  function clearMouseEvents() {
    onMouseMove = undefined;
    onMouseUp = undefined;
    document.body.style.cursor = "";
    if (!document.body.getAttribute("style"))
      document.body.removeAttribute("style");
  }

  function onTouchStart(e: TouchEvent) {
    let x = e.touches[0]?.clientX || 0;
    let y = e.touches[0]?.clientY || 0;
    initPos = [x - currentPos[0], y - currentPos[1]];
    onTouchMove = touchMoveInner;
    onTouchEnd = clearTouchEvents;
  }

  function touchMoveInner(e: TouchEvent) {
    currentPos = [
      e.touches[0]!.clientX - initPos[0],
      e.touches[0]!.clientY - initPos[1],
    ];
  }

  function clearTouchEvents() {
    onTouchMove = undefined;
    onTouchEnd = undefined;
  }

  export let height: string = "auto";
  export let currentPos: [number, number] = [0, 0];
  let onMouseMove: svelte.JSX.MouseEventHandler<Window> | undefined;
  let onMouseUp: svelte.JSX.MouseEventHandler<Window> | undefined;
  let onTouchMove: svelte.JSX.TouchEventHandler<Window> | undefined;
  let onTouchEnd: svelte.JSX.TouchEventHandler<Window> | undefined;
  let initPos: [number, number] = [0, 0];
</script>

<svelte:window
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
  on:touchmove={onTouchMove}
  on:touchend={onTouchEnd}
/>
<div
  class="drag-wrapper"
  style={`height: ${height}`}
  on:mousedown={onMouseDown}
  on:touchstart={onTouchStart}
>
  <div style={`transform: translate(${currentPos[0]}px, ${currentPos[1]}px);`}>
    <slot />
  </div>
</div>

<style>
  .drag-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    overflow: hidden;
    background-color: var(--col-bg-1);
    /* box-shadow: inset 0 0 0 1px green, inset 0 0 0 2px red; */
  }
</style>
