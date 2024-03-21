import test from 'ava';
import {log} from './index.js';

test('Log', t => {
	log.configure({logLevel: 'SILENT'});
	log.log('LOG');
	log.info('INFO');
	log.warn('WARN');
	log.error('ERROR');
	t.pass();
});
