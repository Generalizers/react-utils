import { FixedLengthArray, FixedLengthArrayMin, Unpacked } from '../../types';
import { Dispatch, SetStateAction } from 'react';

export type OrderType = 'ascending' | 'descending';
export type DistanceType = 'distance' | 'sum';

export type FixedLengthArrayOrAny<T extends any[] = any[]> =
  | FixedLengthArray<[...T]>
  | T;
export type FixedLengthArrayExt<T> = T extends FixedLengthArray<[...any]>
  ? T
  : any[];

export type ResolveArrayType<T> = T & StateArraySettable<T>;

/**
 * State Array types
 */

export interface StateArraySettable<T> {
  set: Dispatch<SetStateAction<T>>;
}

export interface StateArrayIndexableReturn<T> {
  selected: StateArrayIndexableSelected<T>;
  select: Dispatch<SetStateAction<number>>;
}

export interface StateArrayIndexableSelected<T> {
  value: Unpacked<T>;
  index: number;
}

export interface StateArrayDistantReturn<T extends number[] = number[]> {
  distances: FixedLengthArrayOrAny<T>;
}

export interface StateArrayReturns<T> {
  selectable: StateArrayIndexableReturn<T>;
  distance: StateArrayDistantReturn;
}
