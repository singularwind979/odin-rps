const $ = (selector, root = document) => root.querySelector(selector);
export const $must = (selector, root = document) => {
    const raw = $(selector, root);
    if (!raw) {
        throw new Error(`a must selector not found: ${selector}`);
    }
    return raw;
};
export const waitEventTarget = (elem, type) => new Promise((resolve) => elem.addEventListener(type, (event) => resolve(event.target), { once: true }));
