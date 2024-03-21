import {Schema} from '../schema/index.js';
import * as utils from './utils.js';

const schema = new Schema();

export class ObserverEvent {
	/** @type {string} */
	id;
	/** @type {string} */
	channel;
	/** @type {string} */
	topic;
	/** @type {any} */
	payload;
	/** @type {string} UTC */
	createdAt;

	get hash() {
		const {channel, topic, id} = this;
		return utils.hash.encode(channel, topic, id);
	}

	/**
	 * @param {string} channel
	 * @param {string} topic
	 * @param {any} payload
	 */
	constructor(channel, topic, payload) {
		schema.assign(this, {channel, topic, payload});
		schema.autoId(this, 'id');
		schema.autoTimestamp(this, 'createdAt');
		Object.freeze(this);
	}
}
