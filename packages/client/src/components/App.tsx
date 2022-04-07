import '../styles/reset.css';
import '../styles/tictactoe.css'
import React from 'react';
import { Difficulty, GameStatus, Marker, Player } from '@mapistry/take-home-challenge-shared';

import { begin, move } from '../api'
import { Square } from './Square'

export class App extends React.Component<unknown, GameStatus> {
  constructor(props: unknown) {
    super(props)
    this.state = {
      board: [],
      winner: null
    };
  }

  componentDidMount() {
    begin(Difficulty.hard, Player.human).then(res => this.setState(res))
  }

  handleClickOnSquare(index: number) {
    const { board } = this.state
    const updatedBoard = board.slice()
    updatedBoard[index] = Marker.x

    move(updatedBoard, Difficulty.hard).then(res => this.setState(res))
  }

  render() {
    const { board, winner } = this.state;
    const message = winner ? `The winner is ${winner}` : "Silly human, you don't stand a chance!"

    return(
      <div className='app'>
        <h1>Unbeatable Tic Tac Toe</h1>
        <h2>{message}</h2>

        <table className='board'>
          <tbody>
            <tr className='board-row'>
              <Square handleClick={() => this.handleClickOnSquare(0)} value={board[0]} />
              <Square handleClick={() => this.handleClickOnSquare(1)} value={board[1]} />
              <Square handleClick={() => this.handleClickOnSquare(2)} value={board[2]} />
            </tr>
            <tr className='board-row'>
              <Square handleClick={() => this.handleClickOnSquare(3)} value={board[3]} />
              <Square handleClick={() => this.handleClickOnSquare(4)} value={board[4]} />
              <Square handleClick={() => this.handleClickOnSquare(5)} value={board[5]} />
            </tr>
            <tr className='board-row'>
              <Square handleClick={() => this.handleClickOnSquare(6)} value={board[6]} />
              <Square handleClick={() => this.handleClickOnSquare(7)} value={board[7]} />
              <Square handleClick={() => this.handleClickOnSquare(8)} value={board[8]} />
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}