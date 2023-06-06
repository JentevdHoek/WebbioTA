import DatabaseController from "./DatabaseController.js";

export default class MainController {
    constructor() {
        this.databaseController = new DatabaseController();
        this.board = document.querySelector('.board');
        this.cells = [];
        this.createBoard();
        this.turn = true;
        this.moves = [];
        this.winner = false;
    }

    createBoard(){
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () =>  {
                this.handleCellClick(i);
            });
            this.board.appendChild(cell);
            this.cells.push(cell);
        }
    }
    handleCellClick(cellIndex) {
        if(this.winner) return;
        if(this.cells[cellIndex].textContent !== '') return;
        if(this.turn){
            this.cells[cellIndex].textContent = 'X';
            this.turn = false;
        }
        else {
            this.cells[cellIndex].textContent = 'O';
            this.turn = true;
        }
        this.moves.push([cellIndex, this.cells[cellIndex].textContent]);
        if(this.checkForWinner(this.cells[cellIndex].textContent))
            this.handleWinner(this.cells[cellIndex].textContent);
    }

    checkForWinner(player) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                this.cells[a].textContent === player &&
                this.cells[b].textContent === player &&
                this.cells[c].textContent === player
            ) {
                return true;
            }
        }
        if(this.cells.every(cell => cell.textContent !== '') && !this.winner){
            this.handleTie();
            return false;
        }
        return false;
    }

    handleWinner(winner) {
        this.databaseController.saveGameData(this.moves, winner);
        this.winner = true;
        alert(`${winner} has won!`)
    }

    handleTie(){
        this.databaseController.saveGameData(this.moves, 'TIE');
        this.winner = true;
        alert(`It's a tie!`)
    }
}