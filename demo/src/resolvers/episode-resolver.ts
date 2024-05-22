import { ShowContext } from '../typings/show-context';

export const Episode = {
	show(parent, args, ctx: ShowContext) {
		return ctx.showRepository.getShow(parent.showId);
	},
};
