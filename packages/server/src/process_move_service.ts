import { Board } from "@mapistry/take-home-challenge-shared";

export class ProcessMoveService {
    board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    call() {
        return { board: this.board, winner: null }
    }
}