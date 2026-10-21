import { $must } from "./dom.js";
import { beats } from "./core.js";
import { dict } from "./i18n.js";
const renderIndex = (index) => {
    $must('.index').textContent = String(index);
};
const renderScore = (score, role) => {
    $must(`[data-panel="${role}"] .score`).textContent = String(score);
};
const renderStatement = (moves) => {
    const [you, cpu] = moves;
    const outcome = beats[you] === cpu
        ? 'win'
        : beats[cpu] === you
            ? 'lose'
            : 'tie';
    $must('[data-panel="statement"]').textContent =
        dict().statement(you, cpu, outcome);
};
export const renderRound = (round) => {
    renderIndex(round.index);
    renderStatement(round.moves);
    renderScore(round.scores[0], round.roles[0]);
    renderScore(round.scores[1], round.roles[1]);
};
const resultText = (scores) => {
    const [you, cpu] = scores;
    const outcome = you > cpu
        ? 'win'
        : you < cpu
            ? 'lose'
            : 'tie';
    return dict().result[outcome];
};
export const renderResult = (finalRound) => {
    document.querySelector('[data-panel="result"]')?.remove();
    const layer = document.createElement('div');
    layer.dataset.panel = 'result';
    layer.className = 'vport-x vport-y z-top flexbox-row main-center cross-center';
    const popup = document.createElement('div');
    popup.className = 'result flexbox-col cross-center p-3 b-2 r-4 sh-2 bg-white b-neutral-2 font-neutral font-5 font-bold';
    popup.textContent = resultText(finalRound.scores);
    layer.addEventListener('click', () => layer.remove());
    layer.append(popup);
    document.body.append(layer);
};
