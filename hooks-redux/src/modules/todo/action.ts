import { ActionTypes } from '../actionTypes';
import { TodoActionTypes } from './types';

export const addTodo = (title: string): TodoActionTypes => {
  return {
    type: ActionTypes.addTodo,
    payload: {
      title
    }
  }
}