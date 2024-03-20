import test from 'ava';
import {Schema} from './index.js';

const schema = new Schema({
	idStrategy: () => String(Math.random()).slice(2),
	timestampStrategy: () => new Date().toLocaleString().replaceAll('/', '-'),
});

/**
 * @extends {Schema<TestSchema>}
 */
class TestSchema {
	/** @type {string} */
	id;
	/** @type {string} */
	name;
	/** @type {string} */
	description;

	/**
	 * @param {TestSchema} data
	 */
	constructor(data) {
		schema.assign(this, data);
		schema.autoId(this, 'id');
		schema.autoTimestamp(this, 'createdAt');
		schema.autoTimestamp(this, 'updatedAt');
	}
}

test('Schema', t => {
	const schema = new TestSchema({
		// id: '123',
		name: 'Madaka Heri',
	});
	t.log(schema);
	t.is(schema.name, 'Madaka Heri');
});
