export class Container {
    /**
     * Register a dependency.
     * @param {string} name
     * @param {() => Promise<void>} factory
     */
    register(name: string, factory: () => Promise<void>): void;
    /**
     * Get a dependency.
     * @param {string} name
     * @returns {Promise<any>}
     */
    get(name: string): Promise<any>;
    /**
     * Use multiple dependencies.
     * @param {string[]} names
     * @returns {Promise<Record<string, any>>}
     */
    use(...names: string[]): Promise<Record<string, any>>;
    #private;
}
//# sourceMappingURL=index.d.ts.map