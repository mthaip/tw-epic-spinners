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

See [demo/CLAUDE.md](demo/CLAUDE.md) for detailed demo architecture and pitfalls.

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
