# Tailwind CSS Epic Spinners

This library is the Tailwind CSS Plugin of [epic-spinners](http://epic-spinners.epicmax.co/) by [EpicMax](https://github.com/epicmaxco/epic-spinners)

## Installation

```bash
npm install --save-dev tw-epic-spinners

# Or use Yarn

yarn add -D tw-epic-spinners
```

## Usage

Then, when using Tailwind CSS v4, add the plugin to your main stylesheet:

```css
/* Your main css file */
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

## Documentation

For complete documentation, please visit [official website](https://tw-epic-spinners.mthaip.com/docs).

## License

[MIT](./LICENSE) License