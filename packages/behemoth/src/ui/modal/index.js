
class ModalClass {
	static name = null;

	get activeName() {
		return ModalClass.name;
	}

	/**
	 * ### Open modal view
	 * @param {string} name
	 * @returns {void}
	 */
	open(name) {
		ModalClass.name = name;
	}

	/**
	 * ### Close modal view
	 * @returns {void}
	 */
	close() {
		ModalClass.name = null;
	}

	/**
	 * ### Check active modal view
	 * @param {string} name
	 * @returns {boolean}
	 */
	check(name) {
		return ModalClass.name === name;
	}
}

/**
 * ## Modal view switcher
 * Prevents opening more than one modal view.
 */
export const modal = new ModalClass();
