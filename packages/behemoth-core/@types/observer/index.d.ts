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
export const observer: ObserverClass;
import { ObserverClass } from './observer.js';
//# sourceMappingURL=index.d.ts.map