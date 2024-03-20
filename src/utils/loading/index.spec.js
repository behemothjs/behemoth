import test from 'ava';
import {loading} from './index.js';

test('loading', t => {
	loading.start('loading1');
	loading.start('loading2');
	loading.start('loading3');
	t.true(loading.check('loading1'));
	t.true(loading.check('loading2'));
	t.true(loading.check('loading3'));
	loading.end('loading1');
	t.false(loading.check('loading1'));
	t.true(loading.check('loading2'));
	t.true(loading.check('loading3'));
	loading.end('loading2');
	t.false(loading.check('loading1'));
	t.false(loading.check('loading2'));
	t.true(loading.check('loading3'));
	loading.end('loading3');
	t.false(loading.check('loading1'));
	t.false(loading.check('loading2'));
	t.false(loading.check('loading3'));
	//
	loading.start('loading1');
	loading.start('loading2');
	loading.start('loading3');
	t.true(loading.activeNames.includes('loading1'));
	t.true(loading.activeNames.includes('loading2'));
	t.true(loading.activeNames.includes('loading3'));
	//
	loading.destory();
	t.false(loading.check('loading1'));
	t.false(loading.check('loading2'));
	t.false(loading.check('loading3'));
	//
	loading.start('loading1');
	loading.start('loading1');
	loading.start('loading1');
	t.true(loading.activeNames.length === 1);
});
