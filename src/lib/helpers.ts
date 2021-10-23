export function randFloat(
  bottom: number,
  top: number,
  rand: () => number = Math.random
) {
  return rand() * (top - bottom) + bottom;
}

export function randInt(
  bottom: number,
  top: number,
  rand: () => number = Math.random
) {
  return Math.floor(randFloat(bottom, top, rand));
}

export function randChoice<T>(
  arr: T[],
  rand: () => number = Math.random
) {
  return arr[randInt(0, arr.length, rand)]!;
}

export function fixNumber(
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

export function limit(
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
