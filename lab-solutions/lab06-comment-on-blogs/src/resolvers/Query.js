const Query = {
  firstUser: (_parent, _arg, { db }) => {
    return db.users[0];
  },
  users: (_parent, _arg, { db }) => {
    return db.users;
  },
  usersLimited: (_parent, { first, last }) => {
    if ((!first && !last) || (first && last)) {
      throw new Error("Provide either a first or last argument!");
    }

    if (first < 1 || first > 10 || last < 1 || last > 10) {
      throw new Error("Provided value should be between 1 and 10!");
    }

    return first ? db.users.slice(0, first) : db.users.slice(-last);
  },
  usersByFirstName: (_parent, args, { db }) => {
    return db.users.filter((user) => user.firstname.includes(args.namePart));
  },
  blogs: (_parent, _args, { db }) => {
    return db.blogs;
  },
  blogById: (_parent, args, { db }) => {
    return db.blogs.find((blog) => blog.id === args.id);
  },
  blogsByFilter: (_parent, { input }, { db }) => {
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
  comments: (_parent, _args, { db }) => {
    return db.comments;
  },
};

export default Query;
