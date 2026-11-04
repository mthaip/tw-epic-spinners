<script setup lang="ts">
import DocsCodeBlock from '~/components/DocsCodeBlock.vue';
import DocsHeading from '~/components/DocsHeading.vue';
import DocsLink from '~/components/DocsLink.vue';

const { data: content, error } = await useAsyncData('app-documentation', () =>
  queryCollection('content').path('/documentation').first(),
);
if (error.value) throw createError(error.value);
if (!content.value) throw createError({ statusCode: 404, statusMessage: 'Documentation not found' });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Documentation"
        :links="[{ label: 'Read as Markdown', icon: 'i-lucide-file-text', to: '/docs.md', external: true }]"
      />
      <UPageBody>
        <UContentToc color="neutral" :links="content?.body.toc?.links" class="lg:hidden" />
        <ContentRenderer v-if="content" :value="content" :components="{ pre: DocsCodeBlock, h2: DocsHeading, a: DocsLink }" />
      </UPageBody>
      <template #right>
        <UContentToc color="neutral" :links="content?.body.toc?.links" class="hidden lg:block" />
      </template>
    </UPage>
  </UContainer>
</template>
