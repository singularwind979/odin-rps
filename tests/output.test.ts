import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logPostGame, logPreGame, logRound, renderRound } from '../src/output.js';
import type { Round } from '../src/types.js';
import { mountGame } from './gameFixture.js';

const makeRound = (overrides: Partial<Round> = {}): Round => ({
    index: 1,
    roles: ['human', 'computer'],
    moves: ['r', 's'],
    scores: [1, 0],
    ...overrides,
});

beforeEach(() => mountGame());
afterEach(() => vi.restoreAllMocks());

const select = (css: string): HTMLElement => document.querySelector<HTMLElement>(css)!;

describe('renderRound', () => {
    it('renders the round index', () => {
        renderRound(makeRound({ index: 4 }));
        expect(select('.index').textContent).toBe('4');
    });

    it('marks each side\'s chosen move as selected', () => {
        renderRound(makeRound({ moves: ['p', 's'] }));
        expect(select('[data-belong="human"] button[data-move="p"]').classList.contains('selected')).toBe(true);
        expect(select('[data-belong="computer"] button[data-move="s"]').classList.contains('selected')).toBe(true);
    });

    it('does not select moves that were not played', () => {
        renderRound(makeRound({ moves: ['r', 'r'] }));
        expect(select('[data-belong="human"] button[data-move="p"]').classList.contains('selected')).toBe(false);
        expect(select('[data-belong="computer"] button[data-move="s"]').classList.contains('selected')).toBe(false);
    });

    it('renders both scores in their own panels', () => {
        renderRound(makeRound({ scores: [2, 3] }));
        expect(select('[data-belong="human"] .score').textContent).toBe('2');
        expect(select('[data-belong="computer"] .score').textContent).toBe('3');
    });

    it('throws when the DOM is missing a required node', () => {
        document.body.innerHTML = '';
        expect(() => renderRound(makeRound())).toThrow(/a must selector not found/);
    });
});

describe('logRound', () => {
    it('logs index, moves and scores', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logRound(makeRound({ index: 2, moves: ['r', 'p'], scores: [1, 0] }));
        expect(log).toHaveBeenCalledTimes(1);
        const [label, moves, scores] = log.mock.calls[0]!;
        expect(label).toContain('round 2');
        expect(moves).toContain('r vs p');
        expect(scores).toContain('1 : 0');
    });

    it('logs the same round number it renders', () => {
        const round = makeRound({ index: 3 });
        renderRound(round);
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logRound(round);
        const [label] = log.mock.calls[0]!;
        const rendered = document.querySelector('.index')!.textContent;
        expect(label).toBe(`round ${rendered}\t |`);
    });
});

describe('logPreGame', () => {
    it('logs the table header', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logPreGame();
        expect(log).toHaveBeenCalledWith('round\t | moves\t | scores');
    });
});

describe('logPostGame', () => {
    it('announces a win when the human leads', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logPostGame(makeRound({ scores: [3, 1] }));
        expect(log.mock.calls[0]![0]).toMatch(/win/);
    });

    it('announces a loss when the computer leads', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logPostGame(makeRound({ scores: [0, 3] }));
        expect(log.mock.calls[0]![0]).toMatch(/lose/);
    });

    it('announces a tie when the scores are level', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logPostGame(makeRound({ scores: [2, 2] }));
        expect(log.mock.calls[0]![0]).toMatch(/tie/);
    });
});
