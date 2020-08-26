/** @jsx jsx */
// ↑↑　ファイル冒頭で /** @jsx jsx */ の『JSX Pragma』というマジックワード を記述
import React, { useReducer } from 'react';

import { css, jsx } from '@emotion/core';

interface CounterState {
  count: number;
}

interface CounterAction {
  type: string;
  payload: CounterState;
}

const ActionType = {
  increment: "INCREMENT",
  decrement: "DECREMENT",
} as const;

const initialState = { count: 0 };

const reducer: React.Reducer<CounterState, CounterAction> = (
  state: CounterState,
  action: CounterAction
) => {
  switch (action.type) {
    case ActionType.increment:
      return { count: state.count + 1 };
    case ActionType.decrement:
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

export const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <br />
      <button
        onClick={() =>
          dispatch({ type: ActionType.decrement, payload: { ...state } })
        }
      >
        -
      </button>
      <button
        css={
          css`
            background-color: red;
          `}
        onClick={() =>
          dispatch({ type: ActionType.increment, payload: { ...state } })
        }
      >
        +
      </button>
    </div>
  );
};

export default Counter;
