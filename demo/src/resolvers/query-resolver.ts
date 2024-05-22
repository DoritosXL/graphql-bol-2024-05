import { ShowContext } from '../typings/show-context';

export const Query = {
	bestShow(parent, args, ctx: ShowContext) {
		return ctx.showRepository.getBestShow();
	},
	shows(parent, args, ctx: ShowContext) {
		console.log('show repo:', ctx.showRepository);
		return ctx.showRepository.getAll();
	},
	showById(parent, args, ctx: ShowContext) {
		return ctx.showRepository.getShow(args.id);
	},
	filterShowsByTitleAndReleaseYear(parent, args, ctx: ShowContext) {
		return ctx.showRepository.filterShowsByTitleAndReleaseYear(args.input.title, args.input.releaseYear);
	},
};
