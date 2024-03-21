import {ObserverEvent} from './event.js';
import {Subscription} from './subscription.js';
import * as utils from './utils.js';

export class ObserverClass {
	/** @type {Record<string, (event: ObserverEvent) => void>} */
	static listener = {};

	/**
	 * @param {string} hash
	 * @param {(event: ObserverEvent) => void} callback
	 * @returns {void}
	 */
	static addListener(hash, callback) {
		ObserverClass.listener[hash] = callback;
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

		delete ObserverClass.listener[hash];
	}

	/**
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @returns {string[]} hash[]
	 */
	static searchListeners(channel = '*', topic = '*') {
		return Object.keys(ObserverClass.listener)
			.filter(hash => utils.hash.filter(hash, channel, topic));
	}

	/**
	 * ## List of listener hashes
	 * @returns {string[]}
	 */
	get listeners() {
		return Object.keys(ObserverClass.listener);
	}

	/**
	 * ## イベントの送信
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @param {any} payload 送信データ
	 * @returns {void}
	 */
	notify(channel = '*', topic = '*', payload) {
		const event = new ObserverEvent(channel, topic, payload);
		const hashes = ObserverClass.searchListeners(channel, topic);
		for (const hash of hashes) {
			const callback = ObserverClass.listener[hash];
			if (!callback) {
				continue;
			}

			callback(event);
		}
	}

	/**
	 * ## イベントの購読
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @param {(event: ObserverEvent) => void} callback イベント受信時のコールバック
	 * @param {boolean} [isProtected=false]
	 * @returns {Subscription}
	 */
	listen(channel = '*', topic = '*', callback, isProtected = false) {
		const subscriptionId = isProtected ? 'PROTECTED' : undefined;
		const subscription = new Subscription(this, channel, topic, subscriptionId);
		const {hash} = subscription;
		ObserverClass.addListener(hash, callback);
		return subscription;
	}

	/**
	 * ## リスナーの削除
	 * @param {string} hash
	 * @returns {void}
	 */
	removeListener(hash) {
		ObserverClass.removeListener(hash);
	}

	/**
	 * ## リスナーの一括削除
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @returns {void}
	 */
	removeListeners(channel = '*', topic = '*') {
		const hashes = ObserverClass.searchListeners(channel, topic);
		for (const hash of hashes) {
			const [_channel, _topic, id] = utils.hash.decode(hash);
			if (id === 'PROTECTED') {
				continue;
			}

			ObserverClass.removeListener(hash);
		}
	}
}
