import test from 'ava';
import {Log} from './index.js';

test('Log', t => {
	Log.configure({logLevel: 'WARN'});
	Log.log('LOG');
	Log.info('INFO');
	Log.warn('WARN');
	Log.error('ERROR');
	t.pass();
});
