# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing / documentation / playground site for the [`tw-epic-spinners`](https://www.npmjs.com/package/tw-epic-spinners) Tailwind CSS plugin. The plugin itself lives in the parent repo (`../`); this `demo/` package consumes it as a regular npm dependency and ships as a static site to Netlify.

## Commands

Package manager: **yarn 1.22** (see `packageManager`). Node version: **24.16.0** (`.nvmrc`).

- `yarn dev` — Nuxt dev server with HMR
- `yarn build` — production build (Netlify nitro preset)
- `yarn generate` — static prerender
- `yarn preview` — preview the built site
- `yarn postinstall` — runs `nuxt prepare` (regenerates `.nuxt/` types; needed before `tsc`/ESLint work after a fresh install)

No test runner is configured. Lint is wired through `@nuxt/eslint` (`eslint.config.mjs` extends the auto-generated `.nuxt/eslint.config.mjs`); run via `npx eslint .` if needed.

## Architecture

Nuxt 4 app using the `app/` source layout (Nuxt 4's new default — `app.vue`, `pages/`, `components/`, `layouts/`, `composable/` all live under `app/`).

Key wiring:

- **Styling stack**: Tailwind CSS v4 via `@tailwindcss/vite`, plus three Tailwind plugins loaded from `app/assets/css/main.css`: `tw-epic-spinners` (the subject of the site), `@iconify/tailwind4` (icons used as `icon-[lucide--...]` utility classes), `@tailwindcss/typography`, and `daisyui` (with `themes: all`). DaisyUI themes drive `useTheme` — see below.
- **`@source inline(...)` in `main.css`** is load-bearing. Tailwind v4's JIT can't see dynamic class names built at runtime (e.g. `spinner-size-{n}`, `text-{color}-{shade}` in the playground configurator), so they're force-included. If you add a new dynamic class pattern in the playground, extend the `@source inline` list or the class won't ship.
- **Content / docs**: `@nuxt/content` v3 with a single `content` collection (`content.config.ts`) sourcing `content/*.md`. The docs page (`app/pages/docs.vue`) renders `content/documentation.md`. Code highlighting theme is `tokyo-night` (configured in both `nuxt.config.ts` and `app/data/config.ts`).
- **Theme switching**: `app/composable/useTheme.ts` wraps `@vueuse/core`'s `useColorMode` but swaps the storage backend to a Nuxt `useCookie` so the active DaisyUI theme survives SSR. The list of allowed themes is the `themes` const there — adding a theme means adding it to that map.
- **Spinner catalogue**: `app/data/spinners.ts` is the single source of truth for which spinners the gallery / playground know about. Names are stored *without* the `spinner-` prefix; the prefix is added at render time (see `SpinnerConfigurator.vue`).
- **Site metadata**: `nuxt.config.ts` pulls `site.url` and `site.name` from the **parent** `../package.json` (the plugin's package.json, not this demo's). `@nuxtjs/sitemap` and `@nuxtjs/robots` consume that.
- **Deployment**: `nitro.preset: 'netlify'`. `.netlify/` and `netlify-cli` (devDep) are present for local emulation.

## Things easy to get wrong

- This package is `private: true` and is **not** what gets published to npm — the plugin itself does, from `../`. Bumping `version` here doesn't release anything.
- The `tw-epic-spinners` dependency in `package.json` is a regular semver range against the published package, not a workspace link. To test local plugin changes, install via a relative path or `yarn link` from `../`.
- `app/composable/` is singular (not `composables/`). Nuxt's auto-import still picks it up because of the `app/` layout, but new files go there, not in a sibling `composables/` dir.
- `tsconfig.json` is a stub that references the four generated `.nuxt/tsconfig.*.json` files. Don't add `compilerOptions` here — do it through `nuxt.config.ts` if needed, then re-run `nuxt prepare`.
