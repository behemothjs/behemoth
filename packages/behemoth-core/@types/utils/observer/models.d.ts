/**
 * 送信イベント
 */
export class ObserverEvent {
    /**
     * @param {string} channel
     * @param {string} topic
     * @param {any} payload
     */
    constructor(channel: string, topic: string, payload: any);
    /** @type {string} */
    id: string;
    /** @type {string} */
    channel: string;
    /** @type {string} */
    topic: string;
    /** @type {any} */
    payload: any;
    /** @type {string} UTC */
    createdAt: string;
    get hash(): string;
}
/**
 * イベントの購読モデル
 */
export class Subscription {
    /**
     * @param {import('./index.js').Observer} observer
     * @param {string} [chanel='*']
     * @param {string} [topic='*']
     * @param {undefined | 'PROTECTED'} id
     */
    constructor(observer: import('./index.js').Observer, chanel?: string, topic?: string, id?: undefined | 'PROTECTED');
    /**
     * @readonly
     * @type {string}
     */
    readonly id: string;
    /**
     * @readonly
     * @type {string}
     */
    readonly chanel: string;
    /**
     * @readonly
     * @type {string}
     */
    readonly topic: string;
    /**
     * @returns {string}
     */
    get hash(): string;
    /**
     * ## イベントの購読解除
     * @returns {void}
     */
    remove(): void;
    #private;
}
//# sourceMappingURL=models.d.ts.map