import fs from 'node:fs/promises';
import * as prompts from '@inquirer/prompts';
import {execa} from 'execa';

/**
 * @param {import('../../types.js').CommandOption} option
 */
export async function run(option) {
	try {
		const answer = new Answer();
		await answer.getProjectName(option);
		await answer.getProjectType();
		const confirm = await answer.confirm();
		if (!confirm) {
			console.log('Aborted.');
		}

		const projectPath = `${option.cwd}/${answer.projectName}`;
		// await fs.mkdir(projectPath);
		await execa('git', ['clone', 'https://github.com/behemothjs/.github.git', projectPath]);

		// await execa(projectPath, ['npm', 'init', '-y']);
	} catch (error) {
		if (error.message.startsWith('User force closed')) {
			console.info('Aborted!');
			return;
		}

		throw error;
	}
}

class Answer {
	/** @type {string} */
	projectName;
	/** @type {string} */
	type;

	/**
	 * @param {import('../../types.js').CommandOption} option
	 */
	async getProjectName(option) {
		const {cwd} = option;
		const directoryNames = await fs
			.readdir(cwd, {withFileTypes: true})
			.then(dirents => dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));
		this.projectName = await prompts.input({
			message: 'Project Name',
			validate(value) {
				if (!value) {
					return 'Project name is required.';
				}

				if (directoryNames.includes(value)) {
					return 'Directory already exists.';
				}

				return true;
			},
		});
	}

	async getProjectType() {
		this.type = await prompts.select({
			message: 'Project Type',
			choices: [
				{
					name: 'API - Micro Service Framework',
					value: 'API',
				},
				{
					name: 'Web - Web Application Framework',
					value: 'Web',
				},
			],
		});
	}

	async confirm() {
		const isConfirm = await prompts.confirm({
			message: 'Create project?',
		});
		return isConfirm;
	}
}
