import { Unpacked } from '../../types';
import { Dispatch, SetStateAction, useState } from 'react';

import {
  StateArray,
  StateArrayDistance,
  StateArrayDistanceIndex,
  StateArrayIndex,
} from './classes';
import {
  DistanceType,
  FixedLengthArrayOrAny,
  StateArrayReturns,
  StateArraySettable,
} from './types';
import { proxyArrayOverride } from './utils';

type Return<
  T extends FixedLengthArrayOrAny,
  K extends keyof StateArrayReturns<T>,
> = {
  [P in K]: (x: StateArrayReturns<T>[P]) => void;
}[K] extends (x: infer I) => void
  ? I
  : never;

/**
 * Returns a stateful value array.
 * All modifications will trigger a setState dispatcher to run
 * @param initialState
 * @returns StateArray<T>
 */
export const useStateArray =
  <T extends FixedLengthArrayOrAny = any[]>() =>
  <K extends keyof StateArrayReturns<T> = never>(
    initialState: T,
    options?: Pick<StateArrayOptions, K> & Partial<StateArrayOptions>,
  ): T & StateArraySettable<T> & Return<T, K> => {
    const [state, setState] = useState<T>(initialState);
    let stateArrayRedefined;

    if (options) {
      if (options.selectable) {
        const [indexState, setIndexState] = useState(
          options.selectable.index ?? 0,
        );
        if (options.distance) {
          stateArrayRedefined = new Proxy(
            new StateArrayDistanceIndex<T>(
              state,
              setState,
              indexState,
              setIndexState,
            ),
            proxyArrayOverride<Unpacked<T>>(
              setState as Dispatch<SetStateAction<any[]>>,
            ),
          );
        } else {
          stateArrayRedefined = new Proxy(
            new StateArrayIndex<T>(state, setState, indexState, setIndexState),
            proxyArrayOverride<Unpacked<T>>(
              setState as Dispatch<SetStateAction<any[]>>,
            ),
          );
        }
      } else if (options.distance) {
        stateArrayRedefined = new Proxy(
          new StateArrayDistance<T>(state, setState),
          proxyArrayOverride<Unpacked<T>>(
            setState as Dispatch<SetStateAction<any[]>>,
          ),
        );
      }
    }
    if (!stateArrayRedefined) {
      stateArrayRedefined = new Proxy(
        new StateArray<T>(state, setState),
        proxyArrayOverride<Unpacked<T>>(
          setState as Dispatch<SetStateAction<any[]>>,
        ),
      );
    }
    return stateArrayRedefined as any;
  };

interface StateArrayOptions {
  selectable: { index?: number };
  distance: boolean;
}
