import { Episode } from '../entities/episode';

export class EpisodeRepository {
	static episodes: Episode[] = [
		{ id: 16, title: 'Episode 1', length: 42, showId: 4 },
		{ id: 23, title: 'All Eventualities', length: 60, showId: 15 },
		{ id: 42, title: 'Episode 2', length: 45, showId: 4 },
	];

	getAll() {
		return EpisodeRepository.episodes;
	}

	getEpisodesForShow(showId: number) {
		return EpisodeRepository.episodes.filter(x => x.showId === showId);
	}

	add() {}
}
