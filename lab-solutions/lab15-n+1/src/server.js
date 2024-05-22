import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import getCreatorLoader from './dataloaders/creatorLoader.js';  // 👈

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import typeDefs from './typeDefs.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js';
import Blog from './resolvers/Blog.js';
import Comment from './resolvers/Comment.js';
import UserStatus from './resolvers/enums/UserStatus.js';
import Publishable from './abstracts/Publishable.js';
import BlogResult from './abstracts/BlogResult.js';
import EmailAddress from './scalars/EmailAddress.js';
import Date from './scalars/Date.js';

import upperDirectiveTransformer from './directives/upperDirectiveTransformer.js';
import btwDirectiveTransformer from './directives/btwDirectiveTransformer.js';

let schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Blog,
    Comment,
    UserStatus,
    Publishable,
    BlogResult,
    EmailAddress,
    Date,
  },
});

// Transform the schema by applying directive logic
schema = upperDirectiveTransformer(schema, 'upper');
schema = btwDirectiveTransformer(schema, 'btw');

const server = new ApolloServer({
  schema,
  context: {
    prisma,
    creatorLoader: getCreatorLoader(prisma),
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(() => console.log('🚀 Server running at port 4000'));
