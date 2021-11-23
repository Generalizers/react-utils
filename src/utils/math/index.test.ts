import { bound } from '.';

const min = -1;
const max = 1;

test('Lower than min returns min', () => {
  const val = bound(-2, min, max);

  expect(val == min).toBe(true);
});

test('Higher than max returns max', () => {
  const val = bound(2, min, max);

  expect(val == max).toBe(true);
});

test('Inside min and max returns value', () => {
  const val = bound(0, min, max);

  expect(val == 0).toBe(true);
});
