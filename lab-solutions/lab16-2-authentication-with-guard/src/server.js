import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import buildContext from './buildContext.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => buildContext(req),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(() => console.log('🚀 Server ready at port 4000'));
