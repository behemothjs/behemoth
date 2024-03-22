export class Container {
    /**
     * Register a dependency.
     * @param {string} name
     * @param {function} factory
     */
    register(name: string, factory: Function): void;
    /**
     * Get a dependency.
     * @param {string} name
     * @returns {any}
     */
    get(name: string): any;
    /**
     * Use multiple dependencies.
     * @param {...string} names
     * @returns {Record<string, any}
     */
    use(...names: string[]): Record<string, any>;
    #private;
}
export const container: Container;
//# sourceMappingURL=index.d.ts.map