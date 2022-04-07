export const _ = null;

export enum Difficulty {
  easy = 'easy',
  hard = 'hard',
}

export enum Marker {
  o = 'O',
  x = 'X',
}

export enum Player {
  computer = 'computer',
  human = 'human',
}

export const Winner = { ...Marker, tie: 'tie' } as const;
