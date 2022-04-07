import {
  Board,
  GameStatus,
  _,
} from '@mapistry/take-home-challenge-shared';
import { Router } from 'express';
import { ProcessMoveService } from './process_move_service';

export const router = Router();

interface MoveBody {
  board: Board;
}

router.post<'/begin', never, GameStatus>('/begin', (req, res) => {
  // TODO: Consider removing, not currently using difficulty or first player settings
  const gameStatus = {
    board: [_, _, _, _, _, _, _, _, _],
    winner: null,
  };
  res.json(gameStatus);
});

router.post<'/move', never, GameStatus, MoveBody>('/move', (req, res) => {
  const { board } = req.body;
  res.json(new ProcessMoveService(board).call());
});
