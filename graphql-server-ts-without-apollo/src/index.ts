import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { GraphQLSchema } from 'graphql';

import { queryType } from './fields';

const PORT = 4000;
const app = express();


const schema = new GraphQLSchema({
  query: queryType
})

app.use('/graphql', express.json(), graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => console.log('Listening on :4000'));