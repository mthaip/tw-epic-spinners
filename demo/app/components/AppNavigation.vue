<template>
  <nav class="navbar container !px-0">
    <div class="navbar-start gap-2">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle lg:hidden"
        >
          <span class="icon-[lucide--menu] size-6" />
        </div>
        <ClientOnly>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li
              v-for="otherRoute in otherRoutes"
              :key="otherRoute.path"
            >
              <RouterLink :to="otherRoute.path">
                <span :class="otherRoute.icon" />
                {{ otherRoute.name }}
              </RouterLink>
            </li>
            <li>
              <details>
                <summary><span class="icon-[lucide--palette]" />Themes</summary>
                <ul>
                  <li
                    v-for="theme in themes"
                    :key="theme"
                  >
                    <button
                      :class="{
                        'menu-active': theme === mode,
                      }"
                      @click="mode = theme"
                    >
                      {{ theme }}
                      <span
                        v-if="theme === mode"
                        class="icon-[lucide--check] ms-auto"
                      />
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </ClientOnly>
      </div>

      <RouterLink
        to="/"
        class="flex flex-col gap-1"
      >
        <h1 class="text-base font-bold md:text-2xl">Epic Spinners</h1>
        <div class="flex flex-row items-center gap-2">
          <span class="font-seminbold text-xs text-nowrap"> Plugin for </span>
          <Tailwindcss class="h-3" />
        </div>
      </RouterLink>

      <div class="badge badge-soft badge-accent">{{ pkg.version }}</div>
    </div>

    <div class="ml-auto flex items-center">
      <div class="hidden lg:flex">
        <RouterLink
          v-for="otherRoute in otherRoutes"
          :key="otherRoute.path"
          :to="otherRoute.path"
          class="btn btn-ghost btn-sm"
        >
          <span :class="otherRoute.icon" />
          {{ otherRoute.name }}
        </RouterLink>

        <div class="dropdown dropdown-end block">
          <button
            tabindex="0"
            class="btn btn-ghost btn-sm"
          >
            <span class="icon-[lucide--palette]" />
            Themes
          </button>
          <ClientOnly>
            <ul
              tabindex="0"
              class="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow"
            >
              <li
                v-for="theme in themes"
                :key="theme"
              >
                <button
                  :class="{
                    'menu-active': theme === mode,
                  }"
                  @click="mode = theme"
                >
                  {{ theme }}
                  <span
                    v-if="theme === mode"
                    class="icon-[lucide--check] ms-auto"
                  />
                </button>
              </li>
            </ul>
          </ClientOnly>
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
import Github from './logos/Github.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { routes } from '~/data/routes';
import Tailwindcss from './logos/Tailwindcss.vue';
import Npm from './logos/Npm.vue';

import pkg from '~~/../package.json';
import useTheme, { themes } from '~/composable/useTheme';

const vueRoute = useRoute();

const otherRoutes = computed(() => {
  return routes.filter((appRoute) => appRoute.path !== vueRoute.path);
});

const mode = useTheme();
</script>
