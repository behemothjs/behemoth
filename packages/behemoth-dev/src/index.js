#!/usr/bin/env node

import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';
import _ from 'lodash';
import {showHelp} from './help.js';

const sourcePath = path.dirname(new URL(import.meta.url).pathname);
const cliPath = path.join(sourcePath, '..');
const projectPath = process.cwd();

const [_node, _cliFilePath, category, action, ...options] = process.argv;
const hash = [category, action].filter(Boolean).join('.');

switch (hash) {
	case 'package': {
		console.info('Please provide an action');
		const module = await import('./package/index.js');
		await module.run();
		break;
	}

	case 'package.add':
	case 'add.package': {
		const [name] = options;
		if (!name) {
			const module = await import('./package/index.js');
			await module.run();
		}

		const module = await import('./package.add/index.js');
		await module.run(projectPath, options);

		// Convert name to cebab-case
		// const nameKebabCase = _.kebabCase(name);

		// console.info('\n', `Creating package: ${nameKebabCase}...`, '\n');

		// const outputPath = path.join(projectPath, 'packages', nameKebabCase);
		// console.log({
		// 	outputPath,
		// });
		// Const packageJson = JSON.parse(await fs.readFile(`${stubDir}/package.json.stub`));
		// packageJson.name = nameKebabCase;
		break;
	}

	default: {
		const packageJson = JSON.parse(await fs.readFile(`${cliPath}/package.json`, 'utf8'));
		showHelp(packageJson);
		break;
	}
}
