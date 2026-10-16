import type { Move } from "./types.js";
import { isMove } from "./types.js";
import { $must, waitEventTarget } from "./dom.js";

export const getMoveByPrompt = (): Move => {
    const raw = prompt('please input(r/p/s):')?.at(0)?.toLowerCase();
    return isMove(raw) ? raw : getMoveByPrompt();
};

export const getMoveByRandom = (): Move => {
    const MOVES: Move[] = ['r', 'p', 's'];
    const raw = MOVES.at(Math.floor(Math.random() * 3));
    return isMove(raw) ? raw : getMoveByRandom();
};

export const getMoveByClick =  async(): Promise<Move> => {
    const target = await waitEventTarget(
        $must('[data-belong="human"]'), 
        'click'
    );
    const raw = target.dataset.move;
    return isMove(raw) ? raw : getMoveByClick();
}
