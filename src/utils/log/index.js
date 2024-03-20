import {observer} from '../observer/index.js';
import {LogLevelMapToNumber, LogClass} from './log.js';

export const log = new LogClass();

observer.listen('LOG', '*', event => {
	const {topic: eventLogLevel, payload} = event;
	const {logLevel} = log.config;
	const level = LogLevelMapToNumber[logLevel];
	if (level > LogLevelMapToNumber[eventLogLevel]) {
		return;
	}

	console.log(payload);
});
