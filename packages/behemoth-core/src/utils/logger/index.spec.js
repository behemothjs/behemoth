/* eslint-disable unicorn/prevent-abbreviations */

import test from 'ava';
import {Logger} from './index.js';

test('Log', t => {
	const logs = [];
	Logger.addHook('console.log', (level, params) => {
		console.log(...params);
	});
	Logger.removeHook('console.log');
	Logger.clearHooks();
	//
	Logger.addHook('test', (level, params) => {
		if (Logger.levelFilter(level, 'WARN')) {
			logs.push(...params);
		}
	});
	//
	const logger = new Logger();
	logger.configure({logLevel: 'SILENT'});
	//
	logger.log('LOG');
	logger.info('INFO');
	logger.warn('WARN');
	logger.error('ERROR');
	//
	t.deepEqual(logs, ['WARN', 'ERROR']);
});
