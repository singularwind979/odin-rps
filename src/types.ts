export type Role = 'human' | 'computer';
export type Roles = [Role, Role];

export type Move = 'r' | 'p' | 's';
export type Moves = [Move, Move];

export type Score = number;
export type Scores = [Score, Score];

export type Round = { index: number; roles: Roles; moves: Moves; scores: Scores; };

export const isRole = (x: unknown): x is Role => typeof x === 'string' && (x === 'human' || x === 'computer');

export const isMove = (x: unknown): x is Move => typeof x === 'string' && (x === 'r' || x === 'p' || x === 's');
