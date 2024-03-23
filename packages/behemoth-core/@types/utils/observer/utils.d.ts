export const hash: Hash;
declare class Hash {
    /**
     * @param {string} [channel='*']
     * @param {string} [topic='*']
     * @param {string} id
     */
    encode(channel?: string, topic?: string, id: string): string;
    decode(hash: any): any;
    filter(targetHash: any, channel?: string, topic?: string): boolean;
}
export {};
//# sourceMappingURL=utils.d.ts.map