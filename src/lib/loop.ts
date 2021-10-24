export function loop(callBackFn: () => any, fps: number, play = true) {
  const obj = {
    stop() {
      window.clearInterval(intervalId);
      // console.log(`stop ${intervalId} loop`);
      intervalId = undefined;
      play = false;
    },
    start() {
      if (!intervalId) {
        intervalId = window.setInterval(callBackFn, 1000 / fps);
        // console.log(`start ${intervalId} loop`);
        play = true;
      }
    },
    setFps(newFps: number, play = true) {
      fps = newFps;
      this.stop();
      if (play) this.start();
    }
  };
  let intervalId: number | undefined = undefined;
  if (play) obj.start();
  return obj;
}