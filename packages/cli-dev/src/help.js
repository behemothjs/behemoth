
export const stub = `
+---------------------------------------+
|                                       |
|  Behemoth Dev CLI / version: {VERSION} |
|                                       |
+---------------------------------------+

Usage: dev <category> <action>

package add {name}      : Create a new package
`;

export function showHelp(packageJson) {
	const {version} = packageJson;
	const help = stub.replace('{VERSION}', version.padEnd(8, ' '));
	console.info(help);
}
