import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../modules';
import { addTodo } from '../../modules/todo/action';
import { TodoList } from './TodoList';

export const TodoForm: React.FC = () => {

  // storeから取得
  const todoList = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  const inputForm = useRef<HTMLInputElement | null>(null);
  const [inputTodo, setInputTodo] = useState<string>("");
  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputTodo(event.target.value);
  }, []);

  const clearInput = useCallback(() => {
    if (inputForm.current !== null) {
      inputForm.current.value = "";
      setInputTodo("");
    }
  }, []);

  const handleAdd = () => {
    dispatch(addTodo(inputTodo));
    clearInput();
  };

  return (
    <>
      <h1>TODO</h1>
      <input ref={inputForm} onChange={handleInput}></input>
      <button onClick={handleAdd}>ADD</button>
      <ul>
        {todoList.map(item => (
          <TodoList key={item.title}>
            {item.title}
          </TodoList>
        ))}
      </ul>
    </>
  );
};