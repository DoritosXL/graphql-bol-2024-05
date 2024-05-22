import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../dist/typedefs.js';
import { resolvers } from '../dist/resolvers/query.js';
import assert from 'assert';
import { Show } from '../src/entities/show.js';
import { ShowContext } from '../src/typings/show-context.js';

import { ShowRepository } from '../dist/repositories/show-repository.js';
import { EpisodeRepository } from '../dist/repositories/episode-repository.js';

let mockShowRepository: ShowRepository;
let testServer: ApolloServer<ShowContext>;

beforeEach(() => {
	mockShowRepository = new ShowRepository();
	mockShowRepository.getBestShow = jest.fn(() => ({
		title: 'The best test show',
	}));

	testServer = new ApolloServer<ShowContext>({
		typeDefs,
		resolvers,
	});
});

test('works', async () => {
	let result = await testServer.executeOperation<{ bestShow: Show }>(
		{
			query: '{ bestShow { title } }',
		},
		{
			contextValue: {
				showRepository: mockShowRepository,
				episodeRepository: new EpisodeRepository(),
			},
		}
	);
	assert(result.body.kind === 'single');
	expect(result.body.singleResult.data.bestShow.title).toBe('The best test show');
});
