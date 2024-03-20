import {ObserverEvent} from './event.js';
import {Subscription} from './subscription.js';

export class ObserverClass {
	/** @type {Record<string, function>} */
	static listeners = {};
	/** @type {number} */
	static instanceCount = 0;

	constructor() {
		ObserverClass.instanceCount++;
		if (ObserverClass.instanceCount > 1) {
			throw new Error('Observer is a singleton class');
		}
	}

	get listeners() {
		return Object.keys(ObserverClass.listeners);
	}

	/**
	 * ## イベントの送信
	 * @param {string} channel `*`はワイルドカードとして使用できます。
	 * @param {string} topic `*`はワイルドカードとして使用できます。
	 * @param {any?} payload 送信データ
	 * @returns {void}
	 */
	notify(channel, topic, payload) {
		const event = new ObserverEvent(channel, topic, payload);
		for (const hash of Object.keys(ObserverClass.listeners)) {
			const [_channel, _topic] = hash.split(':');

			if (_channel !== '*' && _channel !== channel) {
				continue;
			}

			if (_topic !== '*' && _topic !== topic) {
				continue;
			}

			const listener = ObserverClass.listeners[hash];
			listener(event);
		}
	}

	/**
	 * ## イベントの購読
	 * @param {string} channel `*`はワイルドカードとして使用できます。
	 * @param {string} topic `*`はワイルドカードとして使用できます。
	 * @param {(event: ObserverEvent) => void} callback イベント受信時のコールバック
	 * @returns {Subscription}
	 */
	listen(channel, topic, callback) {
		const subscription = new Subscription(channel, topic);
		const {hash} = subscription;
		ObserverClass.listeners[hash] = callback;
		return subscription;
	}

	/**
	 * ## リスナーの一括削除
	 * @param {string} channel `*`はワイルドカードとして使用できます。
	 * @param {string} topic `*`はワイルドカードとして使用できます。
	 * @returns {void}
	 */
	removeListeners(channel, topic) {
		for (const hash of Object.keys(ObserverClass.listeners)) {
			const [_channel, _topic] = hash.split(':');
			if (channel !== '*' && _channel !== channel) {
				continue;
			}

			if (topic !== '*' && _topic !== topic) {
				continue;
			}

			delete ObserverClass.listeners[hash];
		}
	}
}
