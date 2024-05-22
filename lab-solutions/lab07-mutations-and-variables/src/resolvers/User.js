const User = {
  blogs: (parent, _args, { db }) => {
    return db.blogs.filter((blog) => blog.userid === parent.id);
  },
  comments: (parent, _args, { db }) => {
    return db.comments.filter((comment) => comment.userid === parent.id);
  },
};

export default User;
