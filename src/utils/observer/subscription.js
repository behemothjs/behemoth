import {Schema} from '../schema/index.js';
import {ObserverClass} from './observer.js';

const schema = new Schema();

export class Subscription {
	/**
	 * @readonly
	 * @type {string}
	 */
	id;
	/**
	 * @readonly
	 * @type {string}
	 */
	chanel = '*';
	/**
	 * @readonly
	 * @type {string}
	 */
	topic = '*';
	/**
	 * @returns {string}
	 */
	get hash() {
		const {chanel, topic, id} = this;
		return [chanel, topic, id].join(':');
	}

	/**
	 * @param {string} chanel
	 * @param {string} topic
	 * @param {(event: ObserverEvent) => void} callback
	 */
	constructor(chanel, topic) {
		schema.assign(this, {chanel, topic});
		schema.autoId(this, 'id');
		Object.freeze(this);
	}

	/**
	 * ## イベントの購読解除
	 * @returns {void}
	 */
	remove() {
		const {hash} = this;
		delete ObserverClass.listeners[hash];
	}
}
