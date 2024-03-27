import path from 'node:path';
import process from 'node:process';

export class CommandOption {
	constructor() {
		const [_node, _cliFilePath, action = 'help', ...options] = process.argv;
		const __dirname = path.dirname(new URL(import.meta.url).pathname);
		this.cwd = process.cwd();
		this.cliPath = path.resolve(__dirname, '..');
		this.action = action;
		this.options = options;
		Object.freeze(this);
	}
}
