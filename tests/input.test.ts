import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getMoveByClick, getMoveByPrompt, getMoveByRandom } from '../src/input.js';
import { isMove } from '../src/types.js';
import { mountGame } from './gameFixture.js';

describe('getMoveByPrompt', () => {
    afterEach(() => vi.unstubAllGlobals());

    it('accepts a valid move', () => {
        vi.stubGlobal('prompt', vi.fn(() => 's'));
        expect(getMoveByPrompt()).toBe('s');
    });

    it('takes the first character and lowercases it', () => {
        vi.stubGlobal('prompt', vi.fn(() => 'ROCK'));
        expect(getMoveByPrompt()).toBe('r');
    });

    it('re-prompts on invalid input until a valid move arrives', () => {
        const prompt = vi.fn(() => ['q', '', undefined, 'p'][prompt.mock.calls.length - 1]);
        vi.stubGlobal('prompt', prompt);
        expect(getMoveByPrompt()).toBe('p');
        expect(prompt).toHaveBeenCalledTimes(4);
    });

    it('re-prompts when the dialog is dismissed', () => {
        const prompt = vi.fn(() => [null, 'r'][prompt.mock.calls.length - 1]);
        vi.stubGlobal('prompt', prompt);
        expect(getMoveByPrompt()).toBe('r');
        expect(prompt).toHaveBeenCalledTimes(2);
    });
});

describe('getMoveByRandom', () => {
    afterEach(() => vi.restoreAllMocks());

    it('maps the random draw onto r/p/s', () => {
        const random = vi.spyOn(Math, 'random').mockReturnValue(0);
        expect(getMoveByRandom()).toBe('r');
        random.mockReturnValue(0.5);
        expect(getMoveByRandom()).toBe('p');
        random.mockReturnValue(0.999999);
        expect(getMoveByRandom()).toBe('s');
    });

    it('always returns a valid move over many draws', () => {
        for (let i = 0; i < 200; i++) {
            expect(isMove(getMoveByRandom())).toBe(true);
        }
    });
});

describe('getMoveByClick', () => {
    beforeEach(() => mountGame());

    it('resolves with the move of the clicked human button', async () => {
        const waiting = getMoveByClick();
        document
            .querySelector<HTMLButtonElement>('[data-belong="human"] button[data-move="s"]')!
            .click();
        expect(await waiting).toBe('s');
    });

    it('resolves with "r" when the rock button is clicked', async () => {
        const waiting = getMoveByClick();
        document
            .querySelector<HTMLButtonElement>('[data-belong="human"] button[data-move="r"]')!
            .click();
        expect(await waiting).toBe('r');
    });
});
