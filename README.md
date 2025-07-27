# Tailwind CSS Epic Spinners

This library is the Tailwind CSS Plugin of [epic-spinners](http://epic-spinners.epicmax.co/) by [EpicMax](https://github.com/epicmaxco/epic-spinners)

## Installation

```bash
npm install --save-dev tw-epic-spinners

# Or use Yarn

yarn add -D tw-epic-spinners
```

## Demo

An online demo is available [here](https://tw-epic-spinners.mthaip.com)

## Usage

Then, when using Tailwind CSS v4, add the plugin to your main stylesheet:

```css
/* app.css */
@import "tailwindcss";
@plugin "tw-epic-spinners";
```

If you are still using Tailwind CSS v3, add the plugin to your `tailwind.config.js` file:

```javascript
import spinners from 'tw-epic-spinners';

export default {
  // Other configs
  plugins: [spinners],
};
```

## How to use

### `creator(spinner, classes?) => string`

Returns an HTML string for a given spinner type, which can be injected into your UI.

#### Parameters

- `spinner` (`string`): `flower`, `pixel`, `hollow-dots`, `intersecting-circles`, `orbit`, `radar`, `scaling-squares`, `half-circle`, `trinity-rings`, `fulfilling-square`, `circles-to-rhombuses`, `semipolar`, `self-building-square`, `swapping-squares`, `fulfilling-bouncing-circle`, `fingerprint`, `spring`, `atom`, `looping-rhombuses` or `breeding-rhombus`.

- `classes` (`string | string[]`, optional): Additional classes to apply to the spinner wrapper. Can be a string or array of Tailwind utility classes.

#### Returns

- `string`: HTML markup string representing the selected spinner.

#### Usage Examples

##### Vue

```vue
<template>
  <div v-html="spinnerHTML" />
</template>

<script setup>
import { creator } from '@/lib/spinners';

const spinnerHTML = creator('half-circle', ['spinner-size-12', 'sm:spinner-size-16', 'spinner-duration-[2.5s]']);
</script>
```

##### React

```tsx
const Spinner = () => {
  const html = creator('half-circle', 'spinner-size-12 sm:spinner-size-16 spinner-duration-[2.5s]');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Spinner;
```


### Spinners

- `spinner-flower`

```html
<div class="spinner-flower">
  <div>
    <div />
  </div>
</div>
```

- `spinner-pixel`

```html
<div class="spinner-pixel" />
```

- `spinner-hollow-dots`

```html
<div class="spinner-hollow-dots">
  <div />
  <div />
  <div />
</div>
```

- `spinner-intersecting-circles`

```html
<div class="spinner-intersecting-circles">
  <div>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
</div>
```

- `spinner-orbit`

```html
<div class="spinner-orbit">
  <div />
  <div />
  <div />
</div>
```

- `spinner-radar`

```html
<div class="spinner-radar">
  <div>
    <div />
  </div>
  <div>
    <div />
  </div>
  <div>
    <div />
  </div>
  <div>
    <div />
  </div>
</div>
```

- `spinner-scaling-squares`

```html
<div class="spinner-scaling-squares">
  <div />
  <div />
  <div />
  <div />
</div>
```

- `spinner-half-circle`

```html
<div class="spinner-half-circle" />
```

- `spinner-trinity-rings`

```html
<div class="spinner-trinity-rings">
  <div />
  <div />
  <div />
</div>
```

- `spinner-fulfilling-square`

```html
<div class="spinner-fulfilling-square" />
```

- `spinner-circles-to-rhombuses`

```html
<div class="spinner-circles-to-rhombuses">
  <div />
  <div />
  <div />
</div>
```

- `spinner-semipolar`

```html
<div class="spinner-semipolar">
  <div />
  <div />
  <div />
  <div />
  <div />
</div>
```

- `spinner-self-building-square`

```html
<div class="spinner-self-building-square">
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
</div>
```

- `spinner-swapping-squares`

```html
<div class="spinner-swapping-squares">
  <div />
  <div />
  <div />
  <div />
</div>
```

- `spinner-fulfilling-bouncing-circle`

```html
<div class="spinner-fulfilling-bouncing-circle" />
```

- `spinner-fingerprint`

```html
<div class="spinner-fingerprint">
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
</div>
```

- `spinner-spring`

```html
<div class="spinner-spring">
  <div />
  <div />
</div>
```

- `spinner-atom`

```html
<div class="spinner-atom">
  <div>
    <div />
    <div />
    <div />
  </div>
</div>
```

- `spinner-looping-rhombuses`

```html
<div class="spinner-looping-rhombuses">
  <div />
  <div />
  <div />
</div>
```

- `spinner-breeding-rhombus`

```html
<div class="spinner-breeding-rhombus">
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
</div>
```

### Utility

#### Size

The `spinner-size-*` utility class allows you to quickly define the size of a spinner.

It follows a similar pattern to [Tailwind CSS spacing](https://tailwindcss.com/docs/theme#spacing) utilities.

```html
<div class="spinner-fulfilling-square spinner-size-16" />
```

Using arbitrary values:

```html
<div class="spinner-fulfilling-square spinner-size-[70px]" />
```

#### Duration

The `spinner-duration-*` utility class allows you control the duration.

It follows also a similar pattern to [Tailwind CSS Transition duration](https://tailwindcss.com/docs/transition-duration) utilities.

```html
<div class="spinner-fulfilling-square spinner-duration-1000" />
```

Using arbitrary values:

```html
<div class="spinner-fulfilling-square spinner-duration-[2.5s]" />
```

#### Color

Color can be controlled by [Tailwind CSS Text Color utility](https://tailwindcss.com/docs/text-color).

```html
<div class="spinner-fulfilling-square text-sky-600" />
```

## License

[MIT](./LICENSE) License