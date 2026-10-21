import { $must } from "./dom.js";
import { beats } from "./core.js";
import type { Outcome } from "./i18n.js";
import { dict } from "./i18n.js";
import type { MovePair, Role, Score, ScorePair, Round } from "./types.js";

const renderIndex = (index: number): void => {
    $must('.index').textContent = String(index);
};

const renderScore = (score: Score, role: Role): void => {
    $must(`[data-panel="${role}"] .score`).textContent = String(score);
};

const renderStatement = (moves: MovePair): void => {
    const [you, cpu] = moves;
    const outcome: Outcome = beats[you] === cpu
        ? 'win'
        : beats[cpu] === you
        ? 'lose'
        : 'tie';
    $must('[data-panel="statement"]').textContent =
        dict().statement(you, cpu, outcome);
};

export const renderRound = (round: Round): void => {
    renderIndex(round.index);
    renderStatement(round.moves);
    renderScore(round.scores[0], round.roles[0]);
    renderScore(round.scores[1], round.roles[1]);
};

const resultText = (scores: ScorePair): string => {
    const [you, cpu] = scores;
    const outcome: Outcome = you > cpu
        ? 'win'
        : you < cpu
        ? 'lose'
        : 'tie';
    return dict().result[outcome];
};

export const renderResult = (finalRound: Round): void => {
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
