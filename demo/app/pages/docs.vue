<script setup lang="ts">
import DocsCodeBlock from '~/components/DocsCodeBlock.vue';
import DocsHeading from '~/components/DocsHeading.vue';

const { data: content, error } = await useAsyncData('app-documentation', () =>
  queryCollection('content').path('/documentation').first(),
);
if (error.value) throw createError(error.value);
if (!content.value) throw createError({ statusCode: 404, statusMessage: 'Documentation not found' });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageBody>
        <UContentToc :links="content?.body.toc?.links" class="lg:hidden" />
        <ContentRenderer v-if="content" :value="content" :components="{ pre: DocsCodeBlock, h2: DocsHeading }" />
      </UPageBody>
      <template #right>
        <UContentToc :links="content?.body.toc?.links" class="hidden lg:block" />
      </template>
    </UPage>
  </UContainer>
</template>
