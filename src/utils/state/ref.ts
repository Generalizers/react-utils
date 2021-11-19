import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useStateRef = <T extends unknown>(
  initialState: T | (() => T)
): [MutableRefObject<T>, (data: T) => void] => {
  const [state, setState] = useState<T>(initialState);
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return [
    ref,
    (data: T) => {
      ref.current = data;
      setState(data);
    },
  ];
};
