export const resolvers = {
	Query: {
		bestShow: (parent, args, context) => context.showRepository.getBestShow(),
		shows: (parent, args, context) => context.showRepository.getAll(),
	},
  Show: {
    episodes: (parent, args, context) => {
      return context.episodeRepository.getEpisodesForShow(parent.id);
    },
  },
  Episode: {
    show(parent, args, context) {
      return context.showRepository.getShow(parent.showId);
    }
  }
};
