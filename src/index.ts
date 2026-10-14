type Move = 'r' | 'p' | 's';
type Moves = [Move, Move];
type Score = number;
type Scores = [Score, Score];
type Round = { index: number, moves: Moves, scores: Scores };

const beats: Record<Move, Move> = { 'r':'s', 's':'p', 'p':'r' };
