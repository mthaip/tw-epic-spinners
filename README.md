# Tailwindcss Epic Spinners

This library is the Tailwind integration of [epic-spinners](http://epic-spinners.epicmax.co/) by [EpicMax](https://github.com/epicmaxco/epic-spinners)

## Installation

```bash
npm install --save-dev tw-epic-spinners

# Or use Yarn

yarn add -D tw-epic-spinners
```

## Demo

An online demo is available [here](https://tw-epic-spinners.mthaip.com)

## Usage

Add the Plug-In in your `tailwind.config.ts`:

```javascript
import spinners from 'tw-epic-spinners';

export default {
  // Other configs
  plugins: [spinners],
};
```

## How to use

### Spinners

- `spinner-flower`

```html
<div class="spinner-flower">
  <div class="shape">
    <div>
      <div></div>
    </div>
  </div>
</div>
```

- `spinner-pixel`

```html
<div class="spinner-pixel">
  <div class="shape"></div>
</div>
```

- `spinner-hollow-dots`

```html
<div class="spinner-hollow-dots">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-intersecting-circles`

```html
<div class="spinner-intersecting-circles">
  <div class="shape-container">
    <span class="shape"></span>
    <span class="shape"></span>
    <span class="shape"></span>
    <span class="shape"></span>
    <span class="shape"></span>
    <span class="shape"></span>
    <span class="shape"></span>
  </div>
</div>
```

- `spinner-orbit`

```html
<div class="spinner-orbit">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-radar`

```html
<div class="spinner-radar">
  <div class="shape">
    <div>
      <div></div>
    </div>
  </div>
  <div class="shape">
    <div>
      <div></div>
    </div>
  </div>
  <div class="shape">
    <div>
      <div></div>
    </div>
  </div>
  <div class="shape">
    <div>
      <div></div>
    </div>
  </div>
</div>
```

- `spinner-scaling-squares`

```html
<div class="spinner-scaling-squares">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-half-circle`

```html
<div class="spinner-half-circle">
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-trinity-rings`

```html
<div class="spinner-trinity-rings">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-fulfilling-square`

```html
<div class="spinner-fulfilling-square">
  <div class="shape"></div>
</div>
```

- `spinner-circles-to-rhombuses`

```html
<div class="spinner-circles-to-rhombuses">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-semipolar`

```html
<div class="spinner-semipolar">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-self-building-square`

```html
<div class="spinner-self-building-square">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape clear"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape clear"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-swapping-squares`

```html
<div class="spinner-swapping-squares">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-fulfilling-bouncing-circle`

```html
<div class="spinner-fulfilling-bouncing-circle">
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-fingerprint`

```html
<div class="spinner-fingerprint">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-spring`

```html
<div class="spinner-spring">
  <div class="shape">
    <div></div>
  </div>
  <div class="shape">
    <div></div>
  </div>
</div>
```

- `spinner-atom`

```html
<div class="spinner-atom">
  <div class="shape">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

- `spinner-looping-rhombuses`

```html
<div class="spinner-looping-rhombuses">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

- `spinner-breeding-rhombus`

```html
<div class="spinner-breeding-rhombus">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape"></div>
</div>
```

### Utility

#### Size

The `spinner-size-*` utility class allows you to quickly define the size of a spinner.

It follows a similar pattern to [Tailwind CSS spacing](https://tailwindcss.com/docs/theme#spacing) utilities.

```html
<div class="spinner-fulfilling-square spinner-size-16">
  <div class="shape"></div>
</div>
```

Using arbitrary values:

```html
<div class="spinner-fulfilling-square spinner-size-[70px]">
  <div class="shape"></div>
</div>
```

#### Duration

The `spinner-duration-*` utility class allows you control the duration.

It follows also a similar pattern to [Tailwind CSS Transition duration](https://tailwindcss.com/docs/transition-duration) utilities.

```html
<div class="spinner-fulfilling-square spinner-duration-1000">
  <div class="shape"></div>
</div>
```

Using arbitrary values:

```html
<div class="spinner-fulfilling-square spinner-duration-[2.5s]">
  <div class="shape"></div>
</div>
```

## License

[MIT](./LICENSE) License