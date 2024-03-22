import test from 'ava';
import {observer} from '../observer/index.js';
import {Log} from './index.js';

const log = new Log(observer);

test('Log', t => {
	log.configure({logLevel: 'SILENT'});
	log.log('LOG');
	log.info('INFO');
	log.warn('WARN');
	log.error('ERROR');
	t.pass();
});
