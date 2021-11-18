import {
  DependencyList,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

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

const usePeripheral = (
  type: keyof DocumentEventMap,
  f: (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
  deps?: DependencyList
) => {
  useEffect(() => {
    document.addEventListener(type, f);

    return () => {
      document.removeEventListener(type, f);
    };
  }, deps ?? []);
};

type MouseType =
  | 'down'
  | 'enter'
  | 'leave'
  | 'move'
  | 'out'
  | 'over'
  | 'up'
  | 'click';
type KeyType = 'down' | 'press' | 'up';

export const useMouse = (
  type: MouseType,
  f: (e: MouseEvent) => any,
  deps?: DependencyList
) => {
  usePeripheral(
    type == 'click' ? type : `mouse${type}`,
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps
  );
};

export const useKey = (
  type: KeyType,
  f: (this: Document, ev: KeyboardEvent) => any,
  deps?: DependencyList
) => {
  usePeripheral(
    `key${type}`,
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps
  );
};
