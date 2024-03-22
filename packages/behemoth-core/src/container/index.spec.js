import test from 'ava';
import {container} from './index.js';

class Schema {}
class Observer {}
class Log {}

container.register('Schema', () => Schema);
container.register('Observer', () => new Observer());
container.register('Log', () => new Log());

const {Schema: d1, Observer: d2, Log: d3} = container.use('Schema', 'Observer', 'Log');

class Behemoth {
	Schema = d1;
	Observer = d2;
	Log = d3;
}

test('Dependency injection', async t => {
	const behemoth = new Behemoth();
	t.is(behemoth.Schema, Schema);
	t.true(behemoth.Observer instanceof Observer);
	t.true(behemoth.Log instanceof Log);
	t.pass();
});
