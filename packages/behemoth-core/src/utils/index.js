import {Log} from './log/index.js';
import {observer} from './observer/index.js';

export const log = new Log(observer);
export * from './observer/index.js';
export * from './schema/index.js';
