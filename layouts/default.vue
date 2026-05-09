<template>
  <div
    class="relative flex min-h-dvh flex-col bg-default"
    :class="{ 'overflow-hidden': overflowHidden }"
  >
    <SpaceBackground :enabled="true" :fullscreen="true" />
    <LayoutHeader />

    <UMain class="relative z-10" :class="{ 'py-8': mainPadding }">
      <slot />
    </UMain>

    <LayoutFooter />

    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const mainPadding = computed(() => route.meta.mainPadding !== false)
const overflowHidden = computed(() => route.meta.overflowHidden === true)
</script>
