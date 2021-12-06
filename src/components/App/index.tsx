import { NumberRange, Position, useStateArray } from '../../module';
import { useMouse } from '../../utils/react';
import { FunctionComponent, useState } from 'react';

export const App: FunctionComponent = () => {
  const rand10 = () => Math.round(Math.random() * 5);
  const randArr = () => {
    return [...new Array(20).keys()].map((n) => Math.round(rand10()));
  };
  const arr = useStateArray()([1, 3, 6], {
    distance: true,
  });

  useMouse(
    'down',
    () => {
      const r = rand10();
      console.log('ADD', r);

      arr.push(r);
    },
    [arr],
  );

  console.log('arr', arr);
  return (
    <div>
      {arr.map((e, i) => (
        <p key={i}>{e}</p>
      ))}
    </div>
  );
};
