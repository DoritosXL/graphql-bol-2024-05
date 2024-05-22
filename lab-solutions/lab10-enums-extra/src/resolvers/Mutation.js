const Mutation = {
  createUser: async (_parent, { input }, { prisma, pubsub }) => {
    const user = await prisma.users.create({
      data: {
        ...input,
        status: 'r',
      },
    });

    pubsub.publish('USER_MODIFIED', {
      userModified: {
        user,
        modification: 'CREATED',
      },
    });

    return user;
  },
  updateUser: async (_parent, { input }, { prisma, pubsub }) => {
    const { id } = input;
    const data = { ...input };
    delete data.id;

    try {
      const user = await prisma.users.update({
        data,
        where: {
          id: +id,
        },
      });

      pubsub.publish('USER_MODIFIED', {
        userModified: {
          user,
          modification: 'UPDATED',
        },
      });

      return user;
    } catch (err) {
      throw new Error(err.toString());
    }
  },
  changeUserStatus: async (_parent, { input }, { prisma, pubsub }) => {
    const { id, status } = input;

    try {
      const user = await prisma.users.update({
        data: {
          status,
        },
        where: {
          id: +id,
        },
      });

      pubsub.publish('USER_MODIFIED', {
        userModified: {
          user,
          modification: 'STATUSCHANGED',
        },
      });

      return user;
    } catch (err) {
      throw new Error(err.toString());
    }
  },
  deleteUser: async (_parent, { input }, { prisma, pubsub }) => {
    const { id } = input;
    try {
      const user = await prisma.users.delete({
        where: {
          id: +id,
        },
      });

      pubsub.publish('USER_MODIFIED', {
        userModified: {
          user,
          modification: 'DELETED',
        },
      });

      return user;
    } catch (err) {
      throw new Error(err.toString());
    }
  },
};

export default Mutation;
