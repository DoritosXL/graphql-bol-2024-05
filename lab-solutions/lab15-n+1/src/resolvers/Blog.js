const Blog = {
  creator: (parent, _args, { creatorLoader }) => {
    console.log(parent.id);
    return creatorLoader.load(parent.id);
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
