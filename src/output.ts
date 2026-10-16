import { $must } from "./dom.js";
import type { Move, Role, Score, Round } from "./types.js";

const renderIndex = (index: number): void => {
    $must('.index').textContent = String(index);
};

const renderMove = (move: Move, role: Role): void => {
    $must(`[data-belong="${role}"] button[data-move="${move}"]`)
        .classList.add('selected');
};

const renderScore = (score: Score, role: Role): void => {
    $must(`[data-belong="${role}"] .score`).textContent = String(score);
};

export const renderRound = (round: Round): void => {
    renderIndex(round.index);

    renderMove(round.moves[0], round.roles[0]);
    renderScore(round.scores[0], round.roles[0]);

    renderMove(round.moves[1], round.roles[1]);
    renderScore(round.scores[1], round.roles[1]);
};

export const logRound = (r: Round): void => 
    console.log(
        `round ${r.index}\t |`,
        `${r.moves[0]} vs ${r.moves[1]}\t |`,
        `${r.scores[0]} : ${r.scores[1]}`
    );

export const logPreGame = (): void => 
    console.log('round\t | moves\t | scores');

export const logPostGame = (finalRound: Round): void => 
    console.log(`you ${
        finalRound.scores[0] > finalRound.scores[1] ? 'win' :
        finalRound.scores[0] < finalRound.scores[1] ? 'lose' :
        'tie'
    }`);
