
export class Container {
	#dependencies = new Map();
	#singletons = new Map();

	/**
	 * Register a dependency.
	 * @param {string} name
	 * @param {() => Promise<void>} factory
	 */
	register(name, factory) {
		this.#dependencies.set(name, factory);
	}

	/**
	 * Get a dependency.
	 * @param {string} name
	 * @returns {Promise<any>}
	 */
	async get(name) {
		if (!this.#dependencies.has(name)) {
			throw new Error(`Dependency "${name}" not registered.`);
		}

		if (!this.#singletons.has(name)) {
			this.#singletons.set(name, await this.#dependencies.get(name)());
		}

		return this.#singletons.get(name);
	}

	/**
	 * Use multiple dependencies.
	 * @param {string[]} names
	 * @returns {Promise<Record<string, any>>}
	 */
	async use(...names) {
		if (names.length === 0) {
			names = [...this.#dependencies.keys()];
		}

		const dependencies = new Map();
		await Promise.all(names.map(async name => {
			dependencies.set(name, await this.get(name));
		}));

		return Object.fromEntries(dependencies);
	}
}
