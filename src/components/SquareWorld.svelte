<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { Coords } from "../lib/grid";

  function mousePixelCoords(e: MouseEvent, canvas: HTMLCanvasElement): Coords {
    const rect = canvas.getBoundingClientRect();
    const x1 = e.clientX - rect.left;
    const y1 = e.clientY - rect.top;
    const x = Math.floor(x1 / pixelSize);
    const y = Math.floor(y1 / pixelSize);
    return [x, y];
  }

  function updatePixels(imageData: ImageData, pixelSize: number) {
    canvas.width = imageData.width * pixelSize;
    canvas.height = imageData.height * pixelSize;
    ctx.imageSmoothingEnabled = false;
    tmpCanvas.width = imageData.width;
    tmpCanvas.height = imageData.height;
    tmpCtx.putImageData(imageData, 0, 0);
  }

  function updateMouse(mouse: Coords | null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmpCanvas, 0, 0, canvas.width, canvas.height);
    mouse && drawMouse(mouse);
  }

  function drawMouse(mouse: Coords) {
    const [x, y] = mouse;
    ctx.beginPath();
    ctx.arc(
      x * pixelSize + pixelSize / 2,
      y * pixelSize + pixelSize / 2,
      Math.max(pixelSize, 5),
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

  export let imageData: ImageData;
  export let pixelSize = 5;

  const dispatch = createEventDispatcher();

  let mouse: Coords | null = null;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let tmpCanvas: HTMLCanvasElement;
  let tmpCtx: CanvasRenderingContext2D;

  onMount(() => {
    ctx = canvas.getContext("2d")!;
    tmpCanvas = document.createElement("canvas");
    tmpCtx = tmpCanvas.getContext("2d")!;
    updatePixels(imageData, pixelSize);
  });

  $: canvas && updatePixels(imageData, pixelSize);
  $: canvas && updateMouse(mouse);
</script>

<canvas
  bind:this={canvas}
  on:click={(e) => {
    if (!mouse) return;
    const [x, y] = mouse;
    dispatch("click-block", { x, y });
  }}
  on:mousemove={(e) => {
    mouse = mousePixelCoords(e, canvas);
  }}
  on:mouseleave={() => (mouse = null)}
/>

<style>
  canvas {
    display: block;
    background-color: var(--col-bg-0);
    border-radius: 5px;
    box-shadow: var(--shadow);
  }
</style>
