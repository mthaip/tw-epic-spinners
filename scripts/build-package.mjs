import { copyFile, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

// Allowlist consumer metadata so new development settings never leak into npm.
const fields = [
  'name',
  'version',
  'description',
  'license',
  'author',
  'homepage',
  'repository',
  'bugs',
  'keywords',
  'type',
  'peerDependencies',
];
const manifest = Object.fromEntries(
  fields
    .filter((field) => pkg[field] !== undefined)
    .map((field) => [field, pkg[field]]),
);

Object.assign(manifest, {
  main: './index.cjs',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      import: './index.js',
      require: './index.cjs',
    },
  },
  sideEffects: false,
  files: [
    'index.js',
    'index.cjs',
    'index.umd.cjs',
    'index.d.ts',
    'README.md',
    'LICENSE',
    'llms.txt',
  ],
});

await writeFile(
  new URL('dist/package.json', root),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
await Promise.all(
  ['README.md', 'LICENSE', 'llms.txt'].map((file) =>
    copyFile(new URL(file, root), new URL(`dist/${file}`, root)),
  ),
);
