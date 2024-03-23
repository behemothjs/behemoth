import {Observer} from './utils/observer/index.js';
import {Logger} from './utils/logger/index.js';

export {Container} from './container/index.js';
export {Schema, SchemaConfig} from './utils/schema/index.js';
export {Logger, LoggerConfig} from './utils/logger/index.js';

export const observer = new Observer();

Logger.addHook('dispatchEvent', (logLevel, parameters) => {
	observer.notify('Logger', logLevel, parameters);
});
