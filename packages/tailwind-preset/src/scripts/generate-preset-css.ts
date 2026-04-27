import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { presetCss } from '../lib/preset.js';

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, '../preset.css');

await mkdir(dirname(target), { recursive: true });
await writeFile(target, presetCss(), 'utf8');
console.log(`Wrote ${target}`);
