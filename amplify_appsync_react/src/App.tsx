import './App.css';

import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import { ListTodosQuery, OnCreateTodoSubscription } from './api';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { onCreateTodo } from './graphql/subscriptions';

type PostSubscriptionEvent = { value: { data: OnCreateTodoSubscription } };
type Todo = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

const App: React.FC = () => {
  // 投稿リスト
  const [posts, setPosts] = useState<Todo[]>([]);

  // title
  const [name, setName] = useState("");

  // description
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      // 最初のPost一覧取得
      const result = await API.graphql(graphqlOperation(listTodos));
      if ("data" in result && result.data) {
        const posts = result.data as ListTodosQuery;
        if (posts.listTodos) {
          setPosts(posts.listTodos.items as Todo[]);
        }
      }

      // Post追加イベントの購読
      const client = API.graphql(graphqlOperation(onCreateTodo));
      if ("subscribe" in client) {
        client.subscribe({
          next: ({ value: { data } }: PostSubscriptionEvent) => {
            if (data.onCreateTodo) {
              const post: Todo = data.onCreateTodo;
              setPosts(prev => [...prev, post]);
            }
          }
        });
      }
    })();
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
      <div>
        {posts.map(data => {
          return (
            <div key={data.id}>
              <h4>{data.name}</h4>
              <p>{data.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
