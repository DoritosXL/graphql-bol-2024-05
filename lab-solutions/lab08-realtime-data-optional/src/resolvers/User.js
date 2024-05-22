const User = {
  blogs: (parent, _args, { db }) => {
    return db.blogs.filter((blog) => blog.userid === parent.id);
  },
};

export default User;
