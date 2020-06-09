import React from 'react';

// 最初から型とObject用意しておけばundefined考慮しなくても良い

// 型定義
type ContextSample = {
  userId: string
}

// Object
export const ctx: ContextSample = {
  userId: "xxxxxx"
}

// context
export const currentUserContext = React.createContext<ContextSample>(ctx)