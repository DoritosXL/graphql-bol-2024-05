import { ShowContext } from '../typings/show-context';

export const resolvers = {
	Query: {
		bestShow(parent, args, ctx: ShowContext) {
			return ctx.showRepository.getBestShow();
		},
		shows(parent, args, ctx: ShowContext) {
			ctx.showRepository.getAll();
		},
		showById(parent, args, ctx: ShowContext) {
			return ctx.showRepository.getShow(args.id);
		},
		filterShowsByTitleAndReleaseYear(parent, args, ctx: ShowContext) {
			return ctx.showRepository.filterShowsByTitleAndReleaseYear(
				args.input.title,
				args.input.releaseYear
			);
		},
	},
	Mutation: {
		addShow(parent, args, ctx: ShowContext) {
			return ctx.showRepository.add(args.input);
		},
	},
	Show: {
		episodes(parent, args, ctx: ShowContext) {
			return ctx.episodeRepository.getEpisodesForShow(parent.id);
		},
	},
	Episode: {
		show(parent, args, ctx: ShowContext) {
			return ctx.showRepository.getShow(parent.showId);
		},
	},
};
