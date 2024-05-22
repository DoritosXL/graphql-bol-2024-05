import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typedefs.js';
import { resolvers } from './resolvers/resolvers.js';
import { ShowRepository } from './repositories/show-repository.js';
import { EpisodeRepository } from './repositories/episode-repository.js';
import { ShowContext } from './typings/show-context.js';
import { ShowDataLoader } from './data-loaders/show-data-loader.js';

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer<ShowContext>(server, {
	listen: { port: 4500 },
	context: async ({ req }) => {
		let showRepo = new ShowRepository()
		return {
			showRepository: showRepo,
			episodeRepository: new EpisodeRepository(),
			showDataLoader: new ShowDataLoader(showRepo),
		};
	},
});

console.log(`🚀  Server ready at: ${url}`);
