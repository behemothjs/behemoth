
class LoadingClass {
	static store = new Map();

	get activeNames() {
		return LoadingClass.store.keys();
	}

	/**
	 * ### Start loading
	 * @param {string} name
	 * @returns {void}
	 */
	start(name) {
		LoadingClass.store.set(name, true);
	}

	/**
	 * ### End loading
	 * @param {string} name
	 * @returns {void}
	 */
	end(name) {
		LoadingClass.store.delete(name);
	}

	/**
	 * ### Check loading
	 * @param {string} name
	 * @returns {boolean}
	 */
	check(name) {
		return LoadingClass.store.has(name);
	}

	/**
	 * ### Destroy all loadings
	 * @returns {void}
	 */
	destory() {
		LoadingClass.store.clear();
	}
}

/**
 * ### Loading switcher
 */
export const loading = new LoadingClass();
