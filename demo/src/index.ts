import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typedefs.js';
import { resolvers } from './resolvers/query.js';
import { ShowRepository } from './repositories/show-repository.js';
import { EpisodeRepository } from './repositories/episode-repository.js';

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4500 },
	context: async ({ req }) => {
		return {
			showRepository: new ShowRepository(),
			episodeRepository: new EpisodeRepository(),
		};
	},
});

console.log(`🚀  Server ready at: ${url}`);
