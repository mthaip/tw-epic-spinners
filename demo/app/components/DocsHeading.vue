<template>
  <ProseH2 v-bind="$attrs" :id="id">
    <slot />
    <UBadge v-if="id === 'composable-approach'" label="v2" color="primary" variant="soft" size="lg" class="ms-2 align-middle" />
  </ProseH2>
</template>

<script setup lang="ts">
import ProseH2 from '@nuxt/ui/components/prose/H2.vue';

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{ id?: string }>(), { id: undefined });
</script>
