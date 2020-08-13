import './App.css';

import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

const App: React.FC = () => {
  // 投稿リスト
  const [posts, setPosts] = useState([]);

  // title
  const [name, setName] = useState("");

  // description
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        // タスク一覧取得
        const posts = await API.graphql(graphqlOperation(listTodos));
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  // タスクを追加
  const addTodo = async() => {
    if (!name || !description) {
      return;
    }
    // 新規登録 mutation
    const createTodoInput = {
      name,
      description
    }

    try {
      await API.graphql(graphqlOperation(createTodo, {input: createTodoInput }))
    } catch (error) {
      console.log(error)
    }
  }

  // formEvent onChange
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  return (
    <div className="App">
      <div>
        タイトル
        <input
          value={name}
          onChange={handleChangeName}
        ></input>
      </div>
      <div>
        内容
        <input
          value={description}
          onChange={handleChangeDescription}
        ></input>
      </div>
      <button onClick={addTodo}>追加</button>
    </div>
  );
};

export default App;
