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
  // Todoリスト
  const [posts, setPosts] = useState<Todo[]>([]);

  // Todo名
  const [name, setName] = useState("");

  // Todo内容
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      // Todoの一覧取得APIを呼ぶ
      const result = await API.graphql(graphqlOperation(listTodos));
      if ("data" in result && result.data) {
        const posts = result.data as ListTodosQuery;
        if (posts.listTodos) {
          setPosts(posts.listTodos.items as Todo[]);
        }
      }

      // 新規追加イベントの購読
      const client = API.graphql(graphqlOperation(onCreateTodo));
      if ("subscribe" in client) {
        client.subscribe({
          next: ({ value: { data } }: PostSubscriptionEvent) => {
            if (data.onCreateTodo) {
              const post: Todo = data.onCreateTodo;
              setPosts((prev) => [...prev, post]);
            }
          },
        });
      }
    })();
  }, []);

  // Todoを新規追加
  const addTodo = async () => {
    if (!name || !description) {
      return;
    }
    // パラメタ
    const createTodoInput = {
      name,
      description,
    };

    try {
      //  Todoの新規追加APIを呼ぶ
      await API.graphql(
        graphqlOperation(createTodo, { input: createTodoInput })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Todo名の入力値をstateにセットする
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }; 

  // Todo内容の入力値をstateにセットする
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="App">
      <div>
        Todo名
        <input value={name} onChange={handleChangeName} />
      </div>
      <div>
        Todo内容
        <input value={description} onChange={handleChangeDescription} />
      </div>
      <button onClick={addTodo}>追加</button>
      <div>
        {posts.map((data) => {
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