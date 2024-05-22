let sequence = 1;

const resolvers = {
  Query: {
    users: (_parent, _args, { db }) => db.users,
    serverTime: () => new Date().toISOString(),
  },
  Mutation: {
    createNote: (_parent, { content }, { db }) => {
      const note = { id: sequence++, content };
      db.notes.push(note);
      return note;
    },
  },
};

export default resolvers;
