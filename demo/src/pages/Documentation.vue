<template>
  <BaseLayout>
    <Markdown
      class="container"
      :raw="readme"
    />
  </BaseLayout>
</template>

<script setup lang="ts">
import readme from '../../../docs/documentation.md?raw';
import Markdown from '../components/Markdown.vue';
import BaseLayout from '../layouts/BaseLayout.vue';
</script>
