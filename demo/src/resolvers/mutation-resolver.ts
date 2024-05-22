import { ShowContext } from '../typings/show-context';

export const Mutation = {
	addShow(parent, args, ctx: ShowContext) {
		return ctx.showRepository.add(args.input);
	},
};
