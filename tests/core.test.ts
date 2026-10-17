import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initRound, isGameOver, playRound } from '../src/core.js';
import { getMoveByClick, getMoveByRandom } from '../src/input.js';

vi.mock('../src/input.js', () => ({
    getMoveByClick: vi.fn(async () => 'paper' as const),
    getMoveByRandom: vi.fn(() => 'scissors' as const),
}));

beforeEach(() => {
    vi.mocked(getMoveByClick).mockClear();
    vi.mocked(getMoveByRandom).mockClear();
});

describe('initRound', () => {
    it('starts at round 0, no scores, not over', () => {
        expect(initRound()).toEqual({
            index: 0,
            roles: ['player', 'cpu'],
            moves: ['rock', 'rock'],
            scores: [0, 0],
        });
        expect(isGameOver(initRound().scores)).toBe(false);
    });
});

describe('playRound', () => {
    // Mocked moves: player 'paper' vs cpu 'scissors' — scissors cut paper,
    // so the cpu wins every played round.

    it('asks the input layer for one player and one cpu move', async () => {
        await playRound(initRound());
        expect(getMoveByClick).toHaveBeenCalledTimes(1);
        expect(getMoveByRandom).toHaveBeenCalledTimes(1);
    });

    it('returns the advanced round without mutating the one passed in', async () => {
        const r = initRound();
        const next = await playRound(r);
        expect(r.index).toBe(0);
        expect(next.index).toBe(1);
        expect(next.roles).toEqual(r.roles);
        expect(next.moves).toEqual(['paper', 'scissors']);
    });

    it('scores the moves it just played', async () => {
        const next = await playRound(initRound());
        expect(next.scores).toEqual([0, 1]);
    });

    it('stays open while nobody has reached the win score', async () => {
        const next = await playRound(initRound());
        expect(isGameOver(next.scores)).toBe(false);
    });

    it('ends the game once a side reaches the win score', async () => {
        let r = initRound();
        for (let i = 0; i < 3; i++) {
            r = await playRound(r);
            expect(isGameOver(r.scores)).toBe(i >= 2);
        }
        expect(r.scores).toEqual([0, 3]);
    });
});
