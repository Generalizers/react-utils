import { Dispatch, useState } from 'react';

/**
 * Returns a stateful value array.
 * All modifications will trigger a setState dispatcher to run
 * @param initialState
 * @returns StateArray<T>
 */
export const useStateArray = <T extends any>(initialState: T[]) => {
  const [state, setState] = useState<T[]>(initialState);
  const stateArray = new StateArray<T>(state, setState);
  return stateArray;
};

/**
 * Extended version of the JS Array to handle state managment
 */
export class StateArray<T> extends Array<T> {
  set: Dispatch<React.SetStateAction<T[]>>;
  constructor(items: T[], setItems: Dispatch<React.SetStateAction<T[]>>) {
    super(...(items.length == 1 ? ([items] as unknown as T[]) : items));
    // Set the prototype explicitly for es2015
    Object.setPrototypeOf(this, Array.prototype);
    this.set = setItems;
  }
  pop: () => T | undefined = (): T | undefined => {
    return this.dispatch(super.pop());
  };
  push: (...items: T[]) => number = (...items: T[]) => {
    return this.dispatch(super.push(...items));
  };
  reverse: () => T[] = (): T[] => {
    return this.dispatch(super.reverse());
  };
  shift: () => T | undefined = (): T | undefined => {
    return this.dispatch(super.shift());
  };
  splice: (start: any, deleteCount?: any, ...rest: any[]) => T[] = (
    start: any,
    deleteCount?: any,
    ...rest: any[]
  ) => {
    return this.dispatch(super.splice(start, deleteCount, ...rest));
  };
  unshift: (...items: T[]) => number = (...items: T[]) => {
    return this.dispatch(super.unshift(...items));
  };
  fill: (value: T, start?: number, end?: number) => any = (
    value: T,
    start?: number,
    end?: number,
  ) => {
    return this.fill(value, start, end) as typeof this;
  };
  private dispatch: <R>(r: R) => R = <R>(r: R) => {
    this.set([...this]);
    return r;
  };
}
