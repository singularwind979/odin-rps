import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderResult, renderRound } from '../src/output.js';
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

describe('renderResult', () => {
    const layer = (): HTMLElement | null =>
        document.querySelector('[data-panel="result"]');
    const popup = (): HTMLElement | null =>
        document.querySelector('[data-panel="result"] .result');

    afterEach(() => layer()?.remove());

    it('creates the popup only when the result renders', () => {
        expect(popup()).toBeNull();
        renderResult(makeRound({ scores: [3, 1] }));
        expect(popup()).not.toBeNull();
    });

    it('shows a win message when the player leads', () => {
        renderResult(makeRound({ scores: [3, 1] }));
        expect(popup()!.textContent).toBe('You win!');
    });

    it('shows a lose message when the computer leads', () => {
        renderResult(makeRound({ scores: [0, 3] }));
        expect(popup()!.textContent).toBe('You lose!');
    });

    it('shows a tie message when the scores are level', () => {
        renderResult(makeRound({ scores: [2, 2] }));
        expect(popup()!.textContent).toBe("It's a tie!");
    });

    it('lifts the popup above the page with a fixed, centred layer', () => {
        renderResult(makeRound({ scores: [3, 1] }));
        const classes = layer()!.classList;
        expect(classes).toContain('z-top');
        expect(classes).toContain('vport-x');
        expect(classes).toContain('vport-y');
        expect(classes).toContain('main-center');
        expect(classes).toContain('cross-center');
    });

    it('removes the popup from the DOM when clicked away', () => {
        renderResult(makeRound({ scores: [3, 1] }));
        layer()!.click();
        expect(popup()).toBeNull();
    });

    it('replaces any previous popup instead of stacking', () => {
        renderResult(makeRound({ scores: [3, 1] }));
        renderResult(makeRound({ scores: [0, 3] }));
        expect(document.querySelectorAll('[data-panel="result"]').length).toBe(1);
        expect(popup()!.textContent).toBe('You lose!');
    });
});
