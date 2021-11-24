export type ArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift';
export type ArrayItems<T extends Array<any>> = T extends Array<infer TItems>
  ? TItems
  : never;

export type FixedLengthArray<T extends any[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };

export type FixedLengthArrayMin<T extends any[]> = FixedLengthArray<T> & {
  0: keyof T;
};

/**
 * The representation of a position.
 * Equivalent to [number, number]
 */
export type Position = FixedLengthArrayMin<[number, number]>;

/**
 * The representation of a range.
 * Equivalent to [number, number]
 */
export type NumberRange = FixedLengthArrayMin<[number, number]>;

/**
 * The representation of an Offset.
 * Equivalent to [number, number]
 */
export type Offset = FixedLengthArrayMin<[number, number]>;
