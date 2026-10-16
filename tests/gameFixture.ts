/**
 * Structural mirror of index.html's game layout, shared by the DOM-backed
 * suites (dom / input / output). Only the hooks the code under test selects on
 * are kept: `data-belong`, `data-move`, `.index` and `.score`.
 */
export const gameHTML = `
<h1>Rock Paper Scissors</h1>
<div>
    <div data-belong="computer">
        <div>Role:<span>Computer</span></div>
        <div>Score:<span class="score">0</span></div>
        <ul>
            <li><button data-move="r">Rock</button></li>
            <li><button data-move="p">Paper</button></li>
            <li><button data-move="s">Scissors</button></li>
        </ul>
    </div>
    <div>
        <div>Round:<span class="index">0</span></div>
        <div>VS</div>
    </div>
    <div data-belong="human">
        <div>Role:<span>Human</span></div>
        <div>Score:<span class="score">0</span></div>
        <ul>
            <li><button data-move="r">Rock</button></li>
            <li><button data-move="p">Paper</button></li>
            <li><button data-move="s">Scissors</button></li>
        </ul>
    </div>
</div>
`;

export const mountGame = (): void => {
    document.body.innerHTML = gameHTML;
};
