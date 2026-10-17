export type Role = 'player' | 'cpu';
export type Roles = [Role, Role];

export type Move = 'rock' | 'paper' | 'scissors';
export type Moves = [Move, Move];

export type Score = number;
export type Scores = [Score, Score];

export type Round = { index: number; roles: Roles; moves: Moves; scores: Scores; };

export const isRole = (x: unknown): x is Role => typeof x === 'string' && (x === 'player' || x === 'cpu');

export const isMove = (x: unknown): x is Move => typeof x === 'string' && (x === 'rock' || x === 'paper' || x === 'scissors');

export const ROLES: Role[] = ['player', 'cpu'];

export const MOVES: Move[] = ['rock', 'paper', 'scissors'];
