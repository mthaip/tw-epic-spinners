# Project guidance

## Project overview

`tw-epic-spinners` provides 20 pure-CSS loading spinners as a framework-agnostic
Tailwind CSS plugin supporting Tailwind v3 and v4. The root package is published
to npm; `demo/` is a separate, private Nuxt 4 documentation and playground site.

## Repository layout

- `src/index.ts`: public plugin entry point, `Spinner` type, spinner registry,
  and named `creator(spinner, classes?)` HTML helper. Keep internal spinner
  definitions private.
- `src/components/spinners/`: spinner styles, keyframes, and HTML creators.
- `src/components/utilities/`: size and animation-duration utilities.
- `src/utils/builder.ts`: shared CSS and class-name helpers.
- `demo/app/`: Vue pages, components, spinner catalogue, theme handling, and CSS.
- `demo/content/documentation.md`: source for the site docs and generated root
  `README.md`. Edit this source instead of editing `README.md` directly.
- `scripts/build-readme.mjs`: generates `README.md` and copies root `llms.txt`
  to `demo/public/llms.txt`.
- `dist/`: generated library bundles and type declarations; do not edit manually.

## Development

Use Yarn Classic 1.22.22, as declared in both packages. Follow each package's
`.nvmrc` when selecting Node; the root and demo currently specify different versions.

Run from the repository root:

- `yarn npm:build:readme`: regenerate the README and demo copy of `llms.txt`.
- `yarn npm:build`: regenerate documentation and build the library with Vite,
  including type declarations.
- `yarn exec eslint src`: lint the library source with the flat ESLint config.
  The existing `yarn lint` script uses legacy CLI flags; do not assume it works
  with the installed ESLint version.

Run from `demo/`:

- `yarn dev`: start the Nuxt development server.
- `yarn build`: build the production site.
- `yarn generate`: prerender the static site.
- `yarn preview`: preview the production build.
- `yarn postinstall`: run Nuxt preparation after installing dependencies.
- `yarn exec eslint .`: lint the demo after Nuxt preparation.

The demo consumes the published `tw-epic-spinners` package through a semver
dependency. When verifying local plugin changes in the demo, explicitly link or
install the local build and confirm the demo is exercising that build.

## Demo architecture and pitfalls

The demo is a Nuxt 4 marketing, documentation, and playground site deployed to
Netlify. It uses the `demo/app/` source layout for `app.vue`, pages, components,
layouts, and theme helpers.

- **Styling**: Tailwind CSS v4 runs through `@tailwindcss/vite`. The stylesheet
  `demo/app/assets/css/main.css` loads `tw-epic-spinners`, `@iconify/tailwind4`,
  `@tailwindcss/typography`, and DaisyUI with `themes: all`. Icons use utility
  classes such as `icon-[lucide--...]`.
- **Dynamic classes**: Keep the `@source inline(...)` declarations in that
  stylesheet. Tailwind cannot discover class names constructed at runtime, such
  as `spinner-size-{n}` and `text-{color}-{shade}`. Extend these declarations
  whenever the playground introduces a new dynamic class pattern.
- **Content**: `demo/content.config.ts` defines one `content` collection sourcing
  `content/*.md`. The documentation page (`demo/app/pages/docs.vue`) renders
  `demo/content/documentation.md`. Keep the `tokyo-night` highlighting theme
  consistent between `demo/nuxt.config.ts` and `demo/app/data/config.ts`.
- **Themes**: `demo/app/composable/useTheme.ts` wraps VueUse's `useColorMode`
  with Nuxt's `useCookie` storage so the active DaisyUI theme survives SSR. Add
  new allowed themes to its `themes` map. The directory is singular:
  `demo/app/composable/`; place new theme helpers there.
- **Spinner catalogue**: `demo/app/data/spinners.ts` defines the spinners known
  to the gallery and playground. Names omit the `spinner-` prefix;
  `demo/app/components/SpinnerConfigurator.vue` adds it when rendering.
- **Site metadata**: `demo/nuxt.config.ts` reads the site URL and name from the
  root plugin's `package.json`, not `demo/package.json`. The sitemap and robots
  modules consume this metadata.
- **Deployment**: Nitro uses the `netlify` preset. The demo includes
  `netlify-cli` and local Netlify configuration for emulation.
- **Package boundaries**: `demo/package.json` is private. Changing its version
  does not publish the root plugin to npm. Its plugin dependency is a regular
  published package dependency, not a workspace link.
- **Generated configuration**: `demo/tsconfig.json` references four generated
  `.nuxt/tsconfig.*.json` files. Configure compiler options through
  `demo/nuxt.config.ts` and rerun Nuxt preparation instead of adding them to the
  stub. The demo ESLint config extends `.nuxt/eslint.config.mjs`; run
  `yarn postinstall` in `demo/` to regenerate Nuxt types and configuration before
  TypeScript or lint checks after a fresh install.

## Required verification

- Every change must be tested with checks appropriate to its scope before it is
  considered complete. For documentation-only changes, check accuracy, referenced
  paths and links, and whitespace. For code changes, run relevant lint, build,
  and behavioral checks. Neither package currently defines a test runner.
- Verify in a browser whenever changes affect rendered output, animations,
  styling, responsive behavior, or user interactions. Exercise the affected
  gallery, playground, or documentation flow and check for console errors.
- For plugin changes, verify generated HTML/CSS and the affected spinners and
  utilities. Preserve Tailwind v3 and v4 compatibility; check both when changing
  shared plugin registration or utility behavior.
- Report the checks performed and their results. If a check cannot run, state
  the blocker and what remains unverified; do not claim it passed.

## Commits

- Group changes into reasonable, focused commits. Each commit should represent
  one coherent change, with related documentation and verification updates.
- Follow the existing git history: `type(optional-scope): Short description`,
  using types such as `feat`, `fix`, and `chore`, and a scope such as `demo` when
  appropriate. Recent examples include `feat(demo): Prettify HTML before showing`
  and `fix: Audit fix`. Use `docs` for documentation-only changes.
- Review the diff before committing and avoid including unrelated changes or
  incidental generated output.
