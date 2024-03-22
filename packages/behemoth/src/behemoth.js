import process from 'node:process';
import {log, Schema, SchemaConfig} from '@behemothjs/behemoth-core';

const modules = [
	Schema, log,
];

const {
	LOG_LEVEL = 'LOG',
} = process.env;

class GlobalConfig {
	logLevel = LOG_LEVEL;
	schema = new SchemaConfig();
}

/**
 * ## Main application instance
 */
class Behemoth {
	#config = new GlobalConfig();

	constructor() {
		this.configure();
	}

	/**
	 * @param {Partial<GlobalConfig>} config
	 */
	configure(config = {}) {
		Object.assign(this.#config, config);
		const {logLevel, schema} = this.#config;
		log.configure({logLevel});
		Schema.configure(schema);
	}
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
export const behemoth = new Behemoth();
