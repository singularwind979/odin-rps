import { isMove, MOVES } from "./types.js";
import { $must, waitEventTarget } from "./dom.js";
export const getMoveByRandom = () => {
    const raw = MOVES.at(Math.floor(Math.random() * MOVES.length));
    return isMove(raw) ? raw : getMoveByRandom();
};
export const getMoveByClick = async () => {
    const target = await waitEventTarget($must('[data-panel="player"]'), 'click');
    const raw = target.dataset.move;
    return isMove(raw) ? raw : getMoveByClick();
};
