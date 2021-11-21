import { DependencyList, useEffect } from 'react';

/**
 * Allows to use a document event listener
 * @param type The type of DOM event
 * @param f The document callback
 * @param deps The dependency list
 */
export const useEvent = (
  type: keyof DocumentEventMap,
  f: (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
  deps?: DependencyList,
) => {
  useEffect(() => {
    document.addEventListener(type, f);
    return () => {
      document.removeEventListener(type, f);
    };
  }, deps ?? []);
};

type KeyType = 'down' | 'press' | 'up';
type MouseType =
  | 'down'
  | 'enter'
  | 'leave'
  | 'move'
  | 'out'
  | 'over'
  | 'up'
  | 'click';

/**
 * A subset of useEffect but with the global
 * document event listener
 * @param type The type of key event
 * @param f The document callback
 * @param deps The dependency list
 */
export const useKey = (
  type: KeyType,
  f: (this: Document, ev: KeyboardEvent) => any,
  deps?: DependencyList,
) => {
  useEvent(
    `key${type}`,
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps,
  );
};

/**
 * A subset of useEffect but with the global
 * document event listener
 * @param type The type of mouse event
 * @param f The document callback
 * @param deps The dependency list
 */
export const useMouse = (
  type: MouseType,
  f: (e: MouseEvent) => any,
  deps?: DependencyList,
) => {
  useEvent(
    type == 'click' ? type : `mouse${type}`,
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps,
  );
};

/**
 * A subset of useEffect but with the global
 * document event listener
 * @param f The document callback
 * @param deps The dependency list
 */
export const useContextMenu = (
  f: (e: Event) => any,
  deps?: DependencyList
): void => {
  useEvent(
    'contextmenu',
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps
  );
};

export enum Click {
  Left,
  Middle,
  Right,
}
