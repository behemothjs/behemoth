import test from 'ava';
import {Loading} from './index.js';

test('Loading', t => {
	Loading.start('loading1');
	Loading.start('loading2');
	Loading.start('loading3');
	t.true(Loading.check('loading1'));
	t.true(Loading.check('loading2'));
	t.true(Loading.check('loading3'));
	Loading.end('loading1');
	t.false(Loading.check('loading1'));
	t.true(Loading.check('loading2'));
	t.true(Loading.check('loading3'));
	Loading.end('loading2');
	t.false(Loading.check('loading1'));
	t.false(Loading.check('loading2'));
	t.true(Loading.check('loading3'));
	Loading.end('loading3');
	t.false(Loading.check('loading1'));
	t.false(Loading.check('loading2'));
	t.false(Loading.check('loading3'));
	//
	Loading.start('loading1');
	Loading.start('loading2');
	Loading.start('loading3');
	t.true(Loading.activeNames.includes('loading1'));
	t.true(Loading.activeNames.includes('loading2'));
	t.true(Loading.activeNames.includes('loading3'));
	//
	Loading.destory();
	t.false(Loading.check('loading1'));
	t.false(Loading.check('loading2'));
	t.false(Loading.check('loading3'));
	//
	Loading.start('loading1');
	Loading.start('loading1');
	Loading.start('loading1');
	t.true(Loading.activeNames.length === 1);
});
