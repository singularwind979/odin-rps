type Index = number;

type Role = 'human' | 'computer';
type Roles = [Role, Role];

type Move = 'r' | 'p' | 's';
type Moves = [Move, Move];

type Score = number;
type Scores = [Score, Score];

type Round = { index: number, roles: Roles, moves: Moves, scores: Scores };

const isMove = (x: unknown): x is Move => typeof x === 'string' && (x === 'r' || x === 'p' || x === 's');

const beats: Record<Move, Move> = { 'r':'s', 's':'p', 'p':'r' };

const $ = <T extends HTMLElement>(selector: string, root: ParentNode = document): T | null => 
    root.querySelector<T>(selector);

const $must = <T extends HTMLElement>(selector: string, root: ParentNode = document): T => {
    const raw = $<T>(selector, root);
    if(!raw) {
        throw new Error(`a must selector not found: ${selector}`);
    }
    return raw;
};

const renderIndex = (index: Index): void => {
    $must('.index').textContent = String(index);
};

const renderMove = (move: Move, role: Role): void => {
    $must(`[data-belong="${role}"] button[data-move="${move}"]`).classList.add('selected');
};

const renderScore = (score: Score, role: Role): void => {
    $must(`[data-belong="${role}"] .score`).textContent = String(score);
};

const renderRound = (round: Round): void => {
    renderIndex(round.index);

    renderMove(round.moves[0], round.roles[0]);
    renderScore(round.scores[0], round.roles[0]);

    renderMove(round.moves[1], round.roles[1]);
    renderScore(round.scores[1], round.roles[1]);
};

$must('[data-belong="human"]').addEventListener('click', ((event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    const raw = target.closest<HTMLButtonElement>('[data-move]')?.dataset.move;
    if (isMove(raw)) {
        console.log(`your click is ${raw}`);
    }
}));

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

const getHumanMove = getMoveByRandom;
const getComputerMove = getMoveByRandom;

const playGame = () => {
    let scores: Scores = [0, 0];
    let moves: Moves = ['r', 'r'];
    console.log('round\t | moves\t | scores');
    for (let i = 0 ; !isGameOver(scores); i++) {
        moves = [getHumanMove(), getComputerMove()];
        scores = playRound(moves, scores);
        const round: Round = {
            index: i,
            moves: moves,
            scores: scores
        };
        printRound(round);      
    }
};

playGame();
