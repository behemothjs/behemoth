/**
 * ## Modal view switcher
 * Prevents opening more than one modal view.
 */
export const modal: ModalClass;
declare class ModalClass {
    static name: any;
    get activeName(): any;
    /**
     * ### Open modal view
     * @param {string} name
     * @returns {void}
     */
    open(name: string): void;
    /**
     * ### Close modal view
     * @returns {void}
     */
    close(): void;
    /**
     * ### Check active modal view
     * @param {string} name
     * @returns {boolean}
     */
    check(name: string): boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map