import { describe, expect, it } from 'vitest';
import { isMove, isRole } from '../src/types.js';

describe('isRole', () => {
    it('accepts the two valid roles', () => {
        expect(isRole('player')).toBe(true);
        expect(isRole('cpu')).toBe(true);
    });

    it('rejects anything else', () => {
        expect(isRole('Player')).toBe(false);
        expect(isRole('Robot')).toBe(false);
        expect(isRole('')).toBe(false);
        expect(isRole(undefined)).toBe(false);
        expect(isRole(null)).toBe(false);
        expect(isRole(0)).toBe(false);
        expect(isRole({ role: 'player' })).toBe(false);
    });
});

describe('isMove', () => {
    it('accepts the three valid moves', () => {
        expect(isMove('rock')).toBe(true);
        expect(isMove('paper')).toBe(true);
        expect(isMove('scissors')).toBe(true);
    });

    it('rejects anything else', () => {
        expect(isMove('R')).toBe(false);
        expect(isMove('Rock')).toBe(false);
        expect(isMove('r')).toBe(false);
        expect(isMove('')).toBe(false);
        expect(isMove(undefined)).toBe(false);
        expect(isMove(null)).toBe(false);
        expect(isMove(1)).toBe(false);
        expect(isMove(['rock'])).toBe(false);
    });
});
