# Project guide

`tw-epic-spinners` v2 is a framework-agnostic Tailwind CSS plugin with 20
composable, pure-CSS loading spinners. It supports Tailwind v3 and v4. The
private Nuxt 4 app in `demo/` provides documentation, a gallery, and a live HTML
Lab using Nuxt UI and Monaco.

## Requirements and setup

- Node **24**, selected with `nvm use`; both `.nvmrc` files specify the major only.
- Yarn Classic **1.22.22**, declared in both packages.

Install each package's dependencies separately:

```sh
# Repository root
nvm use
yarn install --frozen-lockfile

cd demo
yarn install --frozen-lockfile
```

## Local development

From the repository root:

```sh
yarn demo:dev
```

This builds the local plugin, then starts Nuxt at `http://localhost:3001`.
Nuxt's development-only alias resolves `tw-epic-spinners` to the root
`dist/index.js`, including the CSS plugin and Lab compiler worker. Rebuild the
package after changing `src/`.

The routes are `/` (gallery and animated hero), `/docs`, and `/labs`.
`/labs?spinner=orbit` selects a baseline in the Lab. The `/playground` route
redirects permanently to `/labs`.

If the package is already built, `yarn dev` from `demo/` starts Nuxt directly.
Run `yarn nuxt cleanup` from `demo/` only when caches need clearing; cleanup is
separate from build commands.

## Build and verify the package

Run from the repository root:

```sh
yarn lint
yarn test
yarn npm:pack
```

`yarn test` builds the package, installs the isolated Tailwind v3 test compiler,
and checks Tailwind v3/v4 output, utility behavior, baseline motion, and the npm
tarball. `yarn npm:build` builds without running tests. `yarn npm:pack` builds and
creates the release tarball from `dist/`.

`dist/` is the standalone publish directory, containing ESM/CommonJS/UMD bundles,
types, allowlisted package metadata, README, license, and LLM guidance. Do not
edit generated files or copy root scripts/devDependencies into this manifest.

For demo checks, run from `demo/`:

```sh
yarn exec eslint .
yarn nuxt typecheck
```

Verify rendered changes in a browser, including the affected gallery, docs, or
Lab flow and its console. The spinners use `sibling-index()` and `sibling-count()`;
Tailwind v3 support does not imply older-browser support. See the
[compatibility guidance](../demo/content/documentation.md#compatibility).

## Documentation and discovery files

Edit [demo/content/documentation.md](../demo/content/documentation.md), then run
from the repository root:

```sh
yarn npm:build:readme
```

This generates `README.md` and `demo/public/docs.md`, and copies root `llms.txt`
to `demo/public/llms.txt`. Edit root `llms.txt` when changing its guidance.
Preserve credit to [EpicMax / epic-spinners](https://github.com/epicmaxco/epic-spinners).

Page titles/descriptions live in `demo/app/data/routes.ts`; the shared layout
provides canonical URLs, social metadata, and JSON-LD. Nuxt Robots merges
`demo/public/_robots.txt` with environment rules. The production sitemap lists
`/`, `/docs`, and `/labs`, with XSL disabled. Development and Netlify previews
are non-indexable; error responses also receive `noindex`.

## Publish a package release

1. Update the root `package.json` version and matching `package-lock.json`
   metadata. Review documentation, migration instructions, and the social card.
2. Run the package checks above and inspect the tarball contents.
3. Authenticate with npm, then run from the repository root:

   ```sh
   npm login
   yarn npm:publish
   ```

The publish script rebuilds and publishes **`dist/`**. The repository root is
private; do not run a bare `npm publish` there. Building does not publish a release.

## Build and deploy the demo

The demo declares `tw-epic-spinners: "latest"`. Production resolves the npm
package, without the development alias. Publish the matching package major to
npm's `latest` tag before deploying its docs.

From `demo/`:

```sh
yarn build:deploy
```

`demo/scripts/build.mjs` regenerates docs using Node, refreshes the spinner
dependency from npm even with a cached install, verifies its major matches the
docs, and runs `yarn build`. It restores Yarn's temporary manifest/lockfile
changes. A mismatched npm release stops the build instead of using the local
plugin. `yarn build` alone is just `nuxt build` with the installed dependency;
use `build:deploy` when the latest npm release must be installed first.

[netlify.toml](../netlify.toml) sets base `demo`, command `yarn build:deploy`, and
publish directory `dist`. Netlify installs the demo dependencies automatically;
root dependencies are not required for deployment. Node is set to `24`.

The app uses SSR with Nitro's `netlify` preset. Public assets are written to
`demo/dist/`, and the server to `demo/.netlify/functions-internal/server/`.
`yarn generate` is an optional static export, not the deployment workflow.
Netlify Dev uses port `8888` and proxies Nuxt on `3001`.

See [AGENTS.md](../AGENTS.md) for detailed architecture, verification rules, and
commit conventions.
