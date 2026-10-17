import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getMoveByClick, getMoveByRandom } from '../src/input.js';
import { isMove } from '../src/types.js';
import { mountGame } from './gameFixture.js';

describe('getMoveByRandom', () => {
    afterEach(() => vi.restoreAllMocks());

    it('maps the random draw onto rock/paper/scissors', () => {
        const random = vi.spyOn(Math, 'random').mockReturnValue(0);
        expect(getMoveByRandom()).toBe('rock');
        random.mockReturnValue(0.5);
        expect(getMoveByRandom()).toBe('paper');
        random.mockReturnValue(0.999999);
        expect(getMoveByRandom()).toBe('scissors');
    });

    it('always returns a valid move over many draws', () => {
        for (let i = 0; i < 200; i++) {
            expect(isMove(getMoveByRandom())).toBe(true);
        }
    });
});

describe('getMoveByClick', () => {
    beforeEach(() => mountGame());

    it('resolves with the move of the clicked player button', async () => {
        const waiting = getMoveByClick();
        document
            .querySelector<HTMLButtonElement>('[data-panel="player"] button[data-move="scissors"]')!
            .click();
        expect(await waiting).toBe('scissors');
    });

    it('resolves with "rock" when the rock button is clicked', async () => {
        const waiting = getMoveByClick();
        document
            .querySelector<HTMLButtonElement>('[data-panel="player"] button[data-move="rock"]')!
            .click();
        expect(await waiting).toBe('rock');
    });
});
