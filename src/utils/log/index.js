import {Observer} from '../observer/index.js';
import {LogLevelMapToNumber, LogClass} from './log.js';

export const Log = new LogClass();

Observer.listen('LOG', '*', event => {
	const {topic: eventLogLevel, payload} = event;
	const {logLevel} = Log.config;
	const level = LogLevelMapToNumber[logLevel];
	if (level > LogLevelMapToNumber[eventLogLevel]) {
		return;
	}

	console.log(payload);
});
