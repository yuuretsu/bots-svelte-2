export let random: () => number;

export const initiallySeed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

setupRandom(initiallySeed);

export function setupRandom(seed: number) {
  function mulberry32(a: number) {
    return function () {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }
  random = mulberry32(seed);
  console.log(random());
  return random;
}

export function randFloat(
  bottom: number,
  top: number,
  rand: () => number = random
) {
  return rand() * (top - bottom) + bottom;
}

export function randInt(
  bottom: number,
  top: number,
  rand: () => number = random
) {
  return Math.floor(randFloat(bottom, top, rand));
}

export function randChoice<T>(
  arr: T[],
  rand: () => number = random
) {
  return arr[randInt(0, arr.length, rand)]!;
}

export function clampCircular(
  min: number,
  max: number,
  number: number
): number {
  return number >= min
    ? number % max
    : max - (-number % max);
}

export function normalizeNumber(
  min: number,
  max: number,
  number: number
): number {
  return (number - min) / (max - min);
}

export function clamp(
  min: number,
  max: number,
  number: number
): number {
  return Math.max(Math.min(number, max), min);
}

export function lerp(
  a: number,
  b: number,
  t: number
): number {
  return a + (b - a) * t;
}
