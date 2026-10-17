export const isRole = (x) => typeof x === 'string' && (x === 'player' || x === 'cpu');
export const isMove = (x) => typeof x === 'string' && (x === 'rock' || x === 'paper' || x === 'scissors');
export const ROLES = ['player', 'cpu'];
export const MOVES = ['rock', 'paper', 'scissors'];
