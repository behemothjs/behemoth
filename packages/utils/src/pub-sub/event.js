
import crypto from 'node:crypto';

export class Event {
	/** @type {string} */
	id = crypto.randomUUID();
	/** @type {string} */
	type;
	/** @type {Record<string, any>} */
	data;
	/** @type {string} UTC */
	createdAt = new Date();

	/**
	 * @param {Partial<Event>} data
	 */
	constructor(type, data) {
		this.type = type;
		this.data = data;
	}
}
