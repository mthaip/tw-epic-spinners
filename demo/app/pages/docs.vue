<template>
  <Markdown
    class="container"
    :raw="readme"
  />
</template>

<script setup lang="ts">
import readme from '../../../docs/documentation.md?raw';
</script>
