import db from "./db.js";

const resolvers = {
  Query: {
    firstUser: () => {
      return db.users[0];
    },
  },
};

export default resolvers;