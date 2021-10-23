<script lang="ts">
  import { afterUpdate } from "svelte";

  export let imageData: ImageData;
  export let pixelSize = 5;

  let canvas: HTMLCanvasElement;

  afterUpdate(() => {
    canvas.width = imageData.width * pixelSize;
    canvas.height = imageData.height * pixelSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = imageData.width;
    tmpCanvas.height = imageData.height;
    const tmpCtx = tmpCanvas.getContext("2d");
    if (!tmpCtx) return;
    tmpCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(tmpCanvas, 0, 0, canvas.width, canvas.height);
  });
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    display: block;
    background-color: var(--col-bg-0);
    border-radius: 5px;
    box-shadow: var(--shadow);
  }
</style>
