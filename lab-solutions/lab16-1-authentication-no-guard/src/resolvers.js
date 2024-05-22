const resolvers = {
  Query: {
    users: (_parent, _args, { db, currentUser }) => {
      if (currentUser) {
        return db.users;
      }
      return [];
      // throw new Error('Unauthenticated!');
    },
    serverTime: () => new Date().toISOString(),
  }
}

export default resolvers;
