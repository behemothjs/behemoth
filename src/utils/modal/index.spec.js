import test from 'ava';
import {Modal} from './index.js';

test('Modal', t => {
	Modal.open('modal1');
	t.true(Modal.check('modal1'));
	Modal.open('modal2');
	t.false(Modal.check('modal1'));
	t.true(Modal.check('modal2'));
	Modal.close();
	t.false(Modal.check('modal1'));
	t.false(Modal.check('modal2'));
	t.true(Modal.activeName === null);
});
