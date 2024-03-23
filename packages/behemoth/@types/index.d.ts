export * from "@behemothjs/behemoth-core";
export * from "./ui/index.js";
export const schema: Schema;
export const logger: Logger;
export class BehemothConfig {
    logger: LoggerConfig;
    schema: SchemaConfig;
}
/**
 * ## Main application instance
 * @example
 * ```javascript
 * import {behemoth as app} from '@behemothjs/behemoth';
 * import {config} from './config.js';
 *
 * app.configure(config);
 * ```
 */
export const behemoth: Behemoth;
import { Schema } from '@behemothjs/behemoth-core';
import { Logger } from '@behemothjs/behemoth-core';
import { LoggerConfig } from '@behemothjs/behemoth-core';
import { SchemaConfig } from '@behemothjs/behemoth-core';
/**
 * ## Main application instance
 */
declare class Behemoth {
    /**
     * @param {Partial<BehemothConfig>} config
     */
    configure(config?: Partial<BehemothConfig>): void;
    notify: (channel?: string, topic?: string, payload?: any) => void;
    listen: (channel: string, topic: string, callback: (event: import("../../behemoth-core/@types/utils/observer/models.js").ObserverEvent) => void, isProtected?: boolean) => import("../../behemoth-core/@types/utils/observer/models.js").Subscription;
    log: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    modal: {
        readonly activeName: any;
        open(name: string): void;
        close(): void;
        check(name: string): boolean;
    };
    loading: {
        readonly activeNames: string[];
        start(name: string): void;
        end(name: string): void;
        check(name: string): boolean;
        destory(): void;
    };
    #private;
}
//# sourceMappingURL=index.d.ts.map