const Query = {
  users: async (_parent, _arg, { prisma }) => {
    return await prisma.users.findMany();
  },
};

export default Query;
