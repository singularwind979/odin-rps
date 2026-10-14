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

const computer = $must('#computer');
const human = $must('#human');
const computerScore = $must('#computer .score');
const humanScore = $must('#human .score');
const computerRps = $must('#computer .rps');
const humanRps = $must('#human .rps');

const handleClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    const raw = target.closest<HTMLButtonElement>('[data-move]')?.dataset.move;
    if (isMove(raw)) {
        console.log(`click on ${raw}`);
    }
};

humanRps.addEventListener('click', handleClick);
