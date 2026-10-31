# Project guide

20 composable CSS spinners for Tailwind v3/v4. `demo/` is the Nuxt docs and Lab.
Use Node **24** and Yarn **1.22.22**.

## Setup

```sh
# Root
nvm use
yarn install --frozen-lockfile

cd demo
yarn install --frozen-lockfile
```

## Development

From root, run `yarn demo:dev`. It builds the local plugin and starts
`http://localhost:3001`. Rebuild after changing `src/`.

Development uses the local bundle; production uses npm's latest release.

## Commands

| Location | Command | Purpose |
| --- | --- | --- |
| Root | `yarn npm:build` | Build the package into `dist/` |
| Root | `yarn lint` | Lint package code |
| Root | `yarn test` | Build and test Tailwind v3/v4, baselines, and packaging |
| Root | `yarn npm:pack` | Build the npm tarball |
| Demo | `yarn dev` | Start Nuxt with the local plugin already built |
| Demo | `yarn exec eslint .` | Lint the demo |
| Demo | `yarn nuxt typecheck` | Check types |
| Demo | `yarn build` | Build with the installed npm package |
| Demo | `yarn build:deploy` | Refresh npm's latest release, then build |
| Demo | `yarn nuxt cleanup` | Clear caches separately when needed |

Check UI changes in a browser and check its console.

## Documentation

Edit `demo/content/documentation.md` and root `llms.txt`, then run
`yarn npm:build:readme` from root. It updates README, `/docs.md`, and `/llms.txt`.
Keep the original EpicMax credit. Do not edit generated files.

## Publish and deploy

1. Update the root version, lockfile metadata, and docs.
2. Run package checks and inspect the tarball.
3. Run `npm login --registry=https://registry.npmjs.org/`, then
   `yarn npm:publish` from root. This publishes **`dist/`**. The generated
   manifest pins `publishConfig.registry` to npm so Yarn Classic's inherited
   `registry.yarnpkg.com` setting cannot redirect publication. For a preview,
   build first, then run `yarn exec -- npm publish ./dist --dry-run`.
4. Deploy the demo after the matching major version is on npm's `latest` tag.

Netlify installs dependencies in `demo/` and runs `yarn build:deploy`.
It uses SSR with Nitro's `netlify` preset and publishes `demo/dist/`.
The build stops if npm's latest major differs from the docs.

See [AGENTS.md](../AGENTS.md) for architecture and detailed rules.
