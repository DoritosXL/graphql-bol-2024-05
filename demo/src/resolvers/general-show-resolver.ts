import { GraphQLError } from 'graphql';

export const GeneralShowResolver = {
	__resolveType(obj, context, info) {
		if (obj.isLive !== null && obj.isLive !== undefined) {
			return 'Show';
		} else if (obj.isInteractive !== null && obj.isInteractive !== undefined) {
			return 'StreamingShow';
		}
		throw new GraphQLError('Could not resolve type for GeneralShow');
	},
};
