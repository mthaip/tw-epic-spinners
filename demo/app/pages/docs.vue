<script setup lang="ts">
const { data: content } = await useAsyncData('app-documentation', () =>
  queryCollection('content').path('/documentation').first(),
);

const tocLinks = computed(() => content.value?.body.toc?.links);

const inThisPageDrawerId = useId();
</script>

<template>
  <section class="relative container flex max-md:flex-col">
    <template v-if="tocLinks">
      <ul
        class="menu bg-base-200 rounded-box sticky top-8 me-4 h-fit max-md:hidden"
      >
        <ContentTocLink
          v-for="link in tocLinks"
          :key="link.id"
          :link="link"
        />
      </ul>

      <label
        :for="inThisPageDrawerId"
        class="drawer-button btn btn-sm sticky top-4 w-full md:hidden"
      >
        In this page
        <span class="icon-[lucide--table-of-contents]" />
      </label>
      <div class="drawer drawer-end md:hidden">
        <input
          :id="inThisPageDrawerId"
          type="checkbox"
          class="drawer-toggle"
        />
        <div class="drawer-side">
          <label
            :for="inThisPageDrawerId"
            aria-label="close sidebar"
            class="drawer-overlay"
          />
          <ul class="menu bg-base-200 min-h-full">
            <ContentTocLink
              v-for="link in tocLinks"
              :key="link.id"
              :link="link"
            />
          </ul>
        </div>
      </div>
    </template>

    <ContentRenderer
      v-if="content"
      class="prose max-md:prose-h2:mb-2 max-md:prose-h2:mt-4 max-md:prose-sm overflow-x-auto"
      :value="content"
    />
  </section>
</template>
