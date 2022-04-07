import '../styles/reset.css';
import React from 'react';
import { Difficulty, GameStatus, Player } from '@mapistry/take-home-challenge-shared';

import { begin } from '../api'

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

  render() {
    const { board, winner } = this.state;

    return(
      <div>
        <span>The winner is {winner}</span>
        <div className='board'>
          <div className='board-row'>
            {board[0]}
            {board[1]}
            {board[2]}
          </div>
          <div className='board-row'>
            {board[3]}
            {board[4]}
            {board[5]}
          </div>
          <div className='board-row'>
            {board[6]}
            {board[7]}
            {board[8]}
          </div>
        </div>
      </div>
    )
  }
}