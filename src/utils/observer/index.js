import {ObserverClass} from './observer.js';

/**
 * ## イベント処理モジュール
 *
 * ### イベントの送信
 * @example
 * ```javascript
 * Observer.notify({type: 'EventType', data: {}});
 * ```
 *
 * ### イベントの購読 / 購読解除
 * @example
 * ```javascript
 * // 購読
 * const subscription = Observer.listen('EventType', (event) => {
 * 	console.log(event);
 * }
 * // 購読解除
 * subscription.remove();
 * ```
 */
export const observer = new ObserverClass();

observer.listen('OBSERVER', 'REMOVE_LISTENER', event => {
	const {payload} = event;
	const {hash} = payload;
	delete ObserverClass.listeners[hash];
});
