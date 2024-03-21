export class ObserverClass {
    /** @type {Record<string, (event: ObserverEvent) => void>} */
    static listener: Record<string, (event: ObserverEvent) => void>;
    /**
     * @param {string} hash
     * @param {(event: ObserverEvent) => void} callback
     * @returns {void}
     */
    static addListener(hash: string, callback: (event: ObserverEvent) => void): void;
    /**
     * @param {string} hash
     * @returns {void}
     */
    static removeListener(hash: string): void;
    /**
     * @param {string} [channel='*']
     * @param {string} [topic='*']
     * @returns {string[]} hash[]
     */
    static searchListeners(channel?: string, topic?: string): string[];
    /**
     * ## List of listener hashes
     * @returns {string[]}
     */
    get listeners(): string[];
    /**
     * ## イベントの送信
     * @param {string} [channel='*']
     * @param {string} [topic='*']
     * @param {any} payload 送信データ
     * @returns {void}
     */
    notify(channel?: string, topic?: string, payload: any): void;
    /**
     * ## イベントの購読
     * @param {string} [channel='*']
     * @param {string} [topic='*']
     * @param {(event: ObserverEvent) => void} callback イベント受信時のコールバック
     * @param {boolean} [isProtected=false]
     * @returns {Subscription}
     */
    listen(channel?: string, topic?: string, callback: (event: ObserverEvent) => void, isProtected?: boolean): Subscription;
    /**
     * ## リスナーの削除
     * @param {string} hash
     * @returns {void}
     */
    removeListener(hash: string): void;
    /**
     * ## リスナーの一括削除
     * @param {string} [channel='*']
     * @param {string} [topic='*']
     * @returns {void}
     */
    removeListeners(channel?: string, topic?: string): void;
}
import { ObserverEvent } from './event.js';
import { Subscription } from './subscription.js';
//# sourceMappingURL=observer.d.ts.map