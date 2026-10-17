import { $must } from "./dom.js";
import { beats } from "./core.js";
import type { Moves, Role, Score, Round } from "./types.js";

const renderIndex = (index: number): void => {
    $must('.index').textContent = String(index);
};

const renderScore = (score: Score, role: Role): void => {
    $must(`[data-panel="${role}"] .score`).textContent = String(score);
};

const renderStatement = (moves: Moves): void => {
    const [you, cpu] = moves;
    const verdict = beats[you] === cpu
        ? `${you} beats ${cpu}, you win this round!`
        : beats[cpu] === you
        ? `${cpu} beats ${you}, you lose this round!`
        : `Both played ${you}, you tie this round.`;
    $must('[data-panel="statement"]').textContent =
        `Your move is ${you}, computer move is ${cpu}. ${verdict}`;
};

export const renderRound = (round: Round): void => {
    renderIndex(round.index);
    renderStatement(round.moves);
    renderScore(round.scores[0], round.roles[0]);
    renderScore(round.scores[1], round.roles[1]);
};
