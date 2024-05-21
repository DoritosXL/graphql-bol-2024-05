import { shows } from '../data/shows';

export class ShowRepository {
	static shows = [
		{ id: 4, title: 'Baby Reindeer', releaseYear: 2024 },
		{ id: 8, title: 'The Witcher', releaseYear: 2019 },
		{ id: 15, title: 'The Gentlemen', releaseYear: 2023 },
	];

	getAll() {
		return ShowRepository.shows;
	}

	getShow(showId: number) {
		return ShowRepository.shows.find(x => x.id === showId);
	}

	getBestShow() {
		return ShowRepository.shows.find(x => x.title === 'The Gentleman');
	}

	filterShowsByTitleAndReleaseYear(title: string, releaseYear: number) {
        console.log('title/release:', title, releaseYear);
		return ShowRepository.shows.filter(
			x =>
				(title ? x.title.includes(title) : true) &&
				(releaseYear ? x.releaseYear === releaseYear : true)
		);
	}

	add() {}
}
