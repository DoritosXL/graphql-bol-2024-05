import { ShowContext } from '../typings/show-context';

export const Show = {
	episodes(parent, args, ctx: ShowContext) {
		return ctx.episodeRepository.getEpisodesForShow(parent.id);
	},
};
