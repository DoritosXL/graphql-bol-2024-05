import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typedefs.js';
import { resolvers } from './resolvers/resolvers.js';
import { ShowRepository } from './repositories/show-repository.js';
import { EpisodeRepository } from './repositories/episode-repository.js';
import { ShowContext } from './typings/show-context.js';
import { ShowDataLoader } from './data-loaders/show-data-loader.js';
import { GraphQLError } from 'graphql';

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

let showRepo = new ShowRepository();

const { url } = await startStandaloneServer<ShowContext>(server, {
	listen: { port: 4500 },
	context: async ({ req }) => {
		// auth logic: BASIC JWT Cookie

		let user: string | null = null;
		if (!req.headers.authorization) {
			throw new GraphQLError('You need to be logged in mate', {
				extensions: {
					code: 'UNAUTHORIZED',
				},
			});
		}

		user = req.headers.authorization.split(' ')[1];

		return {
			user,
			showRepository: showRepo,
			episodeRepository: new EpisodeRepository(),
			showDataLoader: new ShowDataLoader(showRepo),
		};
	},
});

console.log(`🚀  Server ready at: ${url}`);
