# Project guidance

## Project overview

`tw-epic-spinners` v2 beta provides 20 composable pure-CSS loading spinners as a
framework-agnostic Tailwind CSS plugin supporting Tailwind v3 and v4. The root
package is published to npm; `demo/` is the single Nuxt 4 documentation and
playground app, deployed with SSR through Nitro's `netlify` preset. The `v1` Git branch preserves the old
implementation. There is no hostname routing or second demo app.

## Repository layout

- `src/index.ts`: public Tailwind plugin entry point and `Spinner` type. V2 has
  no `creator()` export. Keep the registry and spinner definitions private.
- `src/components/spinners/`: per-spinner styles and count-aware keyframes.
- `src/utils/builder.ts`: shared CSS variable references and `buildSpinnerAnimationName`.
- `src/components/base.ts`: the common root/item contract and reduced-motion rule.
- Spinner files retain named CSS and keyframe objects close to v1. Do not move
  their geometry, border rules or animation timing into generic helpers.
- `src/components/utilities/dimensions.ts`: size and duration registration. Match
  native v4 value syntax without numeric tables; v3 uses configured theme scales.
- `demo/app/`: Vue pages, components, spinner catalogue, theme handling, and CSS.
- `demo/content/documentation.md`: source for site docs and the generated root
  `README.md`, including the v1-to-v2 migration guide. Edit this source, not README.
- `scripts/build-readme.mjs`: generates README and copies root `llms.txt` into
  `demo/public/llms.txt`.
- `scripts/build-demo.mjs`: builds the linked plugin, optionally installs demo
  dependencies, and builds the Netlify SSR server plus public assets.
- `scripts/plugin.test.mjs`: API and Tailwind v3/v4 compatibility checks.
- `scripts/package.test.mjs`: checks the actual npm tarball, manifest, release
  files, type entry point, and ESM/CommonJS package resolution.
- `scripts/baseline.test.mjs` and `tests/fixtures/v1-motion.json`: pinned original
  motion definitions and component regressions.
- `tests/tailwind3/`: isolated compatibility compiler, preserving root dependency
  versions. Its `node_modules/` is not committed.
- `scripts/build-package.mjs`: generates the allowlisted npm manifest and copies
  the license and documentation into the standalone publish directory.
- `dist/`: generated, standalone npm package; do not edit manually.

## Development

Use Yarn Classic 1.22.22 and Node 24.16.0, as declared by `packageManager` and
`.nvmrc`. Run from the repository root:

- `yarn npm:build:readme`: regenerate README and the demo copy of `llms.txt`.
- `yarn npm:build`: regenerate documentation and build the library with Vite,
  including type declarations and the standalone npm manifest.
- `yarn npm:pack`: build and create the release tarball from `dist/`.
- `yarn npm:publish --tag beta`: build and publish `dist/` with the beta tag.
  The repository root is private; publish only the generated package. Never
  copy root scripts, devDependencies, or package-manager settings into it.
- `yarn lint`: lint the library source with the flat ESLint config.
- `yarn test`: build the package, install the isolated Tailwind v3 compiler from
  its lockfile, and run the Node compatibility tests. Browser fixtures are written
  to `.output/verification/` for visual and computed-style checks.
- `yarn demo:dev`: build the linked plugin and start Nuxt on port `3001`.
- `http://localhost:3001/#lab`: the home-page lab in `demo/app/components/Lab.vue`.
  Its client-only Monaco editor (`LabEditor.client.vue`) provides HTML/CSS tabs,
  Prettier formatting, and a sandboxed live preview. Keep Monaco and its workers
  out of SSR; Vite bundles the editor/HTML/CSS workers locally. The home page shows the gallery first, then the lab;
  there are no standalone `/lab` or `/playground` routes.
- `yarn demo:build --install`: build the plugin, install demo dependencies from
  its lockfile, and build the Netlify SSR app.
- `yarn demo:build`: build the plugin and SSR app with dependencies installed.

Run from `demo/`:

- `yarn dev`: start Nuxt on port `3001`; build the root plugin first.
- `yarn build`: build the production Netlify SSR app.
- `yarn generate`: optional static export; not used for deployment.
- `yarn preview`: Nuxt preview for compatible builds; use Netlify Dev for the
  Netlify preset.
- `yarn postinstall`: regenerate Nuxt types and configuration.
- `yarn exec eslint .`: lint the demo after Nuxt preparation.

The demo uses `link:..` to exercise the actual local v2 package. Build the root
package before starting or generating the demo. The combined build command does
this automatically. Building a beta does not publish it to npm.

## Demo architecture and pitfalls

- **App layout**: Nuxt uses `demo/app/` for pages, components, and layouts.
  Theme helpers live in singular `demo/app/composable/`.
- **Styling**: `demo/app/assets/css/main.css` loads Tailwind v4 through
  `@tailwindcss/vite`, plus the spinner plugin, Iconify, typography, and DaisyUI.
  Keep its `@source inline(...)` declarations: dynamic component names
  and lab colors must be included in the production CSS. Do not add numeric size
  or duration safelists: the lab worker compiles these utilities as needed.
- **Lab utilities**: `useLabUtilities.ts` sends size/duration classes to
  `workers/spinner-utilities.ts`, which runs the real local plugin and Tailwind v4.
  Keep compilation off the main thread and do not duplicate value resolution in UI code.
- **Catalogue and markup**: `demo/app/data/spinners.ts` supplies names without
  `spinner-` and baseline item counts. `SpinnerPreview.vue` renders ordinary Vue
  markup. The HTML modal serializes the rendered parts; no package HTML helper.
- **Content**: Nuxt Content sources `demo/content/*.md`; `docs.vue` renders
  `documentation.md`. Keep `tokyo-night` highlighting consistent between
  `demo/nuxt.config.ts` and `demo/app/data/config.ts`.
- **Themes**: `demo/app/composable/useTheme.ts` wraps VueUse color mode with a
  Nuxt cookie. Add allowed themes to its `themes` map.
- **Metadata**: Nuxt's site URL and name come from the root plugin's `package.json`.
- **SSR deployment**: `ssr: true` with Nitro's `netlify` preset. `nuxt build`
  writes public assets to `demo/dist/` and the server to
  `demo/.netlify/functions-internal/server/` with the installed Nitro version.
  Pages, content queries, robots, and sitemap are served by the SSR handler.
- **Netlify**: Root `netlify.toml` uses `demo` as the base so Nitro's internal
  functions directory is discovered normally. Its command installs root build
  dependencies and runs `yarn demo:build` from the root; publish directory is
  `dist` relative to `demo`. Netlify Dev starts `yarn dev` on port 3001 and
  proxies through port 8888. There are no version selectors or hostname rewrites.
- **Generated config**: Configure TypeScript through `demo/nuxt.config.ts`, not
  the `demo/tsconfig.json` stub. Run Nuxt preparation after fresh installs so the
  generated `.nuxt/tsconfig.*.json` and ESLint config exist.

## V2 component contract

- Keep `builder.ts` limited to shared scalar variables and the shared
  `buildSpinnerAnimationName` naming helper. Put reusable CSS patterns
  in a small helper only when genuinely shared; keep component behavior local.

- Reuse each spinner's `SPINNER_*` constant for containers and animation names.
  All spinners share the `SPINNER_ITEM` constant (`spinner-item`) for direct children;
  never derive an item class from the spinner name.
- Preserve existing identifier names and coding conventions. Avoid stylistic
  renames or reordering unrelated to the requested architecture change.
- Preserve the baseline appearance and original keyframe stages, easing, border
  sides and 3D transforms. Test against the v1 reference, not just nonzero dimensions.
  Repeating `nth-child(an+b)` roles are allowed; finite child-count tables are not.
- Root: `spinner-<name>`. Each repeated direct child: `spinner-item`.
  Keep this naming and direct-child structure consistent across all 20 spinners.
- CSS uses `sibling-index()` and `sibling-count()` to derive geometry and phase.
  Do not introduce fixed child-count selector limits, manual index/count
  attributes, or a runtime JavaScript layout helper. Only matching items belong
  directly inside a spinner; unrelated or hidden siblings affect native counts.
- Baseline examples must retain at least the current v1 visual part counts.
  Flower/pixel expose their formerly shadow-generated parts; pseudo-element
  designs expose repeated items. Users may extend the supplied baselines.
- `spinner-size-*` is the overall square footprint, including row spinners.
  Use low-specificity part selectors, including `:where()` around role conditions,
  so Tailwind size/border/color utilities can customize parts.
  Preserve arbitrary, decimal, responsive, and class-order-independent utilities.
- Browser requirements are distinct from Tailwind compatibility: native sibling
  functions are Baseline Newly available since August 2026 (Chrome/Edge 138+,
  Safari 26.2+, Firefox 154+), not Widely available. Grid round/mod reached
  Newly available in May 2024. Do not claim older-browser compatibility without
  a verified fallback that covers both counting and grid math.

## Required verification

- For every change, review released documentation and update it when the API,
  markup, behavior, compatibility, installation, or examples are affected. Keep
  the migration guide accurate. Update `demo/content/documentation.md` and root
  `llms.txt` as applicable, then run `yarn npm:build:readme`.
- Every change must be tested with checks appropriate to its scope before it is
  complete. Check documentation accuracy, paths, links, and whitespace. For code,
  run relevant lint, build, compatibility, and behavioral checks.
- Verify rendered output, animation, styling, responsive behavior, and interactions
  in a browser. Exercise the gallery, lab, and docs; check console errors.
- For plugin changes, verify generated CSS, default and extended item counts, and
  affected utilities. Preserve Tailwind v3/v4 compatibility and check both when
  changing shared registration or utility behavior.
- Report checks and results. If a check cannot run, state the blocker and what
  remains unverified; do not claim it passed.

## Commits

- Group changes into reasonable, focused commits. Each should represent one
  coherent change with related documentation and verification updates.
- Follow git history: `type(optional-scope): Short description`, using types such
  as `feat`, `fix`, `chore`, and `docs`, and a scope such as `demo` as appropriate.
  Examples: `feat(demo): Prettify HTML before showing` and `fix: Audit fix`.
- Review the diff before committing. Exclude unrelated changes and incidental
  generated output.
