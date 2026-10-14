const $ = <T extends HTMLElement>(selector: string, context: ParentNode = document): T | null =>
    context.querySelector<T>(selector);

const $$ = <T extends HTMLElement>(selector: string, context: ParentNode = document): T[] =>
    [...context.querySelectorAll<T>(selector)];

const $must = <T extends HTMLElement>(selector: string, context: ParentNode = document): T => {
    const raw = $<T>(selector);
    if(!raw) {
        throw new Error(`a must selector not found: ${selector}`);
    }
    return raw;
};
