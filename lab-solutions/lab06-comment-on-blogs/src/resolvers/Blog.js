const Blog = {
  creator: (parent, _args, { db }) => {
    return db.users.find((user) => user.id === parent.userid);
  },
  comments: (parent, _args, { db }) => {
    return db.comments.filter((comment) => comment.blogid === parent.id);
  },
};

export default Blog;
