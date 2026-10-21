export const ROLES = ['player', 'cpu'] as const;
export const isRole = (x: unknown): x is Role => ROLES.includes(x as Role);
export type Role = typeof ROLES[number];
export type RolePair = [Role, Role];

export const MOVES = ['rock', 'paper', 'scissors'] as const;
export const isMove = (x: unknown): x is Move => MOVES.includes(x as Move);
export type Move = typeof MOVES[number];
export type MovePair = [Move, Move];

export type Score = number;
export const isScore = (x: unknown): x is Score => typeof x ==='number' && Number.isInteger(x) && x >= 0;
export type ScorePair = [Score, Score];

export type Round = { index: number; roles: RolePair; moves: MovePair; scores: ScorePair; };
