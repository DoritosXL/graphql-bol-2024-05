import db from "./db.js";

const resolvers = {
  Query: {
    firstUser: () => {
      return db.users[0];
    },
    users: () => {
      return db.users;
    },
    blogs: () => {
      return db.blogs;
    },
  },
  Blog: {
    creator: (parent) => {
      return db.users.find((user) => user.id === parent.userid);
    },
  },
  User: {
    blogs: (parent) => {
      return db.blogs.filter((blog) => blog.userid === parent.id);
    },
  },
};

export default resolvers;
