/**
 * The function takes a number and returns another number
 * that is inside the bound
 * @param n The number that needs to be bound
 * @param bound The number that bounds [-bound, bound]
 */
export function bound(n: number, bound: number): number;

/**
 * The function takes a number and returns another number
 * that is inside the bound
 * @param n The number that needs to be bound
 * @param min The lowest number that n can be
 * @param max The highest number that n can be
 */
export function bound(n: number, min: number, max: number): number;

export function bound(n: number, min: number, max?: number) {
  const minMax = max ?? -min;
  return n > minMax ? minMax : n < min ? min : n;
}
