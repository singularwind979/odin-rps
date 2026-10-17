import { getMoveByClick, getMoveByRandom } from "./input.js";
export const beats = {
    'rock': 'scissors',
    'scissors': 'paper',
    'paper': 'rock'
};
export const isGameOver = (scores, winScore = 3) => scores[0] >= winScore || scores[1] >= winScore;
export const initRound = () => ({
    index: 0,
    roles: ['player', 'cpu'],
    moves: ['rock', 'rock'],
    scores: [0, 0]
});
export const playRound = async (r) => {
    const newMoves = [
        await getMoveByClick(),
        getMoveByRandom()
    ];
    const newScores = [
        beats[newMoves[0]] === newMoves[1] ? r.scores[0] + 1 : r.scores[0],
        beats[newMoves[1]] === newMoves[0] ? r.scores[1] + 1 : r.scores[1]
    ];
    return {
        index: r.index + 1,
        roles: r.roles,
        moves: newMoves,
        scores: newScores
    };
};
