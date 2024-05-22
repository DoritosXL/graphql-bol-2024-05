const Query = {
  users: (_parent, _arg, { db }) => {
    return db.users;
  },
  blogs: (_parent, _args, { db }) => {
    return db.blogs;
  },
};

export default Query;
