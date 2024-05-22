const User = {
  emailAddress: (parent) => parent.email,
  blogs: async (parent, _args, { prisma }) => {
    return await prisma.blogs.findMany({
      where: {
        userid:parent.id
      }
    });
  },
  comments: async (parent, _args, { prisma }) => {
    return await prisma.comments.findMany({
      where: {
        userid: parent.id
      }
    });
  },
};

export default User;
