import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import plugin from '../dist/index.js';

const components = {};
const keyframes = {};
plugin.handler({
  matchUtilities() {},
  theme(path) {
    return path.startsWith('--') ? undefined : {};
  },
  addComponents(rules) {
    Object.assign(components, rules);
  },
  addBase(rules) {
    Object.assign(keyframes, rules);
  },
});

test('preserves the original keyframes where the v2 markup does not require adaptation', async () => {
  const original = JSON.parse(
    await readFile(
      new URL('../tests/fixtures/v1-motion.json', import.meta.url),
    ),
  );
  for (const [name, frames] of Object.entries(original.frames)) {
    // Movement compensation is 1 at the baseline count and keeps the travel
    // distance stable when extra parts make individual shapes smaller.
    const baseline = JSON.parse(
      JSON.stringify(keyframes[name]).replace(
        /calc\((-?\d+%) \* var\(--(?:movement|travel)-scale\)\)/g,
        '$1',
      ),
    );
    assert.equal(
      JSON.stringify(baseline),
      JSON.stringify(frames),
      `${name}: declaration order`,
    );
  }
});

test('orbit retains its three tilts, border sides, original delay, and repeating roles', () => {
  const root = components['.spinner-orbit'];
  const item = root['& > :where(.spinner-item)'];
  assert.equal(root.perspective, '800px');
  assert.equal(
    item.animationDelay,
    undefined,
    'No shared stagger changes the baseline',
  );
  assert.equal(
    item['&:where(:nth-child(3n+1))'].borderBottom,
    'var(--borderWidth) solid currentColor',
  );
  assert.equal(
    item['&:where(:nth-child(3n+2))'].borderRight,
    'var(--borderWidth) solid currentColor',
  );
  assert.equal(
    item['&:where(:nth-child(3n))'].borderTop,
    'var(--borderWidth) solid currentColor',
  );
  assert.match(
    item['&:where(:nth-child(3n))'].animation,
    /1200ms linear infinite/,
  );
  assert.ok(
    item['&:where(:nth-child(n+4))'],
    'Extra items have a phase without a maximum count',
  );
});

test('shared defaults do not impose component geometry or timing', () => {
  assert.equal(
    components['.spinner-item'],
    undefined,
    'Item styles are scoped to their container',
  );
  for (const [name, root] of Object.entries(components)) {
    assert.equal(root['--spinner-radius'], undefined, name);
    assert.equal(root['--spinner-stroke'], undefined, name);
    const item = root['& > :where(.spinner-item)'];
    assert.equal(item['--spinner-count'], 'sibling-count()', name);
    assert.equal(item['--spinner-index'], 'calc(sibling-index() - 1)', name);
    assert.equal(item['--spinner-angle'], undefined, name);
    assert.equal(item['--spinner-phase'], undefined, name);
  }
});
