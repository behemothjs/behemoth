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
export namespace LogLevelMapToNumber {
    let LOG_1: number;
    export { LOG_1 as LOG };
    let INFO_1: number;
    export { INFO_1 as INFO };
    let WARN_1: number;
    export { WARN_1 as WARN };
    let ERROR_1: number;
    export { ERROR_1 as ERROR };
    let SILENT_1: number;
    export { SILENT_1 as SILENT };
}
export class LogClass {
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
//# sourceMappingURL=log.d.ts.map