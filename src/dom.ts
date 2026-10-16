const $ = <T extends HTMLElement>(
    selector: string, 
    root: ParentNode = document
): T | null => 
    root.querySelector<T>(selector);

export const $must = <T extends HTMLElement>(
    selector: string, 
    root: ParentNode = document
): T => {
    const raw = $<T>(selector, root);
    if (!raw) {
        throw new Error(`a must selector not found: ${selector}`);
    }
    return raw;
};

export const waitEventTarget = <
    T extends HTMLElement, 
    K extends keyof HTMLElementEventMap>(
    elem: T, 
    type: K
): Promise<HTMLElement> =>
	new Promise<HTMLElement>((resolve) => 
		elem.addEventListener(
            type, 
            (event) => resolve(event.target as HTMLElement), 
            { once: true }
        )
);
