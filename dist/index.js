import { initRound, playRound, isGameOver } from "./core.js";
import { renderResult, renderRound } from "./output.js";
let round = initRound();
const playGame = async () => {
    while (!isGameOver(round.scores)) {
        round = await playRound(round);
        renderRound(round);
    }
    renderResult(round);
};
playGame();
