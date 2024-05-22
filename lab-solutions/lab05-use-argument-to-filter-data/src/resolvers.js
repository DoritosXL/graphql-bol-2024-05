import db from './db.js';

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
    usersByFirstName: (_parent, args) => {
      return db.users.filter((user) => user.firstname.includes(args.namePart));
    },
    usersLimited: (parent, { first, last }) => {
      if ((!first && !last) || (first && last)) {
        throw new Error('Provide either a first or last argument!');
      }

      if (first < 1 || first > 10 || last < 1 || last > 10) {
        throw new Error('Provided value should be between 1 and 10!');
      }

      return first ? db.users.slice(0, first) : db.users.slice(-last);
    },
    blogById: (_parent, args) => {
      return db.blogs.find((blog) => blog.id === args.id);
    },
    blogsByFilter: (_parent, { input }) => {
      let result = db.blogs;

      if (!input) {
        return result;
      }

      const { title, content, published } = input;

      if (title) {
        result = result.filter((blog) => blog.title.includes(title));
      }

      if (content) {
        result = result.filter((blog) => blog.content.includes(content));
      }

      if (published !== undefined) {
        result = result.filter((blog) => blog.published === published);
      }

      return result;
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
