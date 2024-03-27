import {execa} from 'execa';

export async function run() {
	console.log('Upgrading Behemoth CLI...');
	await execa('npm', ['install', '--global', '@behemothjs/cli']);
	console.log('Upgrade complete!');
	console.log('Run `behemoth -v` to check the current version.');
}
