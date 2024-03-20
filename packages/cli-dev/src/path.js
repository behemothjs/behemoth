import path from 'node:path';
import process from 'node:process';

export const srcPath = path.dirname(new URL(import.meta.url).pathname);
export const cliPath = path.join(srcPath, '..');
export const projectPath = process.cwd();
