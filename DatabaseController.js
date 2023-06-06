
export default class DatabaseController {
    constructor() {
        this.setupDatabase();
        this.pastGameList = document.querySelector('.past-games');
    }

    setupDatabase() {
        let request = indexedDB.open('db', 1);

        request.onupgradeneeded = (event) => {
            let db = event.target.result;

            if (!db.objectStoreNames.contains('games')) {
                db.createObjectStore('games', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            console.log('Database setup complete');
            this.db = event.target.result;
            this.loadPastGames();
        };

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
        };
    }

    saveGameData(moves, winner) {
        const gameData = {
            moves: moves,
            winner: winner
        };

        const transaction = this.db.transaction('games', 'readwrite');
        const games = transaction.objectStore('games');

        const request = games.add(gameData);

        request.onsuccess = (event) => {
            const gameId = event.target.result;
            console.log('Game saved with ID:', gameId);
            this.loadPastGames();
        };

        transaction.onerror = (event) => {
            console.error('Transaction error:', event.target.error);
        };
    }

    loadPastGames() {
        const transaction = this.db.transaction('games', 'readonly');
        const games = transaction.objectStore('games');
        this.pastGameList.innerHTML = '';

        const request = games.getAll();

        request.onsuccess = (event) => {
            const gameData = event.target.result;
            for(let game of gameData){
                let record = document.createElement('div');
                record.textContent = game.id;
                let winner = document.createElement('label');
                winner.textContent = game.winner;
                let moves = document.createElement('label');
                moves.classList.add('move');
                moves.textContent = game.moves;
                record.append(winner, moves);
                this.pastGameList.appendChild(record);
            }
        };

        transaction.oncomplete = () => {
            console.log('Transaction complete');
        };

        transaction.onerror = (event) => {
            console.error('Transaction error:', event.target.error);
        };
    }
}