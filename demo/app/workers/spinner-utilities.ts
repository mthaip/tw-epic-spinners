import { compile } from 'tailwindcss';
import themeCss from 'tailwindcss/theme.css?raw';
import plugin from 'tw-epic-spinners';

// Use the real plugin/compiler in a worker, rather than duplicating its rules
// in the editor or safelisting a fixed range of possible sizes and durations.
const compiler = compile(`${themeCss}\n@plugin "tw-epic-spinners";\n@tailwind utilities;`, {
  loadModule: async (id) => ({ path: id, base: '/', module: plugin }),
});

self.onmessage = async ({ data }: MessageEvent<{ id: number; classes: string[] }>) => {
  try {
    const css = (await compiler).build(data.classes);
    self.postMessage({ id: data.id, css });
  }
  catch {
    self.postMessage({ id: data.id, error: 'Unable to compile spinner utilities.' });
  }
};
