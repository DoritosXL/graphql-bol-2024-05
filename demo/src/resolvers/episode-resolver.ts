import { ShowContext } from '../typings/show-context';

// data loader

export const Episode = {
	show(parent, args, ctx: ShowContext) {
		console.log('resolving show', parent.showId);
		return ctx.showDataLoader.getShowById(parent.showId);
	},
};
