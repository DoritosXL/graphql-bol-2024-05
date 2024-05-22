import { GeneralShow } from '../entities/general-show.js';
import { Show } from '../entities/show.js';
import { StreamingShow } from '../entities/streaming-show.js';

export class ShowRepository {
	static shows: GeneralShow[] = [
		{ id: 4, title: 'Baby Reindeer', releaseYear: 2024, genre: 's', isInteractive: false } as StreamingShow,
		{ id: 8, title: 'The Witcher', releaseYear: 2019, genre: 't', isInteractive: false } as StreamingShow,
		{ id: 15, title: 'The Gentlemen', releaseYear: 2023, genre: 'h', isInteractive: false } as StreamingShow,
		{ id: 67, title: 'Domino D-Day', releaseYear: 2004, genre: 'h', isLive: true } as Show,
	];

	getAll() {
		return ShowRepository.shows;
	}

	getShowsByIds(ids: readonly number[]) {
		console.log('[repo] getShowsByIds');
		return ShowRepository.shows.filter((x) => ids.includes(x.id));
	}

	getShow(showId: number) {
		return ShowRepository.shows.find((x) => x.id === showId);
	}

	getBestShow() {
		return ShowRepository.shows.find((x) => x.title === 'The Gentlemen');
	}

	filterShowsByTitleAndReleaseYear(title: string, releaseYear: number) {
		return ShowRepository.shows.filter(
			(x) => (title ? x.title.includes(title) : true) && (releaseYear ? x.releaseYear === releaseYear : true)
		);
	}

	add(show: Omit<Show, 'id'>) {
		let nextId = Math.max(...ShowRepository.shows.map((x) => x.id), 0) + 1;
		let fullShow = { ...show, id: nextId };
		ShowRepository.shows.push(fullShow);
		return fullShow;
	}
}
