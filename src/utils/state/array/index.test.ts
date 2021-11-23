import { StateArray } from '.';

test('Array with 1 value exists', () => {
  const arr = new StateArray<number>([1], () => {});

  expect(arr.length == 1).toBe(true);
});

test('Array with 2 values exists', () => {
  const arr = new StateArray<number>([1, 1], () => {});

  expect(arr.length == 2).toBe(true);
});

test('Array push adds value', () => {
  const arr = new StateArray<number>([], () => {});
  arr.push(3);

  expect(arr.length == 1).toBe(true);
});

test('Array shift removes value', () => {
  const arr = new StateArray<number>([3], () => {});
  arr.shift();

  expect(arr.length == 0).toBe(true);
});

test('Array splice mutates array', () => {
  const arr = new StateArray<number>([3], () => {});
  arr.splice(0, 1);

  expect(arr.length == 0).toBe(true);
});

test('Array splice returns deleted element', () => {
  const arr = new StateArray<number>([3], () => {});
  const deleted = arr.splice(0, 1);

  expect(deleted[0] == 3).toBe(true);
});
