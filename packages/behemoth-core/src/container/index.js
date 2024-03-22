
export class Container {
	#dependencies = new Map();
	#singletons = new Map();

	/**
	 * Register a dependency.
	 * @param {string} name
	 * @param {function} factory
	 */
	register(name, factory) {
		this.#dependencies.set(name, factory);
	}

	/**
	 * Get a dependency.
	 * @param {string} name
	 * @returns {any}
	 */
	get(name) {
		if (!this.#dependencies.has(name)) {
			throw new Error(`Dependency "${name}" not registered.`);
		}

		if (!this.#singletons.has(name)) {
			this.#singletons.set(name, this.#dependencies.get(name)());
		}

		return this.#singletons.get(name);
	}

	/**
	 * Use multiple dependencies.
	 * @param {...string} names
	 * @returns {Record<string, any}
	 */
	use(...names) {
		const dependencies = new Map();
		for (const name of names) {
			dependencies.set(name, this.get(name));
		}
		return Object.fromEntries(dependencies);
	}
}

export const container = new Container();