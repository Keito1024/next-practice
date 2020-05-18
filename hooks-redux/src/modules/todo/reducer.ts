import { ActionTypes } from '../actionTypes';
import { TodoActionTypes, TodoList } from './types';

const initialSTate: TodoList = []

export const todoReducer = (state = initialSTate, action: TodoActionTypes) => {
  switch (action.type) {
    case ActionTypes.addTodo:
      state.push({
        title: action.payload.title
      })
      return state
    default:
      return state
  }
}