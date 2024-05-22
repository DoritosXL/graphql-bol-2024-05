import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import buildContext from './buildContext.js';
import authDirectiveTransformer from './authDirectiveTransformer.js';

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = authDirectiveTransformer(schema, 'auth');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => buildContext(req),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(() => console.log('🚀 Server ready at port 4000'));
