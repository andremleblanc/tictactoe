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

  renderSquare(index: number) {
    const { board } = this.state
    return (<Square handleClick={() => this.handleClickOnSquare(index)} value={board[index]} />)
  }

  render() {
    const { winner } = this.state;
    const messageMap = {
      O: "Muhaha! The singularity is nigh.",
      X: "You've resorted to cheating I see.",
      tie: "Ha! It's like I said, unbeatable."
    }

    const message = winner ? messageMap[winner] : "Silly human, you don't stand a chance!"

    return(
      <div className='app'>
        <h1>Unbeatable Tic Tac Toe</h1>
        <h2>{message}</h2>

        <table className='board'>
          <tbody>
            <tr className='board-row'>
              { this.renderSquare(0) }
              { this.renderSquare(1) }
              { this.renderSquare(2) }
            </tr>
            <tr className='board-row'>
              { this.renderSquare(3) }
              { this.renderSquare(4) }
              { this.renderSquare(5) }
            </tr>
            <tr className='board-row'>
              { this.renderSquare(6) }
              { this.renderSquare(7) }
              { this.renderSquare(8) }
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}