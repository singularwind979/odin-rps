/**
 * Structural mirror of index.html's game layout, shared by the DOM-backed
 * suites (dom / input / output). Only the hooks the code under test selects on
 * are kept: `data-panel`, `data-move`, `.index` and `.score`.
 */
export const gameHTML = `
<h1>Rock Paper Scissors</h1>
<div>
    <div data-panel="cpu">
        <div>Role:<span>cpu</span></div>
        <div>Score:<span class="score">0</span></div>
        <ul>
            <li><button data-move="rock">Rock</button></li>
            <li><button data-move="paper">Paper</button></li>
            <li><button data-move="scissors">Scissors</button></li>
        </ul>
    </div>
    <div>
        <div>Round:<span class="index">0</span></div>
        <div>VS</div>
    </div>
    <div data-panel="player">
        <div>Role:<span>player</span></div>
        <div>Score:<span class="score">0</span></div>
        <ul>
            <li><button data-move="rock">Rock</button></li>
            <li><button data-move="paper">Paper</button></li>
            <li><button data-move="scissors">Scissors</button></li>
        </ul>
    </div>
</div>
<div data-panel="statement"></div>
`;

export const mountGame = (): void => {
    document.body.innerHTML = gameHTML;
};
