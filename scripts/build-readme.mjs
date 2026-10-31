import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const docsUrl = pkg.homepage;
const source = resolve(root, 'demo/content/documentation.md');
const target = resolve(root, 'README.md');
const llmsSource = resolve(root, 'llms.txt');

const header = `<!-- This file is generated from demo/content/documentation.md by scripts/build-readme.mjs. Do not edit directly. -->
<!-- cSpell:words semipolar rhombuses mthaip -->

# tw-epic-spinners

> 20 pure-CSS loading spinners as a Tailwind CSS plugin. Works with Tailwind v3 and v4, and any framework.

Live previews & docs: [${new URL(docsUrl).hostname}](${docsUrl})

`;

const footer = `

## Credits

Spinner designs by [EpicMax / epic-spinners](https://github.com/epicmaxco/epic-spinners). This package re-implements them as a Tailwind plugin.

## License

[MIT](./LICENSE)
`;

const body = readFileSync(source, 'utf8').trimEnd();
writeFileSync(target, header + body + footer);
console.log(`README.md generated from ${source}`);

const llmsTarget = resolve(root, 'demo/public/llms.txt');
writeFileSync(llmsTarget, readFileSync(llmsSource, 'utf8'));
console.log(`llms.txt copied to ${llmsTarget}`);
