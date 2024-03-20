import process from 'node:process';
import {Observer} from '../observer/index.js';

const {LOG_LEVEL = 'INFO'} = process.env;

/**
 * @enum {'LOG'|'INFO'|'WARN'|'ERROR'|'SILENT'} LogLevel
 */
export const LogLevel = {
	LOG: 'LOG',
	INFO: 'INFO',
	WARN: 'WARN',
	ERROR: 'ERROR',
	SILENT: 'SILENT',
};

export const LogLevelMapToNumber = {
	LOG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	SILENT: 4,
};

export class LogClass {
	#config = {
		logLevel: LOG_LEVEL,
	};

	get config() {
		return this.#config;
	}

	constructor() {
		this.configure();
	}

	/**
	 * ### 動作設定
	 * @param {Object} config
	 * @param {LogLevel} config.logLevel
	 */
	configure(config = {}) {
		Object.assign(this.#config, config);
	}

	/**
	 * ### ログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	log(message) {
		Observer.notify('LOG', 'LOG', message);
	}

	/**
	 * ### デバッグログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	info(message) {
		Observer.notify('LOG', 'INFO', message);
	}

	/**
	 * ### 警告ログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	warn(message) {
		Observer.notify('LOG', 'WARN', message);
	}

	/**
	 * ### エラーログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	error(message) {
		Observer.notify('LOG', 'ERROR', message);
	}
}
