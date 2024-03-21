import test from 'ava';
import {log} from './index.js';

console.log = () => {};
console.info = () => {};
console.warn = () => {};
console.error = () => {};

test('Log', t => {
	log.configure({logLevel: 'WARN'});
	log.log('LOG');
	log.info('INFO');
	log.warn('WARN');
	log.error('ERROR');
	t.pass();
});
