import process from 'node:process';

const {LOG_LEVEL = 'LOG'} = process.env;

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

const LogLevelMapToNumber = {
	LOG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	SILENT: 4,
};

export class Log {
	#observer;
	#config = {
		logLevel: LOG_LEVEL,
	};

	get config() {
		return this.#config;
	}

	constructor(observer) {
		this.configure();
		this.#observer = observer;
		this.#observer.listen('LOG', '*', event => {
			/** @type {{topic: LogLevel}} */
			const {topic: eventLogLevel, payload} = event;
			const {logLevel} = this.config;
			const level = LogLevelMapToNumber[logLevel];
			if (level > LogLevelMapToNumber[eventLogLevel]) {
				return;
			}
		
			switch (eventLogLevel) {
				case 'LOG': {
					console.log(payload);
					break;
				}

				case 'INFO': {
					console.info(payload);
					break;
				}

				case 'WARN': {
					console.warn(payload);
					break;
				}

				case 'ERROR': {
					console.error(payload);
					break;
				}
			}
		});
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
		this.#observer.notify('LOG', 'LOG', message);
	}

	/**
	 * ### デバッグログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	info(message) {
		this.#observer.notify('LOG', 'INFO', message);
	}

	/**
	 * ### 警告ログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	warn(message) {
		this.#observer.notify('LOG', 'WARN', message);
	}

	/**
	 * ### エラーログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	error(message) {
		this.#observer.notify('LOG', 'ERROR', message);
	}
}
