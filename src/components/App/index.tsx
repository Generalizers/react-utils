import { Position } from '../../module';
import { useMouse } from '../../utils/react';
import { useStateArray } from '../../utils/state/array';
import { FunctionComponent, useState } from 'react';

export const App: FunctionComponent = () => {
  const rand10 = () => Math.round(Math.random() * 10);
  const randArr = () => {
    return [...new Array(20).keys()].map((n) => Math.round(rand10()));
  };
  const numberStateArray = useStateArray<number[]>([1, 2, 3]);
  const [arr, setArr] = useState<number[]>([1, 2, 3]);

  useMouse(
    'down',
    () => {
      console.log('DOWN');
      numberStateArray[1] = 5;
      setArr([...arr.slice(0, 1), 5, ...arr.slice(1, 2)]);
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
