import { beforeEach, describe, expect, it, vi } from 'vitest';
import { $must, waitEventTarget } from '../src/dom.js';
import { mountGame } from './gameFixture.js';

beforeEach(() => mountGame());

describe('$must', () => {
    it('returns the first matching element', () => {
        const el = $must<HTMLElement>('.index');
        expect(el.tagName).toBe('SPAN');
        expect(el.textContent).toBe('0');
    });

    it('supports scoped lookups through a custom root', () => {
        const human = $must<HTMLElement>('[data-belong="human"]');
        const score = $must<HTMLElement>('.score', human);
        const computerScore = $must<HTMLElement>('.score', $must<HTMLElement>('[data-belong="computer"]'));
        expect(human.contains(score)).toBe(true);
        expect(computerScore).not.toBe(score);
    });

    it('throws with the selector in the message when nothing matches', () => {
        expect(() => $must('#nope')).toThrow(/a must selector not found: #nope/);
    });

    it('does not throw when a scoped lookup misses only outside its root', () => {
        const human = $must<HTMLElement>('[data-belong="human"]');
        expect(() => $must('[data-belong="computer"]', human)).toThrow(/not found/);
    });
});

describe('waitEventTarget', () => {
    it('resolves with the event target once the event fires', async () => {
        const button = $must<HTMLButtonElement>('[data-belong="human"] button[data-move="p"]');
        const waiting = waitEventTarget(button, 'click');
        button.click();
        const target = await waiting;
        expect(target).toBe(button);
        expect((target as HTMLElement).dataset.move).toBe('p');
    });

    it('listens only once (listener removed after first event)', async () => {
        const button = $must<HTMLButtonElement>('[data-belong="human"] button[data-move="r"]');
        const removeSpy = vi.spyOn(button, 'removeEventListener');
        const first = waitEventTarget(button, 'click');
        button.click();
        await first;
        expect(removeSpy).toHaveBeenCalledTimes(1);
    });

    it('resolves with the innermost target even for events from descendants', async () => {
        document.body.innerHTML = '<div id="host"><span id="inner">x</span></div>';
        const host = $must<HTMLDivElement>('#host');
        const inner = $must<HTMLSpanElement>('#inner');
        const waiting = waitEventTarget(host, 'click');
        inner.click();
        expect(await waiting).toBe(inner);
    });
});
