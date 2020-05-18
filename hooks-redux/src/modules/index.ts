/**
 * store本体
 */

import { combineReducers, createStore } from 'redux';

import { todoReducer } from './todo/reducer';

const rootReducer = combineReducers({
  todo: todoReducer
})

// state type
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;