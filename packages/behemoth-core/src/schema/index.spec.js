import test from 'ava';
import {Schema} from './index.js';

const schema = new Schema({
	// idStrategy: () => String(Math.random()).slice(2),
	// timestampStrategy: () => new Date().toLocaleString().replaceAll('/', '-'),
});

/**
 * @extends {Schema<SampleSchema>}
 */
class SampleSchema {
	/** @type {string} */
	id;
	/** @type {string} */
	name;
	/** @type {string} */
	description;

	/**
	 * @param {SampleSchema} data
	 */
	constructor(data) {
		schema.assign(this, data);
		schema.autoId(this, 'id');
		schema.autoTimestamp(this, 'createdAt');
		schema.autoTimestamp(this, 'updatedAt');
	}
}

test('Schema', t => {
	const schema = new SampleSchema({
		name: 'Behemoth',
		description: 'This is web tool kit.',
	});
	t.log(schema);
	t.is(schema.name, 'Behemoth');
	t.is(schema.description, 'This is web tool kit.');
	t.is(typeof schema.id, 'string');
	t.is(typeof schema.createdAt, 'string');
	t.is(typeof schema.updatedAt, 'string');
});
