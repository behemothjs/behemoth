import test from 'ava';
import {Observer} from './index.js';

test('Observer', t => {
	let data = null;
	const subscription = Observer.listen('channel', 'topic', event => {
		const {payload} = event;
		data = payload;
	});
	t.is(data, null);
	t.log(data);
	Observer.notify('channel', 'topic', 'test');
	t.is(data, 'test');
	t.log(data);
	Observer.notify('channel', 'topic', 'test2');
	t.is(data, 'test2');
	t.log(data);
	subscription.remove();
	Observer.notify('channel', 'topic', 'test3');
	t.is(data, 'test2');
	t.log(data);
});
