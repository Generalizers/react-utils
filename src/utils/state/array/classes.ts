import { Unpacked } from '../../types';
import { Dispatch, SetStateAction } from 'react';

import { OrderError } from './errors';
import {
  DistanceType,
  FixedLengthArrayOrAny,
  StateArrayDistantReturn,
  StateArrayIndexableReturn,
  StateArrayIndexableSelected,
  StateArraySettable,
} from './types';
import {
  convertToDistances,
  getDistancesSumArray,
  getMergedDistanceArray,
  isOrdered,
} from './utils';

/**
 * Extended version of the JS Array to handle state managment
 */
export class StateArray<T extends FixedLengthArrayOrAny>
  extends Array<Unpacked<T>>
  implements StateArraySettable<T>
{
  set: Dispatch<React.SetStateAction<T>>;
  constructor(items: T | number, setItems: Dispatch<React.SetStateAction<T>>) {
    super(
      ...(Number.isInteger(items)
        ? [items]
        : (items as T).length == 1
        ? [1]
        : (items as T)),
    );
    if (!Number.isInteger(items)) {
      if ((items as T).length == 1) this[0] = (items as T)[0];
    }
    this.set = setItems;
  }
  pop(): Unpacked<T> | undefined {
    return this.dispatch(super.pop());
  }
  push(...items: Unpacked<T>[]): number {
    return this.dispatch(super.push(...items));
  }
  reverse(): Unpacked<T>[] {
    return this.dispatch(super.reverse());
  }
  shift(): Unpacked<T> | undefined {
    return this.dispatch(super.shift());
  }
  splice(start: any, deleteCount?: any, ...rest: any[]): Unpacked<T>[] {
    return this.dispatch(super.splice(start, deleteCount, ...rest));
  }
  unshift(...items: Unpacked<T>[]): number {
    return this.dispatch(super.unshift(...items));
  }
  fill(value: Unpacked<T>, start?: number, end?: number): any {
    return this.fill(value, start, end) as typeof this;
  }
  dispatch<R>(r: R, arr?: T): R {
    this.set([...(arr == undefined ? this : arr)] as any);
    return r;
  }
}

export class StateArrayDistance<T extends FixedLengthArrayOrAny<number[]>>
  extends StateArray<T>
  implements StateArrayDistantReturn
{
  distances: number[];

  constructor(items: T | number, setItems: Dispatch<React.SetStateAction<T>>) {
    super(items, setItems);

    this.distances = items as number[];
    if (!Number.isInteger(items))
      this.distances = convertToDistances(items as number[]);
  }

  pop(): Unpacked<T> | undefined {
    this.distances.pop();
    return this.dispatch(super.pop());
  }
  push(...items: Unpacked<T>[]): number {
    this.distances = getMergedDistanceArray(this, items);
    return this.dispatch(
      this.length,
      getDistancesSumArray(this.distances) as T,
    );
  }
  reverse(): Unpacked<T>[] {
    const reversed = super.reverse();
    this.distances = convertToDistances(reversed);
    return this.dispatch(reversed);
  }
  shift(): Unpacked<T> | undefined {
    const shifted = super.shift();
    this.distances = convertToDistances([...this] as number[]);
    return this.dispatch(shifted);
  }
  splice(start: number, deleteCount?: any, ...rest: any[]): Unpacked<T>[] {
    const distArr = getMergedDistanceArray(this as number[], rest as number[]);
    this.distances.splice(start, deleteCount, ...distArr);
    const r = this.splice(start, deleteCount, ...rest);
    this.set(getDistancesSumArray(this.distances) as T);
    return this.dispatch(r);
  }
  unshift(...items: Unpacked<T>[]): number {
    return this.dispatch(super.unshift(...items));
  }

  dispatch<R>(r: R, arr?: T): R {
    const array = arr == undefined ? this : arr;
    if (!isOrdered(arr as number[]))
      throw new OrderError('Wrong new value for StateArrayDistance');

    super.dispatch(r, array as T);
    return r;
  }
}

export class StateArrayDistanceIndex<T extends FixedLengthArrayOrAny<number[]>>
  extends StateArrayDistance<T>
  implements StateArrayIndexableReturn<T>
{
  private index: number = 0;
  select: Dispatch<SetStateAction<number>>;
  selected: StateArrayIndexableSelected<T>;
  constructor(
    items: T,
    setItems: Dispatch<SetStateAction<T>>,
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
  ) {
    super(items, setItems);
    this.index = index;
    this.select = setIndex;
    this.selected = {
      value: items[this.index] as Unpacked<T>,
      index: this.index,
    };
  }
}

export class StateArrayIndex<T extends FixedLengthArrayOrAny>
  extends StateArray<T>
  implements StateArrayIndexableReturn<T>
{
  private index: number = 0;
  select: Dispatch<SetStateAction<number>>;
  selected: StateArrayIndexableSelected<T>;
  constructor(
    items: T,
    setItems: Dispatch<SetStateAction<T>>,
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
  ) {
    super(items, setItems);
    this.index = index;
    this.select = setIndex;
    this.selected = {
      value: items[this.index],
      index: this.index,
    };
  }
}
