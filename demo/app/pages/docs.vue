<script setup lang="ts">
const { data: content } = await useAsyncData('app-documentation', () =>
  queryCollection('content').path('/documentation').first(),
);

const tocLinks = computed(() => content.value?.body.toc?.links);
</script>

<template>
  <section class="relative container flex gap-4">
    <ul
      v-if="tocLinks"
      class="menu bg-base-200 rounded-box sticky top-8 h-fit max-md:hidden"
    >
      <ContentTocLink
        v-for="link in tocLinks"
        :key="link.id"
        :link="link"
      />
    </ul>
    <ContentRenderer
      v-if="content"
      class="prose"
      :value="content"
    />
  </section>
</template>
