const Blog = {
  creator: async (parent, _args, { prisma }) => {
    return await prisma.users.findUnique({
      where: {
        id: parent.userid
      }
    });
  },
  comments: async (parent, _args, { prisma }) => {
    return await prisma.comments.findMany({ 
      where: {
        blogid: parent.id
      }
    });
  },
};

export default Blog;
