import { Dispatch } from 'react';

import { OrderError } from './errors';

export const proxyArrayOverride = <T>(
  setState: Dispatch<React.SetStateAction<T[]>>,
) => {
  return {
    set: (target: T[], name: any, value: any) => {
      target[name] = value;
      setState([...target]);
      return Reflect.set(target, name, value);
    },
    get: (target: T[], name: any) => {
      return Reflect.get(target, name);
    },
    has(target: T[], name: string) {
      if (['0', '1', 'length'].includes(name)) return true;
      return Reflect.has(target, name);
    },
  };
};

/**
 * Checks weither an array has increasing values or not
 * @param arr The array with numbers
 * @param order The order type `ascending` or `descending`
 * @returns `true` or `false`
 */
export const isOrdered = (arr: number[]): boolean => {
  const orderArr = [...arr];
  return orderArr
    .map((elem, i) => i == 0 || orderArr[i - 1] <= elem)
    .every((b) => b);
};

export const convertToDistances = (items: number[]): number[] => {
  if (!isOrdered(items)) throw new OrderError('Given array is not ordered');
  return [...items].map((elem, i) => {
    return i == 0 ? elem : elem - items[i - 1];
  });
};

export const getDistancesSumArray = (distances: number[]) => {
  return distances.map((_, i) => {
    return distances
      .filter((_, j) => j <= i)
      .reduce((acc, cur) => acc + cur, 0);
  });
};

export const getClosestLowestNumberIndexInArray = (
  items: number[],
  item: number,
) => {
  const newItems = items.filter((v) => v <= item);
  return newItems.length - 1;
};

export const getMergedDistanceArray = (
  sumArrayItems: number[],
  newItems: number[],
) => {
  if (newItems.length == 0) return sumArrayItems;
  const lowest = getClosestLowestNumberIndexInArray(sumArrayItems, newItems[0]);
  const arr = [...convertToDistances(sumArrayItems)];

  arr.splice(
    lowest + 1,
    0,
    ...convertToDistances(newItems).map((e) => e - sumArrayItems[lowest]),
  );

  return arr;
};
