const Comment = {
  blog: async (parent, _args, { prisma }) => {
    return await prisma.blogs.findUnique({
      where: {
        id: parent.blogid
      }
    });
  },
  commentator: async (parent, _args, { prisma }) => {
    return await prisma.users.findUnique({
      where: {
        id: parent.userid
      }
    });
  }
};

export default Comment;
