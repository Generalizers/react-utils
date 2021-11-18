import { FunctionComponent } from 'react';
import { useMouse } from 'utils/react';

export const App: FunctionComponent = () => {
  useMouse('down', () => {
    console.log('DOWN');
  });

  useMouse('up', () => {
    console.log('UP');
  });

  return <main>Hello world</main>;
};
