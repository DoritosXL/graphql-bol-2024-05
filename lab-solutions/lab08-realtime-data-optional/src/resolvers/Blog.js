const Blog = {
  creator: (parent, _args, { db }) => {
    return db.users.find((user) => user.id === parent.userid);
  },
};

export default Blog;
