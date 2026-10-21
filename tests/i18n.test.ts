import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { applyStatics, detectLocale, dict, getLocale, setLocale } from '../src/i18n.js';

const gameHTML = `
<h1 data-i18n="title">Rock Paper Scissors</h1>
<button data-i18n="toggle">中文</button>
<div><span data-i18n="role">Role:</span> <span data-i18n="role-cpu">CPU</span></div>
<div><span data-i18n="score">Score:</span> <span class="score">0</span></div>
<div><span data-i18n="round">Round:</span><span class="index">0</span></div>
<div data-panel="statement" data-i18n="pick-move">Pick a move to start round 1.</div>
`;

beforeEach(() => {
    document.body.innerHTML = gameHTML;
    localStorage.clear();
});

afterEach(() => setLocale('en'));

const select = (css: string): HTMLElement =>
    document.querySelector<HTMLElement>(css)!;

describe('locale switching', () => {
    it('defaults to english', () => {
        expect(getLocale()).toBe('en');
    });

    it('persists the locale and reads it back through detectLocale', () => {
        setLocale('zh');
        expect(localStorage.getItem('locale')).toBe('zh');
        expect(detectLocale()).toBe('zh');
    });

    it('ignores a stored value that is not a known locale', () => {
        localStorage.setItem('locale', 'de');
        expect(detectLocale()).toBe('en');
    });
});

describe('applyStatics', () => {
    it('leaves english text alone under the english locale', () => {
        applyStatics();
        expect(select('[data-i18n="title"]').textContent).toBe('Rock Paper Scissors');
    });

    it('replaces every data-i18n node when the locale changes', () => {
        setLocale('zh');
        expect(select('[data-i18n="title"]').textContent).toBe('石头 剪刀 布');
        expect(select('[data-i18n="role"]').textContent).toBe('角色：');
        expect(select('[data-i18n="role-cpu"]').textContent).toBe('电脑');
        expect(select('[data-i18n="score"]').textContent).toBe('得分：');
        expect(select('[data-i18n="round"]').textContent).toBe('回合：');
        expect(select('[data-i18n="pick-move"]').textContent).toBe('选择一个出手开始第 1 回合。');
        expect(document.title).toBe('石头 剪刀 布');
        expect(document.documentElement.lang).toBe('zh');
    });

    it('swaps the toggle label to the other language', () => {
        applyStatics();
        expect(select('[data-i18n="toggle"]').textContent).toBe('中文');
        setLocale('zh');
        expect(select('[data-i18n="toggle"]').textContent).toBe('English');
    });
});

describe('statement', () => {
    it('builds the english win sentence', () => {
        expect(dict().statement('rock', 'scissors', 'win'))
            .toBe('Your move is rock, computer move is scissors. rock beats scissors, you win this round!');
    });

    it('builds the english lose sentence with the winner first', () => {
        expect(dict().statement('scissors', 'rock', 'lose'))
            .toBe('Your move is scissors, computer move is rock. rock beats scissors, you lose this round!');
    });

    it('builds the english tie sentence', () => {
        expect(dict().statement('paper', 'paper', 'tie'))
            .toBe('Your move is paper, computer move is paper. Both played paper, you tie this round.');
    });

    it('builds chinese sentences with localized move names', () => {
        setLocale('zh');
        expect(dict().statement('rock', 'scissors', 'win'))
            .toBe('你出石头，电脑出剪刀。石头赢剪刀，本回合你赢了！');
        expect(dict().statement('scissors', 'rock', 'lose'))
            .toBe('你出剪刀，电脑出石头。石头赢剪刀，本回合你输了！');
        expect(dict().statement('paper', 'paper', 'tie'))
            .toBe('你出布，电脑出布。双方都出布，本回合平局。');
    });
});

describe('result', () => {
    it('uses english result text under the english locale', () => {
        expect(dict().result.win).toBe('You win!');
        expect(dict().result.lose).toBe('You lose!');
        expect(dict().result.tie).toBe("It's a tie!");
    });

    it('uses chinese result text under the chinese locale', () => {
        setLocale('zh');
        expect(dict().result.win).toBe('你赢了！');
        expect(dict().result.lose).toBe('你输了！');
        expect(dict().result.tie).toBe('平局！');
    });
});
