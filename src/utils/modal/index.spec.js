import test from 'ava';
import {modal} from './index.js';

test('modal', t => {
	modal.open('modal1');
	t.true(modal.check('modal1'));
	modal.open('modal2');
	t.false(modal.check('modal1'));
	t.true(modal.check('modal2'));
	modal.close();
	t.false(modal.check('modal1'));
	t.false(modal.check('modal2'));
	t.true(modal.activeName === null);
});
