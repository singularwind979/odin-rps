import type { Round } from "./types.js";
import { initRound, playRound, isGameOver } from "./core.js";
import { logPostGame, logPreGame, logRound, renderRound } from "./output.js";

let round: Round = initRound();

const playGame = async () => {
   logPreGame();
    while (!isGameOver(round.scores)) {
        round = await playRound(round);
        renderRound(round);
        logRound(round); 
    }
    logPostGame(round);
};

playGame();
