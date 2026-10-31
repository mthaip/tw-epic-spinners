## Introduction

V2 provides 20 composable, pure-CSS spinners for Tailwind CSS v3 and v4. Each
spinner has a container and named direct-child items. Start with a baseline below,
or write your own markup. Adding or removing items automatically updates geometry
and animation timing. No runtime JavaScript, HTML generator, or manual item count
is required by the package.

This is the v2 beta. V1 remains installable as `tw-epic-spinners@1`. This single demo documents v2.
See the [v1 documentation](https://github.com/mthaip/tw-epic-spinners/blob/v1/demo/content/documentation.md)
when maintaining an existing v1 project.

## Try the spinners

The [home page](https://tw-epic-spinners.mthaip.com/) shows the spinner gallery
first, followed by the [spinner lab](https://tw-epic-spinners.mthaip.com/#lab).
The embedded sandbox uses Monaco Editor, with HTML and CSS tabs, syntax
highlighting, autocomplete, line numbers, search, and undo/redo. Select a spinner
baseline, edit `index.html` or `styles.css`, and see the result live beside it.
Use **Format** (Cmd/Ctrl + Shift + F) to format the active file with Prettier,
**Copy code** to copy both files as an HTML snippet, and the preview toggle to
check a dark background. Selecting a baseline or **Reset** replaces both files.

The lab compiles `spinner-size-*` and `spinner-duration-*` as you type, using
the package and Tailwind v4 in a worker. These utilities need no predefined
range. Other Tailwind classes use the demo's compiled CSS; custom CSS works
immediately in the CSS tab. The preview is sandboxed with scripts disabled. There are no
separate lab or playground pages.

## Installation

```bash
npm install -D tw-epic-spinners@2.0.0-beta.1
```

The beta must be published to npm before the command above can be used. While
working in this repository, `demo/` links the local package and its built `dist/`.
The `v1` Git branch preserves the previous source and documentation.

Tailwind CSS v4:

```css
@import "tailwindcss";
@plugin "tw-epic-spinners";
```

Tailwind CSS v3:

```js
import spinners from 'tw-epic-spinners';

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue,svelte}'],
  plugins: [spinners],
};
```

## Markup contract

- Container: `spinner-<name>`.
- Repeated direct child: `spinner-item`.
- Shared utilities: `spinner-size-*` and `spinner-duration-*`.
- Color: inherited `currentColor`, controlled by Tailwind text-color utilities.

The container selects the spinner design; every repeated child uses the same
`spinner-item` class. Add or remove these children to customize the spinner.

```html
<div class="spinner-flower spinner-size-16 text-violet-500">
  <div class="spinner-item"></div>
  <div class="spinner-item text-pink-500"></div>
  <div class="spinner-item"></div>
</div>
```

Copy another item to extend the flower; CSS redistributes its petals. Every
spinner follows this structure, including ones that used pseudo-elements or
box shadows in v1. An item can include its own decorative pseudo-elements.

Keep only matching items inside a spinner container. Automatic indexing counts
all sibling elements, including unrelated or hidden elements. Put labels and
other content outside the container. Do not nest items in extra wrappers.

One or more items are supported, with no generated selector limit. Very large
counts can make individual parts too small to distinguish. Baselines preserve
at least the existing v1 visual parts; they are starting points, not count limits.

## Layout and customization

`spinner-size-*` now defines the **overall square footprint** for every spinner.
Row spinners shrink their items within that width; rings adjust their diameter
and stroke; circular patterns redistribute angles. Square patterns distribute
items around a square or in a grid. Grid columns are `ceil(sqrt(item count))`,
and an incomplete final row fills from the left.

```html
<div class="spinner-fingerprint spinner-size-16 md:spinner-size-24 spinner-duration-[2.5s] text-sky-500">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item text-pink-500"></div>
</div>
```

In **Tailwind v4**, keep the spinner prefix and use the same value syntax as
Tailwind's native `size-*` and `duration-*` utilities:

| Native Tailwind v4 | Spinner utility | Value |
| --- | --- | --- |
| `size-137` | `spinner-size-137` | `calc(var(--spacing) * 137)` |
| `size-3.25` | `spinner-size-3.25` | `calc(var(--spacing) * 3.25)` |
| `size-1/2` | `spinner-size-1/2` | `50%` of the containing block |
| `size-px`, `size-full` | `spinner-size-px`, `spinner-size-full` | `1px`, `100%` |
| `size-[70px]` | `spinner-size-[70px]` | `70px` |
| `size-(--my-size)` | `spinner-size-(--my-size)` | `var(--my-size)` |
| `duration-2345` | `spinner-duration-2345` | `2345ms` |
| `duration-[2.5s]` | `spinner-duration-[2.5s]` | `2.5s` |
| `duration-(--my-duration)` | `spinner-duration-(--my-duration)` | `var(--my-duration)` |
| `duration-initial` | `spinner-duration-initial` | Reset duration (zero seconds) |

Numeric sizes accept non-negative quarter-step spacing multipliers. Numeric
durations accept non-negative whole milliseconds. Neither needs a predefined
numeric scale or safelist. Size keywords (`auto`, `min`, `max`, `fit`, and the
viewport-unit keywords) follow native `size-*`; relative and intrinsic sizes
require a containing layout that gives the spinner a usable square footprint.
Responsive and other variants work, for example `md:spinner-size-137`.

Customize sizes and durations through CSS theme variables, just as with native v4 utilities:

```css
@theme {
  --spacing: 0.5rem;
  --spacing-card: 7rem;
  --transition-duration-slow: 3s;
}
```

Here `spinner-size-16` is `8rem`, `spinner-size-card` is `7rem`, and
`spinner-duration-slow` is `3s`. Both utilities also respect `@theme inline`.
Classes are generated when Tailwind detects them in your source; dynamic class
strings still require Tailwind's normal source detection configuration. The
lab handles its editable size and duration classes with a live compiler.

In **Tailwind v3**, size and duration use your configured `theme.spacing` and
`theme.transitionDuration` scales. Use brackets for values outside those scales,
such as `spinner-size-[70px]` and `spinner-duration-[2345ms]`. Replacing a theme
scale does not restore the removed default values. Utility classes can appear
in any order on the container.

CSS variables expose further control:

| Variable | Meaning | Default |
| --- | --- | --- |
| `--spinner-size` | Overall width and height | `4.5rem` |
| `--spinner-duration` | Animation cycle | `1.5s` |

```css
.my-flower {
  --spinner-duration: 3s;
  --spinner-size: 6rem;
}
```

Named items are styling hooks: add text-color utilities or your own CSS rules.
The animation controls item transforms; use the documented variables or your own
keyframes to change motion. The plugin respects `prefers-reduced-motion` by
pausing animations. Provide a loading label, because some original keyframes
include invisible or collapsed phases.

## Source structure and baseline appearance

Each spinner keeps its own named CSS object and keyframes in
`src/components/spinners/`. The shared `defineSpinner` wrapper only registers
size/duration defaults, the shared item contract, count/index variables, box sizing,
and reduced motion. It does not set shapes, layout, or animation delays.

The baseline designs retain v1's border sides, 3D tilts, keyframe stages and
component-specific easing. Periodic selectors such as `:nth-child(3n+1)` repeat
orbit's original three roles without limiting the total item count. Count-derived
formulas replace fixed index tables for sizes, positions and stagger.

The necessary differences from v1 are explicit: flower/pixel shadows become
editable named parts; nested wrappers and root pseudo-elements become parts;
self-building-square and fulfilling-square use count-aware grids. Row spinners
use overall footprint sizing. Pixel's old fixed-pixel shadow offsets now scale
with size, and scaling-squares' previously fixed child duration now scales with
`spinner-duration-*` while preserving its default 1250ms child cycle.

## Browser compatibility

Compatibility was checked on **October 31, 2026**. Tailwind compiler compatibility
and browser support are separate: a Tailwind v3 build does not make newer CSS
features work in older browsers. Tailwind's `--spacing()` and `--theme()` functions
are build-time syntax; the compiler resolves them before CSS reaches the browser.

| Runtime feature | Used for | Baseline availability |
| --- | --- | --- |
| `sibling-count()`, `sibling-index()` | Automatic count and index | Newly available, August 2026 |
| `sin()`, `cos()` | Radial layouts | Widely available; cross-browser since March 2023 |
| `sqrt()` | Grid columns and diagonal geometry | Widely available; cross-browser since December 2023 |
| `round()`, `mod()` | Grid row/column calculation | Newly available since May 2024; reaches 30 months in November 2026 |
| Variables, `calc()`, `min()`/`max()`, `:where()`, transforms and animations | Shared styling | Widely available |

The native automatic-count path requires **Chrome/Edge 138+, Safari/iOS 26.2+,
and Firefox 154+**. These browsers also cover the other functions used here.
Newly available means current core browsers support a feature; Widely available
means another 30 months have passed. Therefore v2's automatic-count path is
**not** a Baseline Widely available implementation yet.

Sources: [MDN sibling counting](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-count),
[trigonometry](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sin),
[square roots](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sqrt),
[rounding](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/round),
and the [Baseline definition](https://web.dev/baseline).

### Options for older browsers

These are architectural alternatives, **not compatibility modes shipped by this
beta**. No JavaScript polyfill or fallback adapter is currently included.

| Approach | Unlimited extra items | Tradeoff |
| --- | --- | --- |
| Native CSS counting (current v2) | Yes | Requires the browser versions above |
| Framework/server-supplied CSS variables | Yes | Render count/index with each item; grid layouts also need column/row metadata to avoid newer math |
| Optional DOM helper | Yes | A small script supplies the same variables; a MutationObserver can update them when children change |
| Fixed CSS selector fallback | Only up to its configured limit | Can preserve the baseline without JavaScript, but cannot meet the unlimited automatic-extension requirement |
| Flex/grid alone | Layout only | Can flow added items, but cannot provide arbitrary radial angles and index-based animation phases across all spinners |

For an older-browser v2 design, the simplest extension is explicit CSS metadata
from a framework loop, or an optional helper for plain HTML. The modern CSS path
can remain an enhancement behind `@supports`. Grid fallback must also avoid
unsupported `round()`/`mod()` calls: supplying only count/index is insufficient.
Keeping v1 is the existing supported option when the new browser floor is unsuitable.

## Accessibility

Expose a loading label separately and hide the decorative spinner from assistive
technology:

```html
<div role="status">
  <span class="sr-only">Loading…</span>
  <div class="spinner-half-circle spinner-size-12" aria-hidden="true">
    <div class="spinner-item"></div>
    <div class="spinner-item"></div>
  </div>
</div>
```

## Migration from v1

1. Install v2 and keep the Tailwind plugin registration.
2. Replace old anonymous children with the matching `spinner-item` parts.
3. Replace `creator()` and injected HTML with ordinary markup or framework loops.
   V2 exports the Tailwind plugin and a TypeScript `Spinner` type; there is no
   `creator()` export or public spinner registry.
4. Review sizes: row spinners now use the same overall footprint as other spinners.
5. Replace custom uses of `--spinnerSize`/`--spinnerDuration` with
   `--spinner-size`/`--spinner-duration`.
6. Check your browser support requirements. The v1 package remains available;
   existing projects can keep its API and old markup until they migrate.

For example, v1 half-circle markup had no child elements:

```html
<!-- v1 -->
<div class="spinner-half-circle spinner-size-12"></div>
```

In v2, supply the baseline's two named items:

```html
<!-- v2 -->
<div class="spinner-half-circle spinner-size-12">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

For Vue/Nuxt, replace `creator()` and `v-html` with ordinary template markup:

```vue
<template>
  <div class="spinner-half-circle spinner-size-12">
    <div
      v-for="item in 2"
      :key="item"
      class="spinner-item"
    />
  </div>
</template>
```

Baseline animations retain the original motifs but have been redesigned to
support variable counts. V2 is not a pixel-identical rendering of every v1 effect.

## Baseline spinners

Each example is editable HTML. Increase or decrease its number of direct-child
items; no CSS changes, index attributes, or count variables are required.

### `spinner-flower`

Baseline: 8 items.

```html
<div class="spinner-flower spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-pixel`

Baseline: 8 items.

```html
<div class="spinner-pixel spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-hollow-dots`

Baseline: 3 items.

```html
<div class="spinner-hollow-dots spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-intersecting-circles`

Baseline: 7 items.

```html
<div class="spinner-intersecting-circles spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-orbit`

Baseline: 3 items.

```html
<div class="spinner-orbit spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-radar`

Baseline: 4 items.

```html
<div class="spinner-radar spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-scaling-squares`

Baseline: 4 items.

```html
<div class="spinner-scaling-squares spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-half-circle`

Baseline: 2 items.

```html
<div class="spinner-half-circle spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-trinity-rings`

Baseline: 3 items.

```html
<div class="spinner-trinity-rings spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-fulfilling-square`

Baseline: 1 item.

```html
<div class="spinner-fulfilling-square spinner-size-16">
  <div class="spinner-item"></div>
</div>
```

### `spinner-circles-to-rhombuses`

Baseline: 3 items.

```html
<div class="spinner-circles-to-rhombuses spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-semipolar`

Baseline: 5 items.

```html
<div class="spinner-semipolar spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-self-building-square`

Baseline: 9 items.

```html
<div class="spinner-self-building-square spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-swapping-squares`

Baseline: 4 items.

```html
<div class="spinner-swapping-squares spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-fulfilling-bouncing-circle`

Baseline: 2 items.

```html
<div class="spinner-fulfilling-bouncing-circle spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-fingerprint`

Baseline: 9 items.

```html
<div class="spinner-fingerprint spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-spring`

Baseline: 2 items.

```html
<div class="spinner-spring spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-atom`

Baseline: 3 items.

```html
<div class="spinner-atom spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-looping-rhombuses`

Baseline: 3 items.

```html
<div class="spinner-looping-rhombuses spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-breeding-rhombus`

Baseline: 8 items.

```html
<div class="spinner-breeding-rhombus spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```
