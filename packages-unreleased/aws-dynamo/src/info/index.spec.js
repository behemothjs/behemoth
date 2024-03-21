import test from 'ava';
import {listTables, listStreams} from './index.js';

console.log = () => {};

test('listTables', async t => {
	const tables = await listTables();
	for (const table of tables) {
		console.log(table);
	}

	t.pass();
});

test('listStreams', async t => {
	const streams = await listStreams();
	for (const stream of streams) {
		console.log(stream);
	}

	t.pass();
});
