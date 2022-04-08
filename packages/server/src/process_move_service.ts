import { Board, Marker } from "@mapistry/take-home-challenge-shared";
import { WinningLines } from "./constants";

export class ProcessMoveService {
    board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    static calculateMinimaxScore(board: Board, depth: number, aiTurn: boolean) {
        const scoreMap = {
            O: 10,
            X: -10,
            tie: 0
        }

        let finalScore!: number;

        const winner = this.checkForWinner(board)
        if (winner !== null) return scoreMap[winner]

        const isDraw = board.every(square => square !== null);
        if (isDraw) return scoreMap.tie

        for (let move = 0; move < board.length; move += 1) {
            if (board[move] === null) {
                const simulatedBoardState = board.slice()
                let simulatedMoveScore: number
                if (aiTurn) {
                    simulatedBoardState[move] = Marker.o
                    simulatedMoveScore = ProcessMoveService.calculateMinimaxScore(simulatedBoardState, depth + 1, false) - depth
                    if (finalScore === undefined || simulatedMoveScore > finalScore) finalScore = simulatedMoveScore
                } else {
                    simulatedBoardState[move] = Marker.x
                    simulatedMoveScore = ProcessMoveService.calculateMinimaxScore(simulatedBoardState, depth + 1, true) + depth
                    if (finalScore === undefined || simulatedMoveScore < finalScore) finalScore = simulatedMoveScore
                }
            }
        }

        return finalScore
    }

    static calculateScoreForMove(board: Board, move: number) {
        const simulatedBoardState = board.slice();
        simulatedBoardState[move] = Marker.o
        return ProcessMoveService.calculateMinimaxScore(simulatedBoardState, 0, false)
    }

    static checkForWinner(board: Board) {
        let winner = null;

        let winningLine = WinningLines.find(combination => combination.every(square => board[square] === 'X'));
        if (winningLine === undefined) winningLine = WinningLines.find(combination => combination.every(square => board[square] === 'O'));
        if (winningLine !== undefined) winner = board[winningLine[0]]

        return winner
    }

    determineBestMove() {
        const { board } = this
        let bestScore;
        let bestMove;
        let score;

        for (let move = 0; move < board.length; move += 1) {
            if (board[move] === null) {
                score = ProcessMoveService.calculateScoreForMove(board, move)

                if (bestScore === undefined || score > bestScore) {
                    bestScore = score
                    bestMove = move
                }
            }
        }

        return bestMove
    }

    call() {
        const { board } = this
        let winner = ProcessMoveService.checkForWinner(board)

        if (winner) return { board, winner }

        const move = this.determineBestMove()
        if (move !== undefined) { board[move] = Marker.o }

        winner = ProcessMoveService.checkForWinner(board)
        return { board, winner }
    }
}