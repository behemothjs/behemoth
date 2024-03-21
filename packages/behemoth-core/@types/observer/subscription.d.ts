export class Subscription {
    /**
     * @param {ObserverClass} observer
     * @param {string} [chanel='*']
     * @param {string} [topic='*']
     * @param {undefined | 'PROTECTED'} id
     */
    constructor(observer: ObserverClass, chanel?: string, topic?: string, id?: undefined | 'PROTECTED');
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
export type ObserverClass = import('./observer.js').ObserverClass;
//# sourceMappingURL=subscription.d.ts.map