/**
 * LogLevel
 */
export type LogLevel = 'LOG' | 'INFO' | 'WARN' | 'ERROR' | 'SILENT';
export namespace LogLevel {
    let LOG: string;
    let INFO: string;
    let WARN: string;
    let ERROR: string;
    let SILENT: string;
}
export class Log {
    constructor(observer: any);
    get config(): {
        logLevel: string;
    };
    /**
     * ### 動作設定
     * @param {Object} config
     * @param {LogLevel} config.logLevel
     */
    configure(config?: {
        logLevel: LogLevel;
    }): void;
    /**
     * ### ログ出力
     * @param {string} message
     * @returns {void}
     */
    log(message: string): void;
    /**
     * ### デバッグログ出力
     * @param {string} message
     * @returns {void}
     */
    info(message: string): void;
    /**
     * ### 警告ログ出力
     * @param {string} message
     * @returns {void}
     */
    warn(message: string): void;
    /**
     * ### エラーログ出力
     * @param {string} message
     * @returns {void}
     */
    error(message: string): void;
    #private;
}
//# sourceMappingURL=index.d.ts.map