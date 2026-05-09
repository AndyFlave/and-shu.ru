<template>
  <section class="py-12">
    <UContainer>
      <header v-if="title || subtitle" class="mb-6 space-y-2">
        <component :is="titleTag" v-if="title" class="text-2xl font-semibold text-highlighted">
          {{ title }}
        </component>

        <p v-if="subtitle" class="text-toned">
          {{ subtitle }}
        </p>
      </header>

      <slot />
    </UContainer>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    titleTag?: string
    subtitle?: string
  }>(),
  {
    title: '',
    titleTag: 'h2',
    subtitle: '',
  }
)
</script>
