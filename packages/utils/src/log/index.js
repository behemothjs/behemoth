/**
 * @enum {'LOG'|'INFO'|'WARN'|'ERROR'|'SILENT'} LogLevel
 */
export const LogLevel = {
	LOG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	SILENT: 4,
};

class LogClass {
	config = {
		LOG_LEVEL: LogLevel.LOG,
	};

	constructor() {
		this.configure();
	}

	configure(config = {}) {
		Object.assign(this.config, config);
	}

	/**
	 * ### ログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	log(message) {
		const {LOG_LEVEL} = this.config;
		if (LogLevel[LOG_LEVEL] < LogLevel.LOG) {
			return;
		}

		console.log(message);
	}

	/**
	 * ### デバッグログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	info(message) {
		const {LOG_LEVEL} = this.config;
		if (LogLevel[LOG_LEVEL] < LogLevel.LOG) {
			return;
		}

		console.info(message);
	}

	/**
	 * ### 警告ログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	warn(message) {
		const {LOG_LEVEL} = this.config;
		if (LogLevel[LOG_LEVEL] < LogLevel.LOG) {
			return;
		}

		console.warn(message);
	}

	/**
	 * ### エラーログ出力
	 * @param {string} message
	 * @returns {void}
	 */
	error(message) {
		const {LOG_LEVEL} = this.config;
		if (LogLevel[LOG_LEVEL] < LogLevel.LOG) {
			return;
		}

		console.error(message);
	}
}

export const Log = new LogClass();
