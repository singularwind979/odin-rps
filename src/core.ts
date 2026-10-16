import type { Move, Moves, Round, Score, Scores } from "./types.js";
import { getMoveByClick, getMoveByRandom } from "./input.js";

const beats: Record<Move, Move> = { 'r': 's', 's': 'p', 'p': 'r' };

export const isGameOver = (scores: Scores, winScore: Score = 3): boolean => 
    scores[0] >= winScore || scores[1] >= winScore;

export const initRound = (): Round => ({
    index: 0,
    roles: ['human', 'computer'],
    moves: ['r', 'r'],
    scores: [0, 0]
});

export const playRound = async (r: Round): Promise<Round> => {
    const newMoves: Moves = [
        await getMoveByClick(), 
        getMoveByRandom()
    ];
    const newScores: Scores = [
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
