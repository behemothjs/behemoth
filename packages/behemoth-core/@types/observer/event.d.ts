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
//# sourceMappingURL=event.d.ts.map