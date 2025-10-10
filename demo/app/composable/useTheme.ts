import { useColorMode } from '@vueuse/core';

export const colorModeKey = 'vueuse-color-mode';

export const themes = {
  light: 'light',
  dark: 'dark',
  cupcake: 'cupcake',
  emerald: 'emerald',
  synthwave: 'synthwave',
  cyberpunk: 'cyberpunk',
  valentine: 'valentine',
  halloween: 'halloween',
  aqua: 'aqua',
  fantasy: 'fantasy',
  luxury: 'luxury',
  coffee: 'coffee',
  dracula: 'dracula',
  cmyk: 'cmyk',
  autumn: 'autumn',
  lemonade: 'lemonade',
  night: 'night',
  caramellatte: 'caramellatte',
  abyss: 'abyss',
} as const;

type Theme = keyof typeof themes;

export default function useTheme() {
  const colorModeCookie = useCookie<Theme>(colorModeKey, {
    default: () => themes.light,
    // Writable cookie - https://nuxt.com/docs/4.x/api/composables/use-cookie#writable-cookies
    watch: 'shallow',
  });

  return useColorMode({
    attribute: 'data-theme',
    modes: themes,
    storageKey: colorModeKey,
    initialValue: colorModeCookie.value,
    // Use cookie as storage to support SSR
    storage: {
      getItem: () => {
        return colorModeCookie.value ?? null;
      },
      setItem: (_, value: string) => {
        colorModeCookie.value = value as Theme;
      },
      removeItem: () => {
        colorModeCookie.value = themes.light;
      },
    },
  });
}
