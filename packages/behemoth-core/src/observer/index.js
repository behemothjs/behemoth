import {ObserverClass} from './observer.js';

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
 * }
 *
 * // Unsubscribe
 * subscription.remove();
 * ```
 */
export const observer = new ObserverClass();

observer.listen('Observer', 'RemoveListener', event => {
	const {payload: hash} = event;
	observer.removeListener(hash);
}, true);
