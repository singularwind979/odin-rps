import { $must } from "./dom.js";
const LOCALES = ['en', 'zh'];
const isLocale = (x) => LOCALES.includes(x);
export const OUTCOMES = ['tie', 'win', 'lose'];
export const isOutCome = (x) => OUTCOMES.includes(x);
const EN = {
    statics: {
        'title': 'Rock Paper Scissors',
        'role': 'Role:',
        'role-player': 'Player',
        'role-cpu': 'CPU',
        'score': 'Score:',
        'round': 'Round:',
        'pick-move': 'Pick a move to start round 1.',
        'toggle': '中文',
    },
    result: {
        win: 'You win!',
        lose: 'You lose!',
        tie: "It's a tie!",
    },
    moveName: {
        rock: 'rock',
        paper: 'paper',
        scissors: 'scissors',
    },
    statement: (you, cpu, outcome) => {
        const name = EN.moveName;
        const verdict = outcome === 'win'
            ? `${name[you]} beats ${name[cpu]}, you win this round!`
            : outcome === 'lose'
                ? `${name[cpu]} beats ${name[you]}, you lose this round!`
                : `Both played ${name[you]}, you tie this round.`;
        return `Your move is ${name[you]}, computer move is ${name[cpu]}. ${verdict}`;
    },
};
const ZH = {
    statics: {
        'title': '石头 剪刀 布',
        'role': '角色：',
        'role-player': '玩家',
        'role-cpu': '电脑',
        'score': '得分：',
        'round': '回合：',
        'pick-move': '选择一个出手开始第 1 回合。',
        'toggle': 'English',
    },
    result: {
        win: '你赢了！',
        lose: '你输了！',
        tie: '平局！',
    },
    moveName: {
        rock: '石头',
        paper: '布',
        scissors: '剪刀',
    },
    statement: (you, cpu, outcome) => {
        const name = ZH.moveName;
        const verdict = outcome === 'win'
            ? `${name[you]}赢${name[cpu]}，本回合你赢了！`
            : outcome === 'lose'
                ? `${name[cpu]}赢${name[you]}，本回合你输了！`
                : `双方都出${name[you]}，本回合平局。`;
        return `你出${name[you]}，电脑出${name[cpu]}。${verdict}`;
    },
};
const DICTS = { en: EN, zh: ZH };
const STORAGE_KEY = 'locale';
let locale = 'en';
export const getLocale = () => locale;
export const dict = () => DICTS[locale];
export const detectLocale = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
        return stored;
    }
    return (navigator.language ?? 'en').startsWith('zh') ? 'zh' : 'en';
};
export const applyStatics = (root = document) => {
    const { statics } = dict();
    document.documentElement.lang = locale;
    document.title = statics.title;
    root.querySelectorAll('[data-i18n]').forEach((elem) => {
        const key = elem.dataset.i18n;
        if (key && key in statics) {
            elem.textContent = statics[key];
        }
    });
};
export const setLocale = (next) => {
    locale = next;
    localStorage.setItem(STORAGE_KEY, next);
    applyStatics();
};
export const initI18n = () => {
    setLocale(detectLocale());
    $must('[data-i18n="toggle"]').addEventListener('click', () => setLocale(locale === 'en' ? 'zh' : 'en'));
};
