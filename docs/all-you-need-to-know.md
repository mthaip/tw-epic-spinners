## Requirements

- Node.js `24.x` (both `.nvmrc` files select `24`)

### Development

- `nvm use`
- `yarn install`
- `yarn --cwd demo install`
- `yarn --cwd demo dev`

### How to build

- `yarn npm:build`

### Maintenance checks

- `yarn lint`
- `yarn typecheck`
- `yarn audit`
- `yarn --cwd demo lint`
- `yarn --cwd demo audit`
- `yarn --cwd demo build`

Audit follow-up (2026-10-31): Yarn reports 4 moderate dependency-path findings
in the root tooling (`minimatch`), and 21 in the demo (1 high, 17 moderate,
3 low). The demo's high finding is Nuxt Content's Zod 3 dependency; its
published fix requires Zod 4. Remaining findings involve `minimatch`, `glob`,
and `deepmerge` (no patched release listed). Recheck upstream releases before
forcing incompatible transitive major upgrades. No critical findings remain.
The typography selector parser is resolved to a patched 6.x release.

### How to publish

- `npm login`
- Update version in `package.json`
- `yarn npm:build`
- `npm publish`
