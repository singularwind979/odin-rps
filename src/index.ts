type Move = 'r' | 'p' | 's';
type Moves = [Move, Move];
type Score = number;
type Scores = [Score, Score];
type Round = { index: number, moves: Moves, scores: Scores };

const beats: Record<Move, Move> = { 'r':'s', 's':'p', 'p':'r' };

const isMove = (x: unknown): x is Move => 
    typeof x === 'string' && (x === 'r' || x === 'p' || x === 's');

const getMoveByPrompt = (): Move => {
    const raw = prompt('please input(r/p/s):')?.at(0)?.toLowerCase();
    return isMove(raw) ? raw : getMoveByPrompt();
};

const getMoveByRandom = (): Move => {
    const MOVES: Move[] = ['r', 'p', 's'];
    const raw = MOVES.at(Math.floor(Math.random() * 3))
    return isMove(raw) ? raw : getMoveByRandom();
};

const playRound = (moves: Moves, scores: Scores): Scores => 
    beats[moves[0]] === moves[1] ? [scores[0] + 1, scores[1]]:
    beats[moves[1]] === moves[0] ? [scores[0], scores[1] + 1]:
    scores;

const printRound = (round: Round): void => 
    console.log(
        `round ${round.index+1}\t |`, 
        `${round.moves[0]} vs ${round.moves[1]}\t |`, 
        `${round.scores[0]} : ${round.scores[1]}`);

const isGameOver = (scores: Scores, winScore: Score = 3): boolean => 
    scores[0] >= winScore || scores[1] >= winScore;
