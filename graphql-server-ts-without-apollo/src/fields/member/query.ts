import { GraphQLList } from 'graphql';

import { getMembers } from './resolvers';
import { memberType } from './type';

// Query は REST APIの GET に相当します。
export const memberQuery = {
  memberList: {
    type: new GraphQLList(memberType),
    description: 'Get list of member data.',
    resolve: getMembers
  }
}