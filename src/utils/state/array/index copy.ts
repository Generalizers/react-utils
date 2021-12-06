// import { Dispatch, SetStateAction, useState } from 'react';

// import { OrderError } from './errors';
// import {
//   FixedLengthArrayExt,
//   FixedLengthArrayMinOrAny,
//   IndexableArray,
//   IndexableArraySelected,
//   StateArraySet,
// } from './types';
// import { PROXY_ARRAY_OVERRIDE, isOrdered } from './utils';

// /**
//  * Returns a stateful value array.
//  * All modifications will trigger a setState dispatcher to run
//  * @param initialState
//  * @returns StateArray<T>
//  */
// export function useStateArray<T extends FixedLengthArrayMinOrAny<any>>(
//   initialState: T,
//   selected: number = 0,
// ): FixedLengthArrayExt<T> {
//   const [state, setState] = useState<T>(initialState);
//   const [indexState, setIndexState] = useState(selected);
//   const stateArrayRedefined = new Proxy(
//     new IndexableStateArray<T>(state, setState, indexState, setIndexState),
//     PROXY_ARRAY_OVERRIDE<keyof T>(setState as Dispatch<SetStateAction<any[]>>),
//   );
//   return stateArrayRedefined as any;
// }

// export const useStateOrderArray = <T extends any[]>(initialState: T) => {
//   const array = useStateArray<T>(initialState);
// };

// /**
//  * Extended version of the JS Array to handle state managment
//  */
// export class StateArray<T extends FixedLengthArrayMinOrAny<any>>
//   extends Array<keyof T>
//   implements StateArraySet<T>
// {
//   set: Dispatch<React.SetStateAction<T>>;
//   constructor(items: T, setItems: Dispatch<React.SetStateAction<T>>) {
//     super(...(items.length == 1 ? ([1] as unknown as T[]) : items));
//     if (items.length == 1) this[0] = items[0] as keyof T;

//     // Set the prototype explicitly for es2015
//     Object.setPrototypeOf(this, Array.prototype);
//     this.set = setItems;
//   }
//   pop: () => keyof T | undefined = (): keyof T | undefined => {
//     return this.dispatch(super.pop());
//   };
//   push: (...items: (keyof T)[]) => number = (...items: (keyof T)[]) => {
//     return this.dispatch(super.push(...items));
//   };
//   reverse: () => (keyof T)[] = (): (keyof T)[] => {
//     return this.dispatch(super.reverse());
//   };
//   shift: () => keyof T | undefined = (): keyof T | undefined => {
//     return this.dispatch(super.shift());
//   };
//   splice: (start: any, deleteCount?: any, ...rest: any[]) => (keyof T)[] = (
//     start: any,
//     deleteCount?: any,
//     ...rest: any[]
//   ) => {
//     return this.dispatch(super.splice(start, deleteCount, ...rest));
//   };
//   unshift: (...items: (keyof T)[]) => number = (...items: (keyof T)[]) => {
//     return this.dispatch(super.unshift(...items));
//   };
//   fill: (value: keyof T, start?: number, end?: number) => any = (
//     value: keyof T,
//     start?: number,
//     end?: number,
//   ) => {
//     return this.fill(value, start, end) as typeof this;
//   };
//   protected dispatch: <R>(r: R) => R = <R>(r: R) => {
//     this.set([...this] as any);
//     return r;
//   };
// }

// export class StateOrderArray extends StateArray<number[]> {
//   protected dispatch: <R>(r: R) => R = <R>(r: R) => {
//     if (!isOrdered(this as number[])) throw new OrderError();
//     this.set([...this] as any);
//     return r;
//   };
// }

// export class IndexableStateArray<T extends FixedLengthArrayMinOrAny<any>>
//   extends StateArray<T>
//   implements IndexableArray<T>
// {
//   private index = 0;
//   setSelected: Dispatch<SetStateAction<number>>;
//   selected: IndexableArraySelected<T>;
//   constructor(
//     items: T,
//     setItems: Dispatch<SetStateAction<T>>,
//     index: number,
//     setIndex: Dispatch<SetStateAction<number>>,
//   ) {
//     super(items, setItems);
//     this.index = index;
//     this.setSelected = setIndex;
//     this.selected = {
//       value: items[this.index],
//       index: this.index,
//     };
//   }
// }
