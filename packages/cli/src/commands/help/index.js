import fs from 'node:fs/promises';

export const stub = `
+-------------------------+
|                         |
|  Behemoth CLI {VERSION} |
|                         |
+-------------------------+

Install:   npm install --global @behemothjs/cli
Uninstall: npm uninstall --global @behemothjs/cli

Commands:

- behemoth docs        Open Behemoth docs

- behemoth make        Make a new behemoth project

  options:

    --name     ProjectName
    --type     web | api
    --version  tag

- behemoth upgrade     Upgrade latest Behemoth CLI

- behemoth help        Show help

    alias:

      behemoth
      behemoth -h
      behemoth --help

- behemoth version     Show version

    alias:

      behemoth -v
`;

/**
 * @param {import('../../types.js').CommandOption} option
 */
export async function run(option) {
	const {version} = JSON.parse(await fs.readFile(`${option.cliPath}/package.json`, 'utf8'));
	const help = stub.replace('{VERSION}', `v${version.padEnd(8, ' ')}`);
	console.log(help);
}
