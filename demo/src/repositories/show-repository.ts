export class ShowRepository {
	static shows = [
		{ id: 4, title: 'Baby Reindeer', releaseYear: 2024 },
		{ id: 8, title: 'The Witcher', releaseYear: 2019 },
		{ id: 15, title: 'The Gentlemen', releaseYear: 2023 },
	];

	getAll() {
		return ShowRepository.shows;
	}

	add() {}
}
