const Mutation = {
  createUser: async (_parent, { input }, { prisma }) => {
    const user = await prisma.users.create({
      data: {
        ...input,
        status: 'r',
      }
    });
    return user;
  },
  updateUser: async (_parent, { input }, { prisma }) => {
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

      return user;
    } catch (err) {
      throw new Error(err.toString());
    }
  },
  changeUserStatus: async(_parent, { input }, { prisma }) => {
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

      return user;
    } catch (err) {
      throw new Error(err.toString());
    }
  },
  deleteUser: async (_parent, { input }, { prisma }) => {
    const { id } = input;
    try {
      const user = await prisma.users.delete({
        where: {
          id: +id,
        }
      });

      return user;
    } catch(err) {
      throw new Error(err.toString());
    }
  },
  createBlog: async (_parent, { input }, { prisma }) => {
    const data = { ...input };
    data.published = 0;             // SQLite has no false
    data.userid = +data.creatorID;
    delete data.creatorID;

    const blog = await prisma.blogs.create({
      data,
    });

    return blog;                  // return the created blog(!)
  },
  publishBlog: async (_parent, { input }, { prisma }) => {
    const published = input.published ? 1 : 0;
    const id = +input.id;

    try {
      const blog = await prisma.blogs.update({
        data: {
          published,
        },
        where: {
          id,
        },
      });

      return blog;
    } catch (err) {
      throw new Error(err.toString());
    }
  },
  deleteBlog: async (_parent, { input }, { prisma }) => {
    const id = +input.id;

    try {
      const deleteBlogsOnCountries = prisma.blogsOnCountries.deleteMany({
        where: {
          blogid: id,
        }
      });

      const deleteBlog = prisma.blogs.delete({
        where: {
          id,
        },
      });

      const transaction = await prisma.$transaction([deleteBlogsOnCountries, deleteBlog]);

      return {
        blog: transaction[1],
        errorMessage: null,
      };
    } catch (err) {
      if (err.code === 'P2025') {
        return {
          blog: null,
          errorMessage: 'Blog not found!',
        };
      }

      if (err.code === 'P2003') {
        return {
          blog: null,
          errorMessage: 'Blog contains comments!',
        };
      }

      return {
        blog: null,
        errorMessage: err.message,
      };
    }
  },
};

export default Mutation;