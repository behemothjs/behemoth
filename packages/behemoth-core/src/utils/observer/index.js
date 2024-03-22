import {ObserverEvent, Subscription} from './models.js';
import * as utils from './utils.js';

class Observer {
	/** @type {Record<string, (event: ObserverEvent) => void>} */
	static listener = {};

	/**
	 * @param {string} hash
	 * @param {(event: ObserverEvent) => void} callback
	 * @returns {void}
	 */
	static addListener(hash, callback) {
		Observer.listener[hash] = callback;
	}

	/**
	 * @param {string} hash
	 * @returns {void}
	 */
	static removeListener(hash) {
		const [_channel, _topic, id] = utils.hash.decode(hash);
		if (id === 'PROTECTED') {
			throw new Error('Protected listener cannot be removed.');
		}

		delete Observer.listener[hash];
	}

	/**
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @returns {string[]} hash[]
	 */
	static searchListeners(channel = '*', topic = '*') {
		return Object.keys(Observer.listener)
			.filter(hash => utils.hash.filter(hash, channel, topic));
	}

	/**
	 * ## List of listener hashes
	 * @returns {string[]}
	 */
	get listeners() {
		return Object.keys(Observer.listener);
	}

	/**
	 * ## イベントの送信
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @param {any} [payload] 送信データ
	 * @returns {void}
	 */
	notify(channel = '*', topic = '*', payload = null) {
		const event = new ObserverEvent(channel, topic, payload);
		const hashes = Observer.searchListeners(channel, topic);
		for (const hash of hashes) {
			const callback = Observer.listener[hash];
			if (!callback) {
				continue;
			}

			callback(event);
		}
	}

	/**
	 * ## イベントの購読
	 * @param {string} channel
	 * @param {string} topic
	 * @param {(event: ObserverEvent) => void} callback イベント受信時のコールバック
	 * @param {boolean} [isProtected=false]
	 * @returns {Subscription}
	 */
	listen(channel, topic, callback, isProtected = false) {
		const subscriptionId = isProtected ? 'PROTECTED' : undefined;
		const subscription = new Subscription(this, channel, topic, subscriptionId);
		const {hash} = subscription;
		Observer.addListener(hash, callback);
		return subscription;
	}

	/**
	 * ## リスナーの削除
	 * @param {string} hash
	 * @returns {void}
	 */
	removeListener(hash) {
		Observer.removeListener(hash);
	}

	/**
	 * ## リスナーの一括削除
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @returns {void}
	 */
	removeListeners(channel = '*', topic = '*') {
		const hashes = Observer.searchListeners(channel, topic);
		for (const hash of hashes) {
			const [_channel, _topic, id] = utils.hash.decode(hash);
			if (id === 'PROTECTED') {
				continue;
			}

			Observer.removeListener(hash);
		}
	}
}

/**
 * ## PubSub Module
 * @example
 * ```javascript
 * // Notify
 * Observer.notify(chanel, topic, payload);
 *
 * // Subscribe
 * const subscription = Observer.listen(chanel, topic, (event) => {
 * 	console.log(event);
 * });
 *
 * // Unsubscribe
 * subscription.remove();
 * ```
 */
export const observer = new Observer();
