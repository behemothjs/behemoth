import {
	Schema,
	Logger,
	SchemaConfig,
	LoggerConfig,
	observer,
} from '@behemothjs/behemoth-core';
import * as ui from './ui/index.js';

export * from '@behemothjs/behemoth-core';
export * from './ui/index.js';

export const schema = new Schema();
export const logger = new Logger();

export class BehemothConfig {
	logger = new LoggerConfig();
	schema = new SchemaConfig();
}

/**
 * ## Main application instance
 */
class Behemoth {
	#config = new BehemothConfig();

	constructor() {
		this.configure();
	}

	/**
	 * @param {Partial<BehemothConfig>} config
	 */
	configure(config = {}) {
		Object.assign(this.#config, config);
		Schema.configure(this.#config.schema);
		Logger.configure(this.#config.logger);
	}

	notify = observer.notify;
	listen = observer.listen;

	log = logger.log;
	warn = logger.warn;
	error = logger.error;

	modal = ui.modal;
	loading = ui.loading;
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
