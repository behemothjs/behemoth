import test from 'ava';
import {Observer} from './index.js';

const observer = new Observer();

test('observer', t => {
	let data = null;
	const subscription = observer.listen('channel', 'topic', event => {
		const {payload} = event;
		data = payload;
	});
	t.is(data, null);
	// t.log(data);
	observer.notify('channel', 'topic', 'test');
	t.is(data, 'test');
	// t.log(data);
	observer.notify('channel', 'topic', 'test2');
	t.is(data, 'test2');
	// t.log(data);
	subscription.remove();
	observer.notify('channel', 'topic', 'test3');
	t.is(data, 'test2');
	// t.log(data);
});
