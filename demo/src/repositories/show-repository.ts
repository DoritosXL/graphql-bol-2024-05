export class ShowRepository {
    static shows = [
        { title: 'The Mandalorian', releaseYear: 2019 },
        { title: 'The Witcher', releaseYear: 2019 },
    ];

    getAll() {
        console.log('getting shows from repo');
        return ShowRepository.shows;
    }

    add() {

    }
}