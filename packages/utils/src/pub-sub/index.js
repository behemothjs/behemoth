import crypto from 'node:crypto';
import {Event} from './event.js';

class PubSubClass {
	/** @type {Record<string, function>} */
	static listeners = {};
	/** @type {number} */
	static instanceCount = 0;

	constructor() {
		PubSubClass.instanceCount++;
		if (PubSubClass.instanceCount > 1) {
			throw new Error('PubSub is a singleton class');
		}
	}

	/**
	 * ## イベントの送信
	 * @param {Event} event
	 * @returns {void}
	 */
	notify(event) {
		event = new Event(event);
		const {type} = event;
		for (const hash of Object.keys(PubSubClass.listeners)) {
			if (!hash.split('#')[0] === type) {
				continue;
			}

			const listener = PubSubClass.listeners[hash];
			listener(event);
		}
	}

	/**
	 * ## イベントの購読
	 * @param {string} eventType
	 * @param {(event: Event) => void} callback
	 * @returns {Subscription}
	 */
	listen(eventType, callback) {
		return new Subscription(eventType, callback);
	}

	removeListeners(eventType) {
		for (const hash of Object.keys(PubSubClass.listeners)) {
			if (eventType && !hash.split('#')[0] === eventType) {
				continue;
			}

			delete PubSubClass.listeners[hash];
		}
	}
}

class Subscription {
	/**
	 * @readonly
	 * @type {string}
	 */
	id;
	/**
	 * @readonly
	 * @type {string}
	 */
	eventType;
	/**
	 * @returns {string}
	 */
	get hash() {
		return `${this.eventType}#${this.id}`;
	}

	/**
	 * @param {string} eventType
	 * @param {(event: Event) => void} callback
	 */
	constructor(eventType, callback) {
		this.id = crypto.randomUUID();
		this.eventType = eventType;
		const {hash} = this;
		PubSubClass.listeners[hash] = callback;
		Object.freeze(this);
	}

	/**
	 * ## イベントの購読解除
	 * @returns {void}
	 */
	remove() {
		const {hash} = this;
		delete PubSubClass.listeners[hash];
	}
}

/**
 * ## イベント処理モジュール
 *
 * ### イベントの送信
 * @example
 * ```javascript
 * PubSub.notify({type: 'EventType', data: {}});
 * ```
 *
 * ### イベントの購読 / 購読解除
 * @example
 * ```javascript
 * // 購読
 * const subscription = PubSub.listen('EventType', (event) => {
 * 	console.log(event);
 * }
 * // 購読解除
 * subscription.remove();
 * ```
 */
export const PubSub = new PubSubClass();
