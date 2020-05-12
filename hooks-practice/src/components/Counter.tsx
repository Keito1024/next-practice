import React, { useReducer } from 'react';

interface CounterState {
  count: number
}

interface CounterAction {
  type: ActionType,
  payload: CounterState
}

enum ActionType {
  INCREMENT = 'increment',
  DECREMENT = 'decrement'
}

const initialState = { count: 0 };

const reducer: React.Reducer<CounterState, CounterAction> = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

export const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: ActionType.DECREMENT, payload: {...state}})}>-</button>
      <button onClick={() => dispatch({type: ActionType.INCREMENT, payload: {...state}})}>+</button>
    </>
  );
}

export default Counter;