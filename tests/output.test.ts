import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logPostGame, logPreGame, logRound, renderRound } from '../src/output.js';
import type { Round } from '../src/types.js';
import { mountGame } from './gameFixture.js';

const makeRound = (overrides: Partial<Round> = {}): Round => ({
    index: 1,
    roles: ['player', 'cpu'],
    moves: ['rock', 'scissors'],
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

    it('renders a win statement when the player move beats the cpu move', () => {
        renderRound(makeRound({ moves: ['rock', 'scissors'] }));
        expect(select('[data-panel="statement"]').textContent)
            .toBe('Your move is rock, computer move is scissors. rock beats scissors, you win this round!');
    });

    it('renders a lose statement when the cpu move beats the player move', () => {
        renderRound(makeRound({ moves: ['scissors', 'rock'] }));
        expect(select('[data-panel="statement"]').textContent)
            .toBe('Your move is scissors, computer move is rock. rock beats scissors, you lose this round!');
    });

    it('renders a tie statement when both sides play the same move', () => {
        renderRound(makeRound({ moves: ['paper', 'paper'] }));
        expect(select('[data-panel="statement"]').textContent)
            .toBe('Your move is paper, computer move is paper. Both played paper, you tie this round.');
    });

    it('renders both scores in their own panels', () => {
        renderRound(makeRound({ scores: [2, 3] }));
        expect(select('[data-panel="player"] .score').textContent).toBe('2');
        expect(select('[data-panel="cpu"] .score').textContent).toBe('3');
    });

    it('throws when the DOM is missing a required node', () => {
        document.body.innerHTML = '';
        expect(() => renderRound(makeRound())).toThrow(/a must selector not found/);
    });
});

describe('logRound', () => {
    it('logs index, moves and scores', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {});
        logRound(makeRound({ index: 2, moves: ['rock', 'paper'], scores: [1, 0] }));
        expect(log).toHaveBeenCalledTimes(1);
        const [label, moves, scores] = log.mock.calls[0]!;
        expect(label).toContain('round 2');
        expect(moves).toContain('rock vs paper');
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
