import { GraphQLObjectType } from 'graphql';

import { memberField } from './member';

// 実装したすべてのモジュールを Root Query としてまとめてエクスポート
export const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'the root query type',
  fields: {
    ...memberField.query
  }
})