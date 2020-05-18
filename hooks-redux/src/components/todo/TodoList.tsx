import React from 'react';

type TodoProps = {
  children?: React.ReactNode;
}
export const TodoList: React.FC<TodoProps> = props => {
  return (
    <li>
      {props.children}
    </li>
  )
}