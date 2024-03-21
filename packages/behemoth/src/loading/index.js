
class LoadingClass {
	static store = {};

	get activeNames() {
		return Object.keys(LoadingClass.store);
	}

	/**
	 * ### Start loading
	 * @param {string} name
	 * @returns {void}
	 */
	start(name) {
		LoadingClass.store[name] = true;
	}

	/**
	 * ### End loading
	 * @param {string} name
	 * @returns {void}
	 */
	end(name) {
		delete LoadingClass.store[name];
	}

	/**
	 * ### Check loading
	 * @param {string} name
	 * @returns {boolean}
	 */
	check(name) {
		return LoadingClass.store[name] !== undefined;
	}

	/**
	 * ### Destroy all loadings
	 * @returns {void}
	 */
	destory() {
		LoadingClass.store = {};
	}
}

/**
 * ### Loading switcher
 */
export const loading = new LoadingClass();
