export const resolvers = {
  Query: {
    bestShow: (parent, args, context) => context.showRepository.getAll()[0],
    shows: (parent, args, context) => context.showRepository.getAll(),
  },
};
