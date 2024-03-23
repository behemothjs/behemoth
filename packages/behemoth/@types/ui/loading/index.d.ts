/**
 * ### Loading switcher
 */
export const loading: LoadingClass;
declare class LoadingClass {
    static store: Map<any, any>;
    /** @type {string[]} */
    get activeNames(): string[];
    /**
     * ### Start loading
     * @param {string} name
     * @returns {void}
     */
    start(name: string): void;
    /**
     * ### End loading
     * @param {string} name
     * @returns {void}
     */
    end(name: string): void;
    /**
     * ### Check loading
     * @param {string} name
     * @returns {boolean}
     */
    check(name: string): boolean;
    /**
     * ### Destroy all loadings
     * @returns {void}
     */
    destory(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map