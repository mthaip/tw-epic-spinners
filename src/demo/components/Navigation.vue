<template>
  <nav class="navbar container">
    <RouterLink
      to="/"
      class="flex flex-col gap-1"
    >
      <h1 class="text-xl font-bold md:text-2xl">Epic Spinners</h1>
      <div class="flex flex-row items-center gap-2">
        <span class="font-seminbold text-xs text-nowrap"> Plugin for </span>
        <img
          :src="tailwindLogo"
          alt="tailwindcss logo"
          class="h-3 dark:hidden"
        />
        <img
          :src="tailwindLogoWhite"
          alt="tailwindcss logo"
          class="hidden h-3 dark:block"
        />
      </div>
    </RouterLink>

    <div class="ml-auto flex items-center">
      <ul class="menu menu-horizontal">
        <li v-for="otherRoute in otherRoutes">
          <RouterLink :to="otherRoute.path">
            {{ otherRoute.name }}
          </RouterLink>
        </li>
      </ul>

      <div class="dropdown">
        <button class="btn btn-ghost">
          <span class="material-symbols-outlined"> colors </span>{{ mode }}
        </button>
        <ul
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow"
        >
          <li v-for="theme in themes">
            <button @click="mode = theme">{{ theme }}</button>
          </li>
        </ul>
      </div>

      <a
        href="https://github.com/mthaip/tw-epic-spinners"
        class="btn btn-ghost btn-square"
      >
        <Github class="size-6" />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import Github from './logos/Github.vue';
import tailwindLogo from '../assets/images/tailwindcss-logotype.svg';
import tailwindLogoWhite from '../assets/images/tailwindcss-logotype-white.svg';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { routes } from '../main';

const vueRoute = useRoute();

const otherRoutes = computed(() => {
  return routes.filter((appRoute) => appRoute.path !== vueRoute.path);
});

const themes = {
  light: 'light',
  dark: 'dark',
  corporate: 'corporate',
  synthwave: 'synthwave',
  retro: 'retro',
  cyberpunk: 'cyberpunk',
  valentine: 'valentine',
  halloween: 'halloween',
  aqua: 'aqua',
  luxury: 'luxury',
  coffee: 'coffee',
} as const;

const mode = useColorMode({
  attribute: 'data-theme',
  modes: themes,
});
</script>
