## typescript
### const assertion
可変の変数に代入すると`as const`なしだ`string`として判別される
```ts
const Sample = {
  add: "ADD"
} as const
```

