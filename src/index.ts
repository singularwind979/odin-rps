type Move = 'r' | 'p' | 's';

const isMove = (x: unknown): x is Move => 
    typeof x === 'string' &&
    (x === 'r' || x === 'p' || x === 's');

const $ = <T extends HTMLElement>(selector: string, context: ParentNode = document): T | null => 
    context.querySelector<T>(selector);

const $must = <T extends HTMLElement>(selector: string, context: ParentNode = document): T => {
    const raw = $<T>(selector);
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
