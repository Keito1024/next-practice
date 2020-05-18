
import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

// state型定義
export type Todo = {
  title: string;
}

export type TodoList = Todo[]

interface AddTodoAction extends Action {
  type: typeof ActionTypes.addTodo;
  payload: {title: string}
}


export type TodoActionTypes = AddTodoAction