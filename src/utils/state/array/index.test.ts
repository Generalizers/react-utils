import { PROXY_ARRAY_OVERRIDE, StateArray } from '.';
import { NumberRange } from '../../types';

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
  const arr = new StateArray<number[]>([3], () => {});
  arr.shift();

  expect(arr.length == 0).toBe(true);
});

test('StateArray splice mutates array', () => {
  const arr = new StateArray<number[]>([3], () => {});
  arr.splice(0, 1);

  expect(arr.length == 0).toBe(true);
});

test('StateArray splice returns deleted element', () => {
  const arr = new StateArray<number[]>([3], () => {});
  const deleted = arr.splice(0, 1);

  expect(deleted[0] == 3).toBe(true);
});

test('StateArray proxy override setting element', () => {
  const arr = new Proxy(
    new StateArray<number[]>([3], () => {}),
    PROXY_ARRAY_OVERRIDE(() => {}),
  );

  arr[0] = 5;

  expect(arr[0] === 5).toBe(true);
});

test('StateArray accessors work correctly', () => {
  const arr = new Proxy(
    new StateArray<NumberRange>([3, 4], () => {}),
    PROXY_ARRAY_OVERRIDE(() => {}),
  );

  expect(arr[0] === 3 && arr[1] === 4).toBe(true);
});
