import { FixedLengthArray, FixedLengthArrayMin } from '../../types';
import { Dispatch, SetStateAction, useState } from 'react';

export const PROXY_ARRAY_OVERRIDE = <T>(
  setState: Dispatch<React.SetStateAction<T[]>>,
) => {
  return {
    set: (target: T[], name: any, value: any) => {
      target[name] = value;
      setState([...target]);
      return true;
    },
    get: (target: T[], name: any) => {
      return target[name];
    },
  };
};

type FixedLengthArrayMinOrAny<T> = FixedLengthArrayMin<T[]> | T[];
type FixedLengthArrayExt<T> = T extends FixedLengthArray<any>
  ? T & StateArraySet<T>
  : any[];

/**
 * Returns a stateful value array.
 * All modifications will trigger a setState dispatcher to run
 * @param initialState
 * @returns StateArray<T>
 */
export function useStateArray<T extends FixedLengthArrayMinOrAny<any>>(
  initialState: T,
): FixedLengthArrayExt<T> {
  const [state, setState] = useState<T>(initialState);
  const stateArrayRedefined = new Proxy(
    new StateArray<T>(state, setState),
    PROXY_ARRAY_OVERRIDE<keyof T>(setState as Dispatch<SetStateAction<any[]>>),
  );
  return stateArrayRedefined as any;
}

interface StateArraySet<T> {
  set: Dispatch<React.SetStateAction<T>>;
}

/**
 * Extended version of the JS Array to handle state managment
 */
export class StateArray<T extends FixedLengthArrayMinOrAny<any>>
  extends Array<keyof T>
  implements StateArraySet<T>
{
  set: Dispatch<React.SetStateAction<T>>;
  constructor(items: T, setItems: Dispatch<React.SetStateAction<T>>) {
    super(...(items.length == 1 ? ([1] as unknown as T[]) : items));
    if (items.length == 1) this[0] = items[0] as keyof T;

    // Set the prototype explicitly for es2015
    Object.setPrototypeOf(this, Array.prototype);
    this.set = setItems;
  }
  pop: () => keyof T | undefined = (): keyof T | undefined => {
    return this.dispatch(super.pop());
  };
  push: (...items: (keyof T)[]) => number = (...items: (keyof T)[]) => {
    return this.dispatch(super.push(...items));
  };
  reverse: () => (keyof T)[] = (): (keyof T)[] => {
    return this.dispatch(super.reverse());
  };
  shift: () => keyof T | undefined = (): keyof T | undefined => {
    return this.dispatch(super.shift());
  };
  splice: (start: any, deleteCount?: any, ...rest: any[]) => (keyof T)[] = (
    start: any,
    deleteCount?: any,
    ...rest: any[]
  ) => {
    return this.dispatch(super.splice(start, deleteCount, ...rest));
  };
  unshift: (...items: (keyof T)[]) => number = (...items: (keyof T)[]) => {
    return this.dispatch(super.unshift(...items));
  };
  fill: (value: keyof T, start?: number, end?: number) => any = (
    value: keyof T,
    start?: number,
    end?: number,
  ) => {
    return this.fill(value, start, end) as typeof this;
  };
  private dispatch: <R>(r: R) => R = <R>(r: R) => {
    this.set([...this] as any);
    return r;
  };
}
