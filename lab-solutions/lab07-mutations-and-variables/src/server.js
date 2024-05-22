import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import db from './db.js';

import typeDefs from './typeDefs.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js';
import Blog from './resolvers/Blog.js';
import Comment from './resolvers/Comment.js';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: {
    Query,
    Mutation,
    User,
    Blog,
    Comment,
  },
  context: {
    db,
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
});

server.listen().then(() => console.log("🚀 Server running at port 4000"));