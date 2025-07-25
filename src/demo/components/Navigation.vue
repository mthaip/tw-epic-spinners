<template>
  <div
    class="mx-auto mb-12 flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <slot name="left">
      <RouterLink
        to="/"
        class="flex flex-col gap-1"
      >
        <h1
          class="dark:text-whte text-xl font-bold text-violet-600 md:text-2xl dark:text-white"
        >
          Epic Spinners
        </h1>
        <div class="flex flex-row items-center gap-2">
          <span
            class="font-seminbold text-xs text-nowrap text-black dark:text-white"
          >
            Plugin for
          </span>
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
    </slot>
    <div
      class="ml-auto flex flex-row divide-x divide-gray-300 dark:divide-gray-600"
    >
      <slot name="right"></slot>

      <label class="inline-flex cursor-pointer items-center px-2">
        <input
          type="checkbox"
          :checked="isDark"
          class="peer sr-only"
          @change="toggleDark()"
        />
        <div
          class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-violet-600 peer-focus:ring-4 peer-focus:ring-violet-300 after:absolute after:start-[2px] after:top-0.5 after:flex after:h-5 after:w-5 after:items-center after:justify-center after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['\263C'] peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:content-['\263E'] rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-violet-800"
        ></div>
      </label>

      <a
        href="https://github.com/mthaip/tw-epic-spinners"
        class="mr-auto block px-2 last:pr-0"
      >
        <Github
          class="h-6 w-6 text-gray-500 transition-colors hover:text-gray-800 dark:hover:text-gray-100"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core';
import Github from './logos/Github.vue';
import tailwindLogo from '../assets/images/tailwindcss-logotype.svg';
import tailwindLogoWhite from '../assets/images/tailwindcss-logotype-white.svg';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
