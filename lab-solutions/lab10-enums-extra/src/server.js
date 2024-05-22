import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { ApolloServerPluginLandingPageGraphQLPlayground }  from 'apollo-server-core';
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';

import pkg from '@prisma/client';   // 👈 import PrismaClient
const { PrismaClient } = pkg;
const prisma = new PrismaClient();  // 👈 make prisma instance

async function start() {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const pubsub = new PubSub();
  const server = new ApolloServer({
    schema,
    context: { 
      prisma,
      pubsub,
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
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

  // 👇 subscription server
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect() {
        return { 
          prisma, 
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