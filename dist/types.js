export const ROLES = ['player', 'cpu'];
export const isRole = (x) => ROLES.includes(x);
export const MOVES = ['rock', 'paper', 'scissors'];
export const isMove = (x) => MOVES.includes(x);
export const isScore = (x) => typeof x === 'number' && Number.isInteger(x) && x >= 0;
