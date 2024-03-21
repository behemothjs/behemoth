/* eslint-disable unicorn/no-process-exit */

import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';
import _ from 'lodash';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function run(projectPath, options) {
	const [name] = options;
	const nameKebabCase = _.kebabCase(name);

	let packageJson = await fs.readFile(`${__dirname}/stubs/package-json.stub`, 'utf8');
	packageJson = packageJson.replaceAll('NAME_KEBAB_CASE', nameKebabCase);

	const outputPath = path.join(projectPath, 'packages', nameKebabCase);

	try {
		await fs.mkdir(outputPath);
		await fs.mkdir(`${outputPath}/src`);
	} catch (error) {
		console.error(error.message, '\n');
		process.exit(1);
	}

	await Promise.all([
		fs.writeFile(`${outputPath}/package.json`, packageJson),
		fs.writeFile(`${outputPath}/src/index.js`, ''),
		fs.copyFile(`${projectPath}/tsconfig.json`, `${outputPath}/tsconfig.json`),
	]);

	console.info('\n', `✅ Create Successfully: ./packages/${nameKebabCase}`, '\n');
}
