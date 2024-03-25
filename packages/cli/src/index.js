import path from 'node:path';
import fs from 'node:fs/promises';
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

export async function main() {
	try {
		const option = new CommandOption();
		const {cliPath, action} = option;
		let _action = action.replaceAll('-', '');
		const actions = await fs.readdir(`${cliPath}/src/commands`);

		if (action === 'v') {
			_action = 'version';
		}

		if (action === 'h' || !actions.includes(_action)) {
			_action = 'help';
		}

		console.info(`${_action}:`);
		const command = await import(`${cliPath}/src/commands/${_action}/index.js`);
		await command.run(option);
	} catch (error) {
		console.error(error);
	}
}
