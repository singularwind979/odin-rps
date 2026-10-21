import { initRound, playRound, isGameOver } from "./core.js";
import { renderResult, renderRound } from "./output.js";
import { initI18n } from "./i18n.js";
const playGame = async () => {
    initI18n();
    let round = initRound();
    while (!isGameOver(round.scores)) {
        round = await playRound(round);
        renderRound(round);
    }
    renderResult(round);
};
playGame();
