type Index = number;

type Role = 'human' | 'computer';
type Roles = [Role, Role];

type Move = 'r' | 'p' | 's';
type Moves = [Move, Move];

type Score = number;
type Scores = [Score, Score];

type Round = { index: number, roles: Roles, moves: Moves, scores: Scores };

const isMove = (x: unknown): x is Move => typeof x === 'string' && (x === 'r' || x === 'p' || x === 's');

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
