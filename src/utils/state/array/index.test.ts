import { NumberRange, Unpacked } from '../../types';

import { StateArray } from './classes';
import {
  getClosestLowestNumberIndexInArray,
  getDistancesSumArray,
  getMergedDistanceArray,
  isOrdered,
  proxyArrayOverride,
} from './utils';

test('StateArray with 1 value exists', () => {
  const arr = new StateArray<number[]>([1], () => {});

  expect(arr.length == 1).toBe(true);
});

test('StateArray with 2 values exists', () => {
  const arr = new StateArray<number[]>([1, 1], () => {});

  expect(arr.length == 2).toBe(true);
});

test('StateArray push adds value', () => {
  const arr = new StateArray<number[]>([], () => {});
  arr.push(3);

  expect(arr.length == 1).toBe(true);
});

test('StateArray shift removes value', () => {
  const arr = new StateArray<number[]>([3, 10], () => {});
  arr.shift();

  expect(arr.length == 1).toBe(true);
});

test('StateArray proxy override setting element', () => {
  const arr = new Proxy(
    new StateArray<number[]>([3], () => {}),
    proxyArrayOverride(() => {}),
  );

  arr[0] = 5;

  expect(arr[0] === 5).toBe(true);
});

test('StateArray accessors work correctly', () => {
  const arr = new Proxy(
    new StateArray<NumberRange>([3, 4], () => {}),
    proxyArrayOverride<Unpacked<NumberRange>>(() => {}),
  );

  expect(arr[0] === 3 && arr[1] === 4).toBe(true);
});

test('StateArray NumberRange set is allowed', () => {
  const arr = new Proxy(
    new StateArray<NumberRange>([3, 4], () => {}),
    proxyArrayOverride(() => {}),
  );

  arr.set([5, 5]);

  expect(true).toBe(true);
});

test('StateArray number array set is allowed', () => {
  const arr = new Proxy(
    new StateArray<number[]>([3, 4], () => {}),
    proxyArrayOverride(() => {}),
  );

  arr.set([5, 5, 10]);

  expect(true).toBe(true);
});

test('Is ordered empty returns true', () => {
  const arr: number[] = [];

  expect(isOrdered(arr)).toBe(true);
});

test('Is ordered 1 number returns true', () => {
  const arr: number[] = [5];

  expect(isOrdered(arr)).toBe(true);
});

test('Is ordered 2 ascending numbers returns true', () => {
  const arr: number[] = [5, 10];

  expect(isOrdered(arr)).toBe(true);
});

test('Is ordered 2 ascending numbers returns false', () => {
  const arr: number[] = [5, 0];

  expect(isOrdered(arr)).toBe(false);
});

test('Closest lowest number index not equal', () => {
  const arr = [3, 6, 9];

  expect(getClosestLowestNumberIndexInArray(arr, 5) == 0).toBe(true);
});

test('Closest lowest number index equal', () => {
  const arr = [3, 6, 9];

  expect(getClosestLowestNumberIndexInArray(arr, 6) == 1).toBe(true);
});

test('Distances sum array', () => {
  const arr = [3, 3, 3];
  const sumArr = getDistancesSumArray(arr);

  expect(sumArr[0] == 3 && sumArr[1] == 6 && sumArr[2] == 9).toBe(true);
});

test('Distance array', () => {
  const arr = [3, 6, 9];

  const dist = getMergedDistanceArray(arr, [5]);

  expect(dist[1] == 2);
});
