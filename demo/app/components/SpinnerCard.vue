<template>
  <UPageCard
    as="button"
    type="button"
    :title="`spinner-${spinner.name}`"
    reverse
    class="group aspect-3/4 enabled:cursor-pointer"
    :ui="{ container: 'h-full lg:flex', wrapper: 'flex-none items-center', body: 'flex-none w-full', title: 'text-center' }"
    :aria-label="`View spinner-${spinner.name} HTML`"
    aria-haspopup="dialog"
    @click="viewCode"
  >
    <div ref="preview" class="flex flex-1 items-center justify-center text-primary transition-transform duration-200 motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110">
      <SpinnerPreview
        :name="spinner.name"
        :count="spinner.count"
        class="spinner-size-16 spinner-duration-[2.5s]"
      />
    </div>
  </UPageCard>
</template>

<script setup lang="ts">
import type { SpinnerDefinition, SpinnerName } from '~/data/spinners';
const props = defineProps<{ spinner: SpinnerDefinition }>();
const emit = defineEmits<{ 'view-code': [element: Element, name: SpinnerName, trigger: HTMLElement] }>();
const preview = useTemplateRef<HTMLElement>('preview');
const viewCode = (event: MouseEvent) => {
  const element = preview.value?.firstElementChild;
  if (element && event.currentTarget instanceof HTMLElement) {
    emit('view-code', element, props.spinner.name, event.currentTarget);
  }
};
</script>
