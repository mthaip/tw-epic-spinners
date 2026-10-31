# Project guidance

## Project overview

`tw-epic-spinners` v2 provides 20 composable pure-CSS loading spinners as a
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
- `docs/all-you-need-to-know.md`: maintainer setup, verification, release, and
  deployment guide. Keep it current when those workflows change.
- `scripts/build-readme.mjs`: generates README and copies root `llms.txt` into
  `demo/public/llms.txt`; also generates `demo/public/docs.md` from the same docs.
- `demo/scripts/build.mjs`: regenerates docs, refreshes the npm `latest` release,
  verifies its major version matches the docs, and builds the Netlify SSR app. The demo
  build does not run cleanup; use `yarn nuxt cleanup` from `demo/` separately when needed.
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

Use Yarn Classic 1.22.22 and Node 24, as declared by `packageManager` and
`.nvmrc`. Node is pinned to the major version only. Run from the repository root:

- `yarn npm:build:readme`: regenerate README and the demo copy of `llms.txt`.
- `yarn npm:build`: regenerate documentation and build the library with Vite,
  including type declarations and the standalone npm manifest.
- `yarn npm:pack`: build and create the release tarball from `dist/`.
- `yarn npm:publish`: build and publish `dist/`.
  The repository root is private; publish only the generated package. Never
  copy root scripts, devDependencies, or package-manager settings into it.
- `yarn lint`: lint the library source with the flat ESLint config.
- `yarn test`: build the package, install the isolated Tailwind v3 compiler from
  its lockfile, and run the Node compatibility tests. Browser fixtures are written
  to `.output/verification/` for visual and computed-style checks.
- `yarn demo:dev`: build the local plugin and start Nuxt on port `3001`.
- `http://localhost:3001/labs`: the full-screen lab in `demo/app/components/Lab.vue`.
  Its client-only Monaco editor (`LabEditor.client.vue`) provides HTML editing,
  Prettier formatting, and a sandboxed live preview. Keep the lab minimal: spinner
  selection, format, reset, copy, editor, and preview only. No CSS tab or status bars. Keep Monaco and its workers
  out of SSR; Vite bundles the editor and HTML workers locally. The home page uses stock `UHeader`, `UPageHero`, `UPage`/`UPageBody`, `UPageGrid`, and
  `UPageCard` components for navigation and library; the horizontal hero contains an animated `HeroDemo` with synchronized markup and
  flower item counts. Animate inserted/removed code lines using stable content/occurrence
  keys; keep the closing tag stable and respect reduced motion. Keep the demo headerless with a 60%-width code pane and a 3:4 preview capped at 30% of the demo width
  side by side (full-width 16:9 when stacked below md), followed by the gallery at `#collections`. The editor lives
  at `/labs` and fills the remaining viewport between navigation and the footer.
  Keep the footer on every page and use a flex layout to allocate Lab height.
  Wrap the entire Labs editor in UPageSection so its container shares the
  navigation max width; remove section vertical padding to retain viewport height.
  Keep its content-width spinner selector and all toolbar controls aligned left.
  Use the outline/page-surface variant for the Labs shell so preset card tints
  do not create different-colored side gutters. The Labs card has no outer border
  or rounded corners; use a full-viewport-width USeparator between toolbar and editor, bleeding
  outside the shared container without widening the editor panels. Keep line-highlight
  borders transparent, show untruncated spinner names in the selector, and provide
  tooltips for every icon action. Format baseline markup automatically on mount,
  selection, query changes, and reset; keep in-flight formatting from overwriting
  newer requests or user edits. Show USkeleton in the server/client fallback and
  while Monaco initializes, removing it only when the editor and theme are ready. Explicitly register Monaco’s built-in
  iPadShowKeyboard contribution in the client component; it is iOS-only.
  Gallery cards use a 3:4 aspect ratio, center the name beneath the spinner,
  and show no item counts. Preserve the
  original column counts: 2 by default, 3 at sm, 4 at md, and 5 at lg.
Run from `demo/`:

- `yarn dev`: start Nuxt on port `3001`; build the root plugin first.
- `yarn build`: build the production Netlify SSR app with the installed npm
  dependency, without cleanup. Use `yarn build:deploy` for deployment so the
  spinner dependency is refreshed from npm first.
- `yarn build:deploy`: regenerate docs, refresh npm's `latest` spinner release,
  and build the Netlify SSR app. Fail if the release's major version does not
  match the docs; publish v2 before deploying these docs. This uses only demo
  dependencies; Netlify installs them automatically. Never substitute the local
  plugin in production. Yarn's temporary manifest/lockfile rewrites are restored.
- `yarn nuxt <command>`: run Nuxt commands directly; use `yarn nuxt cleanup`
  separately when generated caches need clearing.
- `yarn generate`: optional static export; not used for deployment.
- `yarn preview`: Nuxt preview for compatible builds; use Netlify Dev for the
  Netlify preset.
- `yarn postinstall`: regenerate Nuxt types and configuration.
- `yarn nuxt typecheck`: check Vue components, composables, and compiler workers.
- `yarn exec eslint .`: lint the demo after Nuxt preparation.

The demo declares the npm dependency as `latest`. Nuxt's development-only alias
points both CSS plugin resolution and the Lab worker at the local `dist/index.js`;
build the root package before starting development. `yarn demo:dev` does this
automatically. Production has no local alias, and `yarn build:deploy` refreshes the
registry tag even when CI restores cached dependencies or a lockfile. Building
a release does not publish it to npm.

## Demo architecture and pitfalls

- **App layout**: Nuxt uses `demo/app/` for pages, components, and layouts.
  Theme helpers live in singular `demo/app/composable/`.
- **Styling**: `demo/app/assets/css/main.css` loads Tailwind v4 through
  `@tailwindcss/vite`, plus the spinner plugin and Nuxt UI. Use original Nuxt UI components and default
  styles; do not add DaisyUI, external style sheets, or component-style overrides.
  Keep its `@source inline(...)` declarations: dynamic component names
  and lab colors must be included in the production CSS. Do not add numeric size
  or duration safelists: the lab worker compiles these utilities as needed.
- **Lab utilities**: `useLabUtilities.ts` sends size/duration classes to
  `workers/spinner-utilities.ts`, which runs the actual plugin and Tailwind v4
  (local in development, npm in production).
  Keep compilation off the main thread and do not duplicate value resolution in UI code.
- **Lab styles**: The sandboxed iframe has an opaque origin. Copy stylesheet
  links with absolute URLs and remove `crossorigin`, or production component CSS
  can fail to load even when the development preview works.
- **Preview fonts**: Public `/_fonts/**` assets need CORS for the opaque-origin
  preview. Keep production route headers and the development header handler;
  Nuxt Fonts handles development requests before Nitro route rules.
- **Navigation motion**: Use Nuxt page transitions with Tailwind opacity classes
  and smooth-scroll HTML utilities, respecting reduced motion.
- **Catalogue and markup**: `demo/app/data/spinners.ts` supplies names without
  `spinner-` and baseline item counts. `SpinnerPreview.vue` renders ordinary Vue
  markup. The HTML modal serializes the rendered parts; no package HTML helper. Use the
  same DocsCodeBlock for modal code/actions, title it with the spinner class name,
  and keep its desktop maximum width at 3xl.
- **Content**: Nuxt Content sources `demo/content/*.md`; `docs.vue` renders
  `documentation.md` using Nuxt UI prose components and `UContentToc`. Show one
  mobile TOC; hide the desktop right-slot TOC below lg. Keep docs
  focused on v2, with previous-package details only in migration. Baseline HTML
  fences use `spinner=<name>` metadata; `DocsCodeBlock.vue` adds a Try it out
  button around the original Nuxt UI prose component. Group baseline actions in one absolute top-right flex wrapper using gap-2,
  with Copy before Try it out; avoid individual button offsets. Preserve copying the
  rendered code when Nuxt Content omits the plain-text code prop. The README generator turns
  that metadata into ordinary Markdown links. `/labs?spinner=<name>` validates
  and seeds the selected spinner, including query changes on the same route.
- **Themes**: `ThemePicker.vue` persists the selected Nuxt UI preset in a cookie and
  updates `appConfig.ui`. Iris is the default preset. Presets in `data/theme-presets.json` are precompiled
  from the Nuxt UI v4.12.0 theme studio (MIT license alongside the data); preserve
  their colors, fonts, radius, semantic tokens, and default variants. Lucide
  supplies interface icons; the npm link uses the official Simple Icons npm mark.
  Exclude the Default preset from the selector and migrate its cookie to Iris. Nuxt Fonts self-hosts preset fonts. Nuxt UI's color-mode module handles light/dark/
  system appearance. Shared `shared/code-theme.ts` selects the docs’ Material light/GitHub dark themes for Nuxt Content,
  `CodeHighlight.vue`, and Monaco via the official Shiki integration. Keep one
  HTML highlighter cached in `utils/code-highlighter.ts`; never hand-color code
  by token or preset. Monaco resolves UI chrome tokens to hex, and the sandbox copies the current theme styles and color-mode class.
- **Favicon**: `public/favicon.svg` retains the original loading-ring mark.
  `useThemeFavicon.ts` updates its SVG fill from the resolved `--ui-primary`
  token when presets or appearance change.
- **Navigation**: The logo links to `/`; its adjacent version dropdown links
  to the current version and `https://tw-epic-spinners-v1.mthaip.com`. Main items
  are Docs and Lab. The visible brand is `tw-epic-spinners`, with `epic` in the
  primary color; the version button uses primary/subtle. Read the current version from root `package.json`.
- **Metadata**: Nuxt's site URL and name come from the root plugin's `package.json`.
- **SEO and AI discovery**: Keep v2 route titles/descriptions in `data/routes.ts`.
  The shared layout emits canonical URLs without queries, Open Graph/Twitter tags,
  and factual WebSite/SoftwareSourceCode/WebPage JSON-LD. Keep the static 1200×630
  social card consistent with the release. Nuxt Robots owns meta/header directives;
  `server/plugins/robots-errors.ts` overrides error responses to `noindex`.
  `public/_robots.txt` permits crawling in production, while development and Netlify
  previews stay non-indexable. The sitemap has no XSL and lists real page routes,
  excluding the Content source path `/documentation` and old `/playground` route.
  `/playground` redirects permanently to `/labs`. Regenerate `/docs.md` and
  `/llms.txt` with `yarn npm:build:readme`; edit their source files, not public copies.
  Treat llms.txt as supplemental guidance, not an indexing or ranking guarantee.
- **SSR deployment**: `ssr: true` with Nitro's `netlify` preset. `nuxt build`
  writes public assets to `demo/dist/` and the server to
  `demo/.netlify/functions-internal/server/` with the installed Nitro version.
  Pages, content queries, robots, and sitemap are served by the SSR handler.
- **Netlify**: Root `netlify.toml` uses `demo` as the base so Nitro's internal
  functions directory is discovered normally. It installs demo dependencies and
  runs `yarn build:deploy` there; no root dependency install is needed. The publish directory is
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
