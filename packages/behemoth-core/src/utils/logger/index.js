/* eslint-disable unicorn/prevent-abbreviations */

import process from 'node:process';

const {LOG_LEVEL = 'LOG'} = process.env;

/**
 * @enum {'LOG'|'INFO'|'WARN'|'ERROR'|'SILENT'} LogLevel
 */
const LogLevel = {
	LOG: 'LOG',
	INFO: 'INFO',
	WARN: 'WARN',
	ERROR: 'ERROR',
	SILENT: 'SILENT',
};

const LogLevelMapToNumber = {
	LOG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	SILENT: 4,
};

export class LoggerConfig {
	/**
	 * @type {LogLevel}
	 */
	logLevel = LOG_LEVEL;
}

/**
 * Logger
 */
export class Logger {
	static #config = new LoggerConfig();

	static get config() {
		return this.#config;
	}

	/**
	 * @type {Map<string, (logLevel: LogLevel, params: any[]) => void>}
	 */
	static #hook = new Map();

	/**
	 * show all hook names
	 * @returns {string[]}
	 */
	static get hooks() {
		return Logger.#hook.keys();
	}

	/**
	 * @param {Partial<LoggerConfig>} config
	 * @param {LogLevel} config.logLevel
	 * @returns {LoggerConfig}
	 */
	static configure(config = {}) {
		Object.assign(Logger.#config, config);
		return Logger.#config;
	}

	/**
	 * Add hook
	 * @param {string} name
	 * @param {(logLevel: LogLevel, params: any[]) => void} hook
	 */
	static addHook(name, hook) {
		if (Logger.#hook.has(name)) {
			throw new Error(`Hook "${name}" already exists.`);
		}

		Logger.#hook.set(name, hook);
	}

	/**
	 * Remove hook
	 * @param {string} name
	 * @returns {void}
	 */
	static removeHook(name) {
		Logger.#hook.delete(name);
	}

	/**
	 * Clear all hooks
	 * @returns {void}
	 */
	static clearHooks() {
		Logger.#hook.clear();
	}

	/**
	 * All logs are passed through this method.
	 * @param {LogLevel} LogLevel
	 * @param {any[]} params
	 * @returns {void}
	 */
	static dispatchFooks(LogLevel, ...params) {
		for (const hook of Logger.#hook.values()) {
			hook(LogLevel, params);
		}
	}

	/**
	 * Log Level Filter
	 * @param {LogLevel} targetLogLevel
	 * @param {LogLevel} [configLogLevel]
	 * @returns {boolean}
	 */
	static levelFilter(targetLogLevel, filterLogLevel = Logger.config.logLevel) {
		const configLevel = LogLevelMapToNumber[filterLogLevel];
		const targetLevel = LogLevelMapToNumber[targetLogLevel];
		return configLevel <= targetLevel;
	}

	configure = Logger.configure;

	/**
	 * @param {any} [message]
	 * @param {any[]} optionalParams
	 * @returns {void}
	 */
	log(message, ...optionalParams) {
		if (Logger.levelFilter(LogLevel.LOG)) {
			console.log(message, ...optionalParams);
		}

		Logger.dispatchFooks(LogLevel.LOG, message, ...optionalParams);
	}

	/**
	 * @param {any} tabularData
	 * @param {readonly string[]} [properties]
	 * @returns {void}
	 */
	table(tabularData, properties) {
		if (Logger.levelFilter(LogLevel.LOG)) {
			console.table(tabularData, properties);
		}

		Logger.dispatchFooks(LogLevel.LOG, tabularData, ...properties);
	}

	/**
	 * @param {any} [message]
	 * @param {any[]} optionalParams
	 * @returns {void}
	 */
	info(message, ...optionalParams) {
		if (Logger.levelFilter(LogLevel.INFO)) {
			console.info(message, ...optionalParams);
		}

		Logger.dispatchFooks(LogLevel.INFO, message, ...optionalParams);
	}

	/**
	 * @param {any} [message]
	 * @param {any[]} optionalParams
	 * @returns {void}
	 */
	warn(message, ...optionalParams) {
		if (Logger.levelFilter(LogLevel.WARN)) {
			console.warn(message, ...optionalParams);
		}

		Logger.dispatchFooks(LogLevel.WARN, message, ...optionalParams);
	}

	/**
	 * @param {any} [message]
	 * @param {any[]} optionalParams
	 * @returns {void}
	 */
	error(message, ...optionalParams) {
		if (Logger.levelFilter(LogLevel.ERROR)) {
			console.error(message, ...optionalParams);
		}

		Logger.dispatchFooks(LogLevel.ERROR, message, ...optionalParams);
	}
}
