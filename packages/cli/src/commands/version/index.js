import fs from 'node:fs/promises';

/**
 * @param {import('../../types.js').CommandOption} option
 */
export async function run(option) {
	const {version} = JSON.parse(await fs.readFile(`${option.cliPath}/package.json`, 'utf8'));
	console.log(`v${version}`);
}
