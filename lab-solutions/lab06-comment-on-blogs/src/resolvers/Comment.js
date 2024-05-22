const Comment = {
  blog: (parent, _args, { db }) => {
    return db.blogs.find((blog) => blog.id === parent.blogid);
  },
  commentator: (parent, _args, { db }) => {
    return db.users.find((user) => user.id === parent.userid);
  }
};

export default Comment;
