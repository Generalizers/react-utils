type ArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number;
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems>
  ? TItems
  : never;

export type FixedLengthArray<T extends any[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };

/**
 * The representation of a position.
 * Equivalent to [number, number]
 */
export type Position = FixedLengthArray<[number, number]>;

/**
 * The representation of a range.
 * Equivalent to [number, number]
 */
export type NumberRange = FixedLengthArray<[number, number]>;

/**
 * The representation of an Offset.
 * Equivalent to [number, number]
 */
export type Offset = FixedLengthArray<[number, number]>;
