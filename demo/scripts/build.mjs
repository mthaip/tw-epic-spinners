import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const demo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(demo, '..');

function run(command, args) {
  const result = spawnSync(command, args, { cwd: demo, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status ?? 1}`);
}

// Production always refreshes npm's latest tag, including on cached CI installs.
run(process.execPath, [resolve(root, 'scripts/build-readme.mjs')]);
// Yarn rewrites manifests during upgrades; keep the checked-in dependency/lockfile.
const manifests = ['package.json', 'yarn.lock'].map((name) => {
  const path = resolve(demo, name);
  return { path, content: readFileSync(path, 'utf8') };
});
try {
  run('yarn', ['upgrade', 'tw-epic-spinners', '--latest']);
} finally {
  for (const { path, content } of manifests) writeFileSync(path, content);
}

const project = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const installed = JSON.parse(readFileSync(resolve(demo, 'node_modules/tw-epic-spinners/package.json'), 'utf8'));
if (installed.version.split('.')[0] !== project.version.split('.')[0]) {
  throw new Error(`npm latest is tw-epic-spinners@${installed.version}, but these docs require v${project.version.split('.')[0]}. Publish that major version to npm's latest tag before deploying.`);
}
console.log(`Building demo with tw-epic-spinners@${installed.version} from npm.`);
run('yarn', ['build']);
