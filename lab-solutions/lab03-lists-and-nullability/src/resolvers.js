import db from "./db.js";

const resolvers = {
  Query: {
    firstUser: () => {
      return db.users[0];
    },
    users: () => {
      return db.users;
    }
  },
};

export default resolvers;