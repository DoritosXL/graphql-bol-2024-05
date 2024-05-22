import { ApolloServer } from 'apollo-server';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

import typeDefs from '../src/typeDefs.js';
import Query from '../src/resolvers/Query.js';
import Mutation from '../src/resolvers/Mutation.js';
import User from '../src/resolvers/User.js';
import Blog from '../src/resolvers/Blog.js';
import Comment from '../src/resolvers/Comment.js';

export default new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Blog,
    Comment,
  },
  context: {
    prisma,
  },
});
