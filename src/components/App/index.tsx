import { NumberRange, Position } from '../../module';
import { useMouse } from '../../utils/react';
import { useStateArray } from '../../utils/state/array';
import { FunctionComponent, useState } from 'react';

export const App: FunctionComponent = () => {
  const rand10 = () => Math.round(Math.random() * 10);
  const randArr = () => {
    return [...new Array(20).keys()].map((n) => Math.round(rand10()));
  };
  const numberStateArray = useStateArray<NumberRange>([1, 10]);

  useMouse(
    'down',
    () => {
      console.log('DOWN');
      numberStateArray.set([10, 4]);
    },
    [numberStateArray],
  );

  useMouse('up', () => {
    console.log('UP');
  });

  return (
    <main>
      {numberStateArray.map((n, i) => (
        <p key={`n-${i}`}>{n}</p>
      ))}
    </main>
  );
};
