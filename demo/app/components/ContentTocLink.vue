<!-- This is a recursive component for rendering table of contents links -->
<template>
  <li>
    <a
      :href="href"
      :class="{ 'menu-active': isActive }"
    >
      {{ link.text }}
    </a>
    <ul v-if="link.children">
      <ContentTocLink
        v-for="child in link.children"
        :key="child.id"
        :link="child"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import type { TocLink } from '@nuxt/content';

const { link } = defineProps<{ link: TocLink }>();

const href = `#${link.id}`;

const route = useRoute();
const isActive = ref<boolean>(false);

watch(route, (newRoute) => {
  isActive.value = newRoute.hash === href;
});

onMounted(() => {
  isActive.value = route.hash === href;
});
</script>
