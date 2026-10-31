import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

test('npm tarball contains only release files and resolves both module formats', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'spinner-package-'));
  try {
    const [packed] = JSON.parse(
      execFileSync(
        'npm',
        [
          'pack',
          './dist',
          '--ignore-scripts',
          '--json',
          '--pack-destination',
          directory,
        ],
        { cwd: resolve('.'), encoding: 'utf8' },
      ),
    );
    assert.deepEqual(
      packed.files.map(({ path }) => path).sort(),
      [
        'LICENSE',
        'README.md',
        'index.cjs',
        'index.d.ts',
        'index.js',
        'index.umd.cjs',
        'llms.txt',
        'package.json',
      ].sort(),
    );
    execFileSync('tar', [
      '-xzf',
      join(directory, packed.filename),
      '-C',
      directory,
    ]);
    const manifest = JSON.parse(
      await readFile(join(directory, 'package/package.json'), 'utf8'),
    );
    assert.deepEqual(
      Object.keys(manifest).sort(),
      [
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
        'main',
        'types',
        'exports',
        'sideEffects',
        'files',
      ].sort(),
    );
    assert.equal(manifest.peerDependencies.tailwindcss, '^3.0.0 || ^4.0.0');
    assert.equal(manifest.sideEffects, false);
    // Self-reference exercises package exports rather than importing bundle paths.
    const require = createRequire(join(directory, 'package/consumer.cjs'));
    assert.equal(typeof require(manifest.name).handler, 'function');
    await readFile(join(directory, 'package', manifest.exports['.'].types));
    await writeFile(
      join(directory, 'package/consumer.mjs'),
      `import plugin from '${manifest.name}'; export default plugin;`,
    );
    const esm = await import(
      pathToFileURL(join(directory, 'package/consumer.mjs'))
    );
    assert.equal(typeof esm.default.handler, 'function');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
