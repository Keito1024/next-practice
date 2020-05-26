import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// 型定義
export const memberType = new GraphQLObjectType({
  name: 'member',
  description: 'member',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The member Id'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'THe member name'
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The member age'
    }
  }
})