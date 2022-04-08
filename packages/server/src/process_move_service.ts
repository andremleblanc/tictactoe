import { Board } from "@mapistry/take-home-challenge-shared";
import { WinningLines } from "./constants";

export class ProcessMoveService {
    board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    checkForWinner() {
        const { board } = this
        let winner = null;

        let winningLine = WinningLines.find(combination => combination.every(square => board[square] === 'X'));
        if (winningLine === undefined) winningLine = WinningLines.find(e => e.every(square => board[square] === 'O'));
        if (winningLine !== undefined) winner = board[winningLine[0]]

        return winner
    }

    call() {
        const winner = this.checkForWinner()
        return { board: this.board, winner }
    }
}