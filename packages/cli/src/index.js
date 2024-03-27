import fs from 'node:fs/promises';
import {CommandOption} from './types.js';

export async function main() {
	try {
		const option = new CommandOption();
		const {cliPath, action} = option;
		let _action = action.replaceAll('-', '');
		const actions = await fs.readdir(`${cliPath}/src/commands`);

		if (action === '-v') {
			_action = 'version';
		}

		if (action === '-h' || action === '--help' || !actions.includes(_action)) {
			_action = 'help';
		}

		console.info(`${_action}:`);
		const command = await import(`${cliPath}/src/commands/${_action}/index.js`);
		await command.run(option);
	} catch (error) {
		console.error(error);
	}
}
