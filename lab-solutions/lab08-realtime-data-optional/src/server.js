import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';    // 👈 add
import { execute, subscribe } from 'graphql';                       // 👈 add
import { PubSub } from 'graphql-subscriptions';                     // 👈 add
import { ApolloServerPluginLandingPageGraphQLPlayground }  from 'apollo-server-core';
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
import db from './db.js';

async function start() {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const pubsub = new PubSub();        // 👈 add
  const server = new ApolloServer({
    schema,
    context: { 
      db,
      pubsub,                         // 👈 add
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      // 👇 add plugin to close subscription server as well
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  
  await server.start();
  server.applyMiddleware({ app, path: '/' });

  // 👇 add subscription server
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect() {
        // returned object is passed as the `context` argument to the subscription resolvers
        return { 
          db, 
          pubsub 
        };
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  httpServer.listen(4000, () => console.log(`🚀 Server is running on http://localhost:4000`));
};

start();