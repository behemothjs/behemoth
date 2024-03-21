import {Schema} from '../schema/index.js';
import * as utils from './utils.js';

/**
 * @typedef {import('./observer.js').ObserverClass} ObserverClass
 */

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
	chanel;

	/**
	 * @readonly
	 * @type {string}
	 */
	topic;

	/**
	 * @returns {string}
	 */
	get hash() {
		const {chanel, topic, id} = this;
		return utils.hash.encode(chanel, topic, id);
	}

	/**
	 * @private
	 * @type {ObserverClass}
	 */
	#observer;

	/**
	 * @param {ObserverClass} observer
	 * @param {string} [chanel='*']
	 * @param {string} [topic='*']
	 * @param {undefined | 'PROTECTED'} id
	 */
	constructor(observer, chanel = '*', topic = '*', id = undefined) {
		this.#observer = observer;
		schema.assign(this, {id, chanel, topic});
		schema.autoId(this, 'id');
		Object.freeze(this);
	}

	/**
	 * ## イベントの購読解除
	 * @returns {void}
	 */
	remove() {
		const {hash} = this;
		this.#observer.notify('Observer', 'RemoveListener', hash);
	}
}
