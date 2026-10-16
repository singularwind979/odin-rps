import { describe, expect, it } from 'vitest';
import { isMove, isRole } from '../src/types.js';

describe('isRole', () => {
    it('accepts the two valid roles', () => {
        expect(isRole('human')).toBe(true);
        expect(isRole('computer')).toBe(true);
    });

    it('rejects anything else', () => {
        expect(isRole('Robot')).toBe(false);
        expect(isRole('')).toBe(false);
        expect(isRole(undefined)).toBe(false);
        expect(isRole(null)).toBe(false);
        expect(isRole(0)).toBe(false);
        expect(isRole({ role: 'human' })).toBe(false);
    });
});

describe('isMove', () => {
    it('accepts the three valid moves', () => {
        expect(isMove('r')).toBe(true);
        expect(isMove('p')).toBe(true);
        expect(isMove('s')).toBe(true);
    });

    it('rejects anything else', () => {
        expect(isMove('R')).toBe(false);
        expect(isMove('rock')).toBe(false);
        expect(isMove('')).toBe(false);
        expect(isMove(undefined)).toBe(false);
        expect(isMove(null)).toBe(false);
        expect(isMove(1)).toBe(false);
        expect(isMove(['r'])).toBe(false);
    });
});
