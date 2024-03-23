export class LoggerConfig {
    /**
     * @type {LogLevel}
     */
    logLevel: LogLevel;
}
/**
 * Logger
 */
export class Logger {
    static "__#3@#config": LoggerConfig;
    static get config(): LoggerConfig;
    /**
     * @type {Map<string, (logLevel: LogLevel, params: any[]) => void>}
     */
    static "__#3@#hook": Map<string, (logLevel: LogLevel, params: any[]) => void>;
    /**
     * show all hook names
     * @returns {string[]}
     */
    static get hooks(): string[];
    /**
     * @param {Partial<LoggerConfig>} config
     * @param {LogLevel} config.logLevel
     * @returns {LoggerConfig}
     */
    static configure(config?: Partial<LoggerConfig>): LoggerConfig;
    /**
     * Add hook
     * @param {string} name
     * @param {(logLevel: LogLevel, params: any[]) => void} hook
     */
    static addHook(name: string, hook: (logLevel: LogLevel, params: any[]) => void): void;
    /**
     * Remove hook
     * @param {string} name
     * @returns {void}
     */
    static removeHook(name: string): void;
    /**
     * Clear all hooks
     * @returns {void}
     */
    static clearHooks(): void;
    /**
     * All logs are passed through this method.
     * @param {LogLevel} LogLevel
     * @param {any[]} params
     * @returns {void}
     */
    static dispatchFooks(LogLevel: LogLevel, ...params: any[]): void;
    /**
     * Log Level Filter
     * @param {LogLevel} targetLogLevel
     * @param {LogLevel} [configLogLevel]
     * @returns {boolean}
     */
    static levelFilter(targetLogLevel: LogLevel, filterLogLevel?: LogLevel): boolean;
    configure: typeof Logger.configure;
    /**
     * @param {any} [message]
     * @param {any[]} optionalParams
     * @returns {void}
     */
    log(message?: any, ...optionalParams: any[]): void;
    /**
     * @param {any} tabularData
     * @param {readonly string[]} [properties]
     * @returns {void}
     */
    table(tabularData: any, properties?: readonly string[]): void;
    /**
     * @param {any} [message]
     * @param {any[]} optionalParams
     * @returns {void}
     */
    info(message?: any, ...optionalParams: any[]): void;
    /**
     * @param {any} [message]
     * @param {any[]} optionalParams
     * @returns {void}
     */
    warn(message?: any, ...optionalParams: any[]): void;
    /**
     * @param {any} [message]
     * @param {any[]} optionalParams
     * @returns {void}
     */
    error(message?: any, ...optionalParams: any[]): void;
}
/**
 * LogLevel
 */
type LogLevel = 'LOG' | 'INFO' | 'WARN' | 'ERROR' | 'SILENT';
declare namespace LogLevel {
    let LOG: string;
    let INFO: string;
    let WARN: string;
    let ERROR: string;
    let SILENT: string;
}
export {};
//# sourceMappingURL=index.d.ts.map