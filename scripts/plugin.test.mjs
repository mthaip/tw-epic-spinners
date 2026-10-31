import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import test from 'node:test';
import { compile } from 'tailwindcss';
import * as library from '../dist/index.js';

const baseline = {
  flower: 8,
  pixel: 8,
  'hollow-dots': 3,
  'intersecting-circles': 7,
  orbit: 3,
  radar: 4,
  'scaling-squares': 4,
  'half-circle': 2,
  'trinity-rings': 3,
  'fulfilling-square': 1,
  'circles-to-rhombuses': 3,
  semipolar: 5,
  'self-building-square': 9,
  'swapping-squares': 4,
  'fulfilling-bouncing-circle': 2,
  fingerprint: 9,
  spring: 2,
  atom: 3,
  'looping-rhombuses': 3,
  'breeding-rhombus': 8,
};
const spinners = Object.entries(baseline).map(([name, count]) => ({
  name,
  count,
}));

const output = resolve('.output/verification');
const candidates = [
  ...spinners.map(({ name }) => `spinner-${name}`),
  'spinner-item',
  'spinner-size-16',
  'spinner-size-3.5',
  'spinner-size-[70px]',
  'md:spinner-size-24',
  'spinner-duration-1000',
  'spinner-duration-[2.5s]',
  'text-violet-500',
  'text-pink-500',
];

function fixtures(cssFile) {
  const cards = spinners
    .flatMap(({ name, count }) =>
      [...new Set([1, count, count + 5, 37])].map(
        (items) =>
          `<article><h2>${name} · ${items}</h2><div class="specimen spinner-${name} spinner-size-16 spinner-duration-[2.5s] text-violet-500" data-name="${name}" data-count="${items}">${Array.from({ length: items }, (_, i) => `<div class="spinner-item ${i === items - 1 ? 'text-pink-500' : ''}"></div>`).join('')}</div></article>`,
      ),
    )
    .join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>V2 ${cssFile} verification</title><link rel="stylesheet" href="${cssFile}"><style>body{font:12px system-ui;padding:20px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:28px}article{min-height:110px}h2{font-size:11px}.specimen,.specimen *,.specimen::before,.specimen::after,.specimen *::before,.specimen *::after{animation-play-state:paused!important}</style></head><body><h1>V2 · default, extended, single, and 37 items</h1><main>${cards}</main><script>requestAnimationFrame(()=>{for(const animation of document.getAnimations()){animation.pause();animation.currentTime=3375;}})</script></body></html>`;
}

function verifyCSS(css) {
  for (const { name } of spinners) {
    assert.ok(css.includes(`.spinner-${name}`), name);
  }
  assert.ok(css.includes('.spinner-item'), 'Shared item selector');
  assert.ok(
    !/\.spinner-[a-z-]+-item/.test(css),
    'No component-specific item classes',
  );
  assert.match(css, /sibling-count\(\)/);
  assert.match(css, /sibling-index\(\)/);
  assert.match(css, /spinner-size-3\\\.5/);
  assert.match(css, /spinner-size-\\\[70px\\\]/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /md\\:spinner-size-24/);
  assert.ok(!css.includes('[class^="spinner"]'));
  assert.ok(
    !/:nth-child\(\s*\d+\s*\)/.test(css),
    'No finite index selector tables; repeating roles are allowed',
  );
}

test('v2 exports only the plugin at runtime', () => {
  assert.deepEqual(Object.keys(library), ['default']);
  assert.equal(typeof library.default.handler, 'function');
  assert.equal(
    typeof createRequire(import.meta.url)('../dist/index.cjs').handler,
    'function',
  );
  assert.equal(spinners.length, 20);
});

test('compiles all v2 parts and utilities with Tailwind v4', async () => {
  const compiler = await compile(
    '@theme { --spacing: 0.25rem; --breakpoint-md: 48rem; --color-violet-500: #8b5cf6; --color-pink-500: #ec4899; } @plugin "tw-epic-spinners"; @tailwind utilities;',
    {
      loadModule: async () => ({
        base: process.cwd(),
        module: library.default,
      }),
    },
  );
  const css = compiler.build(candidates);
  verifyCSS(css);
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'tailwind4.css'), css);
  await writeFile(resolve(output, 'tailwind4.html'), fixtures('tailwind4.css'));
});

test('compiles the same public API with Tailwind v3', async () => {
  const requireV3 = createRequire(resolve('tests/tailwind3/package.json'));
  const tailwind = requireV3('tailwindcss');
  const postcss = requireV3('postcss');
  const result = await postcss([
    tailwind({
      content: [{ raw: candidates.join(' '), extension: 'html' }],
      plugins: [requireV3(resolve('dist/index.cjs'))],
    }),
  ]).process('@tailwind base; @tailwind components; @tailwind utilities;', {
    from: undefined,
  });
  verifyCSS(result.css);
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'tailwind3.css'), result.css);
  await writeFile(resolve(output, 'tailwind3.html'), fixtures('tailwind3.css'));
});

function utilityValue(css, name, property) {
  const postcss = createRequire(resolve('tests/tailwind3/package.json'))(
    'postcss',
  );
  const selector = `.${name.replace(/[^a-zA-Z0-9_-]/g, '\\$&')}`;
  let value;
  postcss.parse(css).walkRules((rule) => {
    if (rule.selector === selector)
      rule.walkDecls(property, (declaration) => {
        value = declaration.value.trim();
      });
  });
  return value;
}

test('v4 dimensions resolve open-ended numbers, CSS theme tokens and variable shorthand', async () => {
  const compiler = await compile(
    '@theme { --spacing: 0.5rem; --spacing-16: 6rem; --spacing-card: 7rem; } @plugin "tw-epic-spinners"; @tailwind utilities;',
    {
      loadModule: async () => ({
        base: process.cwd(),
        module: library.default,
      }),
    },
  );
  const css = compiler.build([
    'spinner-size-137',
    'spinner-size-3.25',
    'spinner-size-16',
    'spinner-size-card',
    'spinner-size-(--custom-size)',
    'spinner-size-[70px]',
    'spinner-duration-2345',
    'spinner-duration-0',
    'spinner-duration-(--custom-duration)',
    'spinner-duration-[2.5s]',
    'spinner-duration-1.5',
    'spinner-size-1.333',
    '-spinner-size-4',
    '-spinner-duration-100',
  ]);
  assert.equal(
    utilityValue(css, 'spinner-size-137', '--spinner-size'),
    'calc(var(--spacing) * 137)',
  );
  assert.equal(
    utilityValue(css, 'spinner-size-3.25', '--spinner-size'),
    'calc(var(--spacing) * 3.25)',
  );
  assert.equal(
    utilityValue(css, 'spinner-size-16', '--spinner-size'),
    'var(--spacing-16)',
  );
  assert.equal(
    utilityValue(css, 'spinner-size-card', '--spinner-size'),
    'var(--spacing-card)',
  );
  assert.equal(
    utilityValue(css, 'spinner-size-(--custom-size)', '--spinner-size'),
    'var(--custom-size)',
  );
  assert.equal(
    utilityValue(css, 'spinner-size-[70px]', '--spinner-size'),
    '70px',
  );
  assert.equal(
    utilityValue(css, 'spinner-duration-2345', '--spinner-duration'),
    '2345ms',
  );
  assert.equal(
    utilityValue(css, 'spinner-duration-0', '--spinner-duration'),
    '0ms',
  );
  assert.equal(
    utilityValue(
      css,
      'spinner-duration-(--custom-duration)',
      '--spinner-duration',
    ),
    'var(--custom-duration)',
  );
  assert.equal(
    utilityValue(css, 'spinner-duration-[2.5s]', '--spinner-duration'),
    '2.5s',
  );
  for (const name of [
    'spinner-duration-1.5',
    'spinner-size-1.333',
    '-spinner-size-4',
    '-spinner-duration-100',
  ]) {
    assert.equal(
      utilityValue(
        css,
        name,
        name.includes('duration') ? '--spinner-duration' : '--spinner-size',
      ),
      undefined,
    );
  }
  assert.match(css, /--spacing: 0\.5rem/, 'Referenced base spacing is emitted');
});

test('v3 dimensions respect replaced theme scales without restoring defaults', async () => {
  const requireV3 = createRequire(resolve('tests/tailwind3/package.json'));
  const result = await requireV3('postcss')([
    requireV3('tailwindcss')({
      content: [
        {
          raw: 'spinner-size-16 spinner-size-giant spinner-size-4 spinner-duration-slow spinner-duration-1000 spinner-size-[71px] spinner-duration-[2.5s]',
          extension: 'html',
        },
      ],
      theme: {
        spacing: { 16: '5rem', giant: '40rem' },
        transitionDuration: { slow: '3s' },
      },
      plugins: [requireV3(resolve('dist/index.cjs'))],
    }),
  ]).process('@tailwind utilities;', { from: undefined });
  assert.equal(
    utilityValue(result.css, 'spinner-size-16', '--spinner-size'),
    '5rem',
  );
  assert.equal(
    utilityValue(result.css, 'spinner-size-giant', '--spinner-size'),
    '40rem',
  );
  assert.equal(
    utilityValue(result.css, 'spinner-size-4', '--spinner-size'),
    undefined,
  );
  assert.equal(
    utilityValue(result.css, 'spinner-duration-slow', '--spinner-duration'),
    '3s',
  );
  assert.equal(
    utilityValue(result.css, 'spinner-duration-1000', '--spinner-duration'),
    undefined,
  );
  assert.equal(
    utilityValue(result.css, 'spinner-size-[71px]', '--spinner-size'),
    '71px',
  );
  assert.equal(
    utilityValue(result.css, 'spinner-duration-[2.5s]', '--spinner-duration'),
    '2.5s',
  );
});

test('v4 spinner utility values match native size and duration utilities', async () => {
  const compiler = await compile(
    '@theme { --spacing: 0.5rem; --spacing-16: 6rem; --spacing-card: 7rem; --transition-duration-slow: 3s; --transition-duration-2345: 4s; --breakpoint-md: 48rem; } @plugin "tw-epic-spinners"; @tailwind utilities;',
    {
      loadModule: async () => ({
        base: process.cwd(),
        module: library.default,
      }),
    },
  );
  const sizes = [
    '0',
    '3.25',
    '16',
    '137',
    'card',
    'px',
    'auto',
    'full',
    'min',
    'max',
    'fit',
    'dvw',
    'dvh',
    'lvw',
    'lvh',
    'svw',
    'svh',
    '1/2',
    '[70px]',
    '(--custom-size)',
    '3.7',
    '01',
    '3.50',
    '1.5/2.5',
  ];
  const durations = [
    'slow',
    '0',
    '2345',
    'initial',
    '[2.5s]',
    '(--custom-duration)',
    '1.5',
    '01',
    '2345/2',
  ];
  const names = [
    ...sizes.flatMap((suffix) => [`size-${suffix}`, `spinner-size-${suffix}`]),
    ...durations.flatMap((suffix) => [
      `duration-${suffix}`,
      `spinner-duration-${suffix}`,
    ]),
    'md:size-137',
    'md:spinner-size-137',
    'md:duration-2345',
    'md:spinner-duration-2345',
  ];
  const css = compiler.build(names);
  for (const suffix of sizes) {
    assert.equal(
      utilityValue(css, `spinner-size-${suffix}`, '--spinner-size'),
      utilityValue(css, `size-${suffix}`, 'width'),
      `size-${suffix}`,
    );
  }
  for (const suffix of durations) {
    assert.equal(
      utilityValue(css, `spinner-duration-${suffix}`, '--spinner-duration'),
      utilityValue(css, `duration-${suffix}`, '--tw-duration'),
      `duration-${suffix}`,
    );
  }
  assert.equal(
    utilityValue(css, 'md:spinner-size-137', '--spinner-size'),
    utilityValue(css, 'md:size-137', 'width'),
  );
  assert.equal(
    utilityValue(css, 'md:spinner-duration-2345', '--spinner-duration'),
    utilityValue(css, 'md:duration-2345', '--tw-duration'),
  );
});

test('v4 inline theme values resolve exactly like native sizes and durations', async () => {
  const compiler = await compile(
    '@theme inline { --spacing: var(--unit); --spacing-card: var(--card); --transition-duration-slow: var(--slow); } @plugin "tw-epic-spinners"; @tailwind utilities;',
    {
      loadModule: async () => ({
        base: process.cwd(),
        module: library.default,
      }),
    },
  );
  const css = compiler.build([
    'size-16',
    'spinner-size-16',
    'size-card',
    'spinner-size-card',
    'duration-slow',
    'spinner-duration-slow',
  ]);
  assert.equal(
    utilityValue(css, 'spinner-duration-slow', '--spinner-duration'),
    utilityValue(css, 'duration-slow', '--tw-duration'),
  );
  for (const suffix of ['16', 'card']) {
    assert.equal(
      utilityValue(css, `spinner-size-${suffix}`, '--spinner-size'),
      utilityValue(css, `size-${suffix}`, 'width'),
    );
  }
});
