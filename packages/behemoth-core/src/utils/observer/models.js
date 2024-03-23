import {Schema} from '../schema/index.js';
import * as utils from './utils.js';

const schema = new Schema();

/**
 * 送信イベント
 */
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

/**
 * イベントの購読モデル
 */
export class Subscription {
	/**
	 * @private
	 * @type {import('./index.js').Observer}
	 */
	#observer;

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
	 * @param {import('./index.js').Observer} observer
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
		this.#observer.removeListener(hash);
	}
}
