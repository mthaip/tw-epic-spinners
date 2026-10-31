import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const options = new Set(process.argv.slice(2));
for (const option of options) {
  if (option !== '--install') throw new Error(`Unknown option: ${option}`);
}

function run(args) {
  const result = spawnSync('yarn', args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// The demo links the local package: build its CSS plugin before Nuxt loads it.
run(['npm:build']);
if (options.has('--install'))
  run(['--cwd', 'demo', 'install', '--frozen-lockfile']);
run(['--cwd', 'demo', 'build']);
