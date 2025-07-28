<template>
  <nav class="navbar container">
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle me-1 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li v-for="otherRoute in otherRoutes">
            <RouterLink :to="otherRoute.path">
              <span class="material-symbols-outlined">
                {{ otherRoute.icon }}
              </span>
              {{ otherRoute.name }}
            </RouterLink>
          </li>
          <li>
            <details>
              <summary>
                <span class="material-symbols-outlined"> colors </span>Themes
              </summary>
              <ul>
                <li v-for="theme in themes">
                  <button
                    @click="mode = theme"
                    :class="{
                      'menu-active': theme === mode,
                    }"
                  >
                    {{ theme }}
                    <span
                      v-if="theme === mode"
                      class="material-symbols-outlined ms-auto"
                    >
                      check
                    </span>
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <RouterLink
        to="/"
        class="flex flex-col gap-1"
      >
        <h1 class="text-xl font-bold md:text-2xl">Epic Spinners</h1>
        <div class="flex flex-row items-center gap-2">
          <span class="font-seminbold text-xs text-nowrap"> Plugin for </span>
          <Tailwindcss class="h-3" />
        </div>
      </RouterLink>
    </div>

    <div class="ml-auto flex items-center">
      <div class="hidden lg:flex">
        <RouterLink
          v-for="otherRoute in otherRoutes"
          :to="otherRoute.path"
          class="btn btn-ghost btn-sm"
        >
          <span class="material-symbols-outlined">
            {{ otherRoute.icon }}
          </span>
          {{ otherRoute.name }}
        </RouterLink>

        <div class="dropdown dropdown-end block">
          <button
            tabindex="0"
            class="btn btn-ghost btn-sm gap-0"
          >
            <span class="material-symbols-outlined"> colors </span>
            Themes
          </button>
          <ul
            tabindex="0"
            class="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow"
          >
            <li v-for="theme in themes">
              <button
                @click="mode = theme"
                :class="{
                  'menu-active': theme === mode,
                }"
              >
                {{ theme }}
                <span
                  v-if="theme === mode"
                  class="material-symbols-outlined ms-auto"
                >
                  check
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <a
        href="https://github.com/mthaip/tw-epic-spinners"
        class="btn btn-ghost btn-square"
      >
        <Github class="size-6" />
      </a>

      <a
        href="https://www.npmjs.com/package/tw-epic-spinners"
        class="btn btn-ghost btn-square"
      >
        <Npm class="size-6" />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import Github from './logos/Github.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { routes } from '../main';
import Tailwindcss from './logos/Tailwindcss.vue';
import Npm from './logos/Npm.vue';

const vueRoute = useRoute();

const otherRoutes = computed(() => {
  return routes.filter((appRoute) => appRoute.path !== vueRoute.path);
});

const themes = {
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

const mode = useColorMode({
  attribute: 'data-theme',
  modes: themes,
});
</script>
