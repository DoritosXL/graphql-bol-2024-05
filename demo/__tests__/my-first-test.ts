import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../dist/typedefs.js';
import { resolvers } from '../dist/resolvers/query.js';
import assert from 'assert';
import { Show } from '../src/entities/show.js';
import { ShowRepository } from '../dist/repositories/show-repository.js';
import { title } from 'process';
import { ShowContext } from '../src/typings/show-context.js';
import { EpisodeRepository } from '../src/repositories/episode-repository.js';


beforeEach(() => {

});

test('works', async () => {
	expect(1).toBe(1);

	let repo = new ShowRepository();
	repo.getBestShow = jest.fn(() => ({ title: 'The best test show' }));

	const testServer = new ApolloServer<ShowContext>({
		typeDefs,
		resolvers,
	});
	let result = await testServer.executeOperation<{ bestShow: Show }>(
		{
			query: '{ bestShow { title } }',
		},
		{
			contextValue: {
				showRepository: repo,
				episodeRepository: new EpisodeRepository(),
			},
		}
	);
	assert(result.body.kind === 'single');

	console.log('what do i have here:', result.body.singleResult);
	expect(result.body.singleResult.data.bestShow.title).toBe(
		'The best test show'
	);
});
