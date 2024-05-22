import { authenticated } from './authenticatedGuard.js';

const resolvers = {
  Query: {
    users: authenticated((_parent, _args, { db }) => db.users),
    serverTime: () => new Date().toISOString(),
  },
};

export default resolvers;
