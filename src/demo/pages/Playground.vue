<template>
  <div class="page-container">
    <Navigation />

    <div class="text-violet-600 dark:text-white">
      <div class="flex flex-col gap-4 md:flex-row">
        <div>
          <label
            for="spinners-select"
            class="mb-2 block font-mono text-sm text-black dark:text-white"
          >
            spinner-*
          </label>
          <select
            id="spinners-select"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-800 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
            @change="
              selectedSpinner =
                (($event.target as HTMLSelectElement)?.value as Spinner) ||
                undefined
            "
          >
            <option
              v-for="spinner in spinners"
              :value="spinner"
              :selected="spinner === selectedSpinner"
            >
              {{ spinner }}
            </option>
          </select>
        </div>

        <div class="flex-1">
          <label
            for="spinner-styles-input"
            class="mb-2 block font-mono text-sm text-black dark:text-white"
          >
            class="..."
          </label>
          <input
            type="text"
            id="spinner-styles-input"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black placeholder:font-mono focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
            placeholder="spinner-size-* | spinner-duration-* | text-violet-*"
            @input="
              inputStyles = ($event.target as HTMLInputElement)?.value || ''
            "
            :value="inputStyles"
          />
        </div>
      </div>

      <div class="mt-4 text-sm font-light text-red-600">
        Playground does not support arbitrary values!
      </div>

      <div
        v-if="!!spinnerComponent"
        class="mt-16 flex items-center justify-center"
      >
        <component
          :is="spinnerComponent"
          :class="dInputStyles"
        />
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { refDebounced } from '@vueuse/core';

import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';

import spinners from '../data/spinners.ts';
import { computed, ref } from 'vue';
import { creator, type Spinner } from '../../index.ts';

const selectedSpinner = ref<Spinner | undefined>(spinners[0]);

const spinnerComponent = computed(() => {
  if (selectedSpinner.value) {
    return creator(selectedSpinner.value);
  }

  return null;
});

const inputStyles = ref<string>('');

const dInputStyles = refDebounced(inputStyles, 500);
</script>
