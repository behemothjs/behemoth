import {execa} from 'execa';

const url = 'https://github.com/behemothjs/behemoth/blob/main/packages/behemoth/README.md';

export async function run() {
	await execa('open-cli', [url]);
	console.log(`
Browser opened
URL: ${url}
`);
}
