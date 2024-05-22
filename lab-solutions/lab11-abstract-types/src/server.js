import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
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

const server = new ApolloServer({ 
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
  },
  context: {
    prisma,
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
});

server.listen().then(() => console.log("🚀 Server running at port 4000"));