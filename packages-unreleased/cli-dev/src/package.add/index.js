/* eslint-disable unicorn/no-process-exit */

import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';
import _ from 'lodash';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function run(projectPath, options) {
	const [name] = options;
	const nameKebabCase = _.kebabCase(name);
	const outputPath = path.join(projectPath, 'packages-unreleased', nameKebabCase);
	const stubPath = path.join(__dirname, 'stubs');

	try {
		await fs.mkdir(outputPath);
		await fs.mkdir(`${outputPath}/src`);
	} catch (error) {
		console.error(error.message, '\n');
		process.exit(1);
	}

	let packageJson = await fs.readFile(`${stubPath}/package.json`, 'utf8');
	packageJson = packageJson.replaceAll('NAME_KEBAB_CASE', nameKebabCase);

	let readme = await fs.readFile(`${stubPath}/README.md`, 'utf8');
	readme = readme.replaceAll('NAME_KEBAB_CASE', nameKebabCase);

	await Promise.all([
		fs.writeFile(`${outputPath}/package.json`, packageJson),
		fs.writeFile(`${outputPath}/README.md`, readme),
		fs.writeFile(`${outputPath}/src/index.js`, ''),
		fs.copyFile(`${stubPath}/.gitignore`, `${outputPath}/.gitignore`),
		fs.copyFile(`${stubPath}/.npmignore`, `${outputPath}/.npmignore`),
		fs.copyFile(`${stubPath}/LICENSE`, `${outputPath}/LICENSE`),
		fs.copyFile(`${stubPath}/tsconfig.json`, `${outputPath}/tsconfig.json`),
		fs.copyFile(`${stubPath}/tsconfig.json`, `${outputPath}/tsconfig.json`),
	]);

	console.info('\n', `✅ Create Successfully: ./packages-unreleased/${nameKebabCase}`, '\n');
}
