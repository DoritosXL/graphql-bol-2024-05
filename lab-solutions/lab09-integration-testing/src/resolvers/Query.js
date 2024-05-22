const Query = {
  firstUser: async (_parent, _args, { prisma }) => {
    return await prisma.users.findFirst();
  },
  users: async (_parent, _arg, { prisma }) => {
    return await prisma.users.findMany();
  },
  usersLimited: async (_parent, { first, last }, { prisma }) => {
    if ((!first && !last) || (first && last)) {
      throw new Error('Provide either a first or last argument!');
    }

    if (first < 1 || first > 10 || last < 1 || last > 10) {
      throw new Error('Provided value should be between 1 and 10!');
    }

    return await prisma.users.findMany({ 
      take: first ? first : -last
    });
  },
  usersByFirstName: async (_parent, { namePart }, { prisma }) => {
    return await prisma.users.findMany({
      where: {
        firstname: {
          contains: namePart
        }
      }
    });
  },
  blogs: async (_parent, _args, { prisma }) => {
    return await prisma.blogs.findMany();
  },
  blogById: async (_parent, { id }, { prisma }) => {
    return await prisma.blogs.findUnique({
      where: {
        id: +id
      }
    });
  },
  blogsByFilter: async (_parent, args, { prisma }) => {
    const where = {};

    let { title, content, published } = args.input || {};

    if (title) {
      where.title = { contains: title };
    }

    if (content) {
      where.content = { contains: content };
    }

    if (typeof published === 'boolean') {
      where.published = published ? 1 : 0;
    }

    return await prisma.blogs.findMany({ where });
  },
  comments: async (_parent, _args, { prisma }) => {
    return await prisma.comments.findMany();
  },
};

export default Query;
