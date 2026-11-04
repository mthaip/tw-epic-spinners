<!-- This file is generated from demo/content/documentation.md by scripts/build-readme.mjs. Do not edit directly. -->
<!-- cSpell:words semipolar rhombuses mthaip -->

# tw-epic-spinners

> 20 pure-CSS loading spinners as a Tailwind CSS plugin. Works with Tailwind v3 and v4, and any framework.

Live previews & docs: [tw-epic-spinners.mthaip.com](https://tw-epic-spinners.mthaip.com)

## Introduction

20 composable, pure-CSS loading spinners as a Tailwind CSS plugin. Works with
Tailwind CSS v3 and v4, in any framework.

`tw-epic-spinners` adapts [EpicMax’s Epic Spinners (epic-spinners)](https://github.com/epicmaxco/epic-spinners)
as a framework-agnostic Tailwind CSS plugin. Start with one of the 20 baseline
examples below and add or remove HTML parts to customize the animation.

## Installation

```bash
npm install -D tw-epic-spinners@2.0.0
```

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

## Composable Approach

Build spinners from small, repeatable parts. Start with a baseline, then add or
remove items to make it your own. CSS handles the layout and animation.

- `spinner-<name>` selects the design.
- Each repeated direct child uses `spinner-item`.
- Add or remove items; CSS adjusts the layout and animation automatically.
- Set size, duration, and color with utilities on the container or its items.

```html
<div class="spinner-flower spinner-size-16 text-violet-500" aria-hidden="true">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

Keep labels and unrelated elements outside the container; sibling counting includes
all direct children.

## Utils

Use `text-*` for color.

### Size

`spinner-size-*` sets the overall footprint using Tailwind’s `size-*` value syntax.

| Syntax | Example |
| --- | --- |
| `spinner-size-<number>` | `spinner-size-16` |
| `spinner-size-[<length>]` | `spinner-size-[72px]` |
| `spinner-size-(<variable>)` (Tailwind v4) | `spinner-size-(--loader-size)` |

Normal variants work, such as `md:spinner-size-24`. In Tailwind v3, sizes use your
configured spacing scale; use brackets for custom values.

### Duration

`spinner-duration-*` sets the animation cycle using Tailwind’s `duration-*` value syntax.
Numeric values are milliseconds.

| Syntax | Example |
| --- | --- |
| `spinner-duration-<number>` | `spinner-duration-3500` |
| `spinner-duration-[<time>]` | `spinner-duration-[2.5s]` |
| `spinner-duration-(<variable>)` (Tailwind v4) | `spinner-duration-(--loader-duration)` |

In Tailwind v3, durations use your configured transition-duration scale; use brackets
for custom values.

## Compatibility

Last checked: **October 31, 2026**. V2 uses modern CSS APIs such as
[`sibling-count()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-count)
and [`sibling-index()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index),
which became **Baseline Newly available in August 2026**. Older browsers may not
work. Use at your own risk.

## Accessibility

Give the loading state an accessible label outside the decorative spinner, and
set `aria-hidden="true"` on the spinner. Animations pause for `prefers-reduced-motion`.

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

- Keep the plugin registration. Replace `creator()` with ordinary HTML or framework templates.
- Replace the old structure with direct `spinner-item` children. Size now means the whole spinner.

Before:

```html
<div class="spinner-half-circle spinner-size-12"></div>
```

After:

```html
<div class="spinner-half-circle spinner-size-12" aria-hidden="true">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

See the [v1 docs](https://tw-epic-spinners-v1.mthaip.com/docs) for the previous API.

## Baseline spinners

Start with an example, then add or remove `spinner-item` elements to customize it.

### `spinner-flower`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=flower)

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

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=pixel)

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

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=hollow-dots)

```html
<div class="spinner-hollow-dots spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-intersecting-circles`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=intersecting-circles)

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

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=orbit)

```html
<div class="spinner-orbit spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-radar`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=radar)

```html
<div class="spinner-radar spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-scaling-squares`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=scaling-squares)

```html
<div class="spinner-scaling-squares spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-half-circle`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=half-circle)

```html
<div class="spinner-half-circle spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-trinity-rings`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=trinity-rings)

```html
<div class="spinner-trinity-rings spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-fulfilling-square`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=fulfilling-square)

```html
<div class="spinner-fulfilling-square spinner-size-16">
  <div class="spinner-item"></div>
</div>
```

### `spinner-circles-to-rhombuses`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=circles-to-rhombuses)

```html
<div class="spinner-circles-to-rhombuses spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-semipolar`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=semipolar)

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

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=self-building-square)

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

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=swapping-squares)

```html
<div class="spinner-swapping-squares spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-fulfilling-bouncing-circle`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=fulfilling-bouncing-circle)

```html
<div class="spinner-fulfilling-bouncing-circle spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-fingerprint`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=fingerprint)

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

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=spring)

```html
<div class="spinner-spring spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-atom`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=atom)

```html
<div class="spinner-atom spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-looping-rhombuses`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=looping-rhombuses)

```html
<div class="spinner-looping-rhombuses spinner-size-16">
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
  <div class="spinner-item"></div>
</div>
```

### `spinner-breeding-rhombus`

[Try it out](https://tw-epic-spinners.mthaip.com/labs?spinner=breeding-rhombus)

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

## Credits

Spinner designs by [EpicMax / epic-spinners](https://github.com/epicmaxco/epic-spinners). This package re-implements them as a Tailwind plugin.

## License

[MIT](./LICENSE)
