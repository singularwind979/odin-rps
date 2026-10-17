import type { Round } from "./types.js";
import { initRound, playRound, isGameOver } from "./core.js";
import { renderRound } from "./output.js";

let round: Round = initRound();

const playGame = async () => {
    while (!isGameOver(round.scores)) {
        round = await playRound(round);
        renderRound(round);
    }
};

playGame();
