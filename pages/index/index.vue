<template>
  <div class="relative">
    <FirstScreen />
  </div>
</template>

<script setup lang="ts">
import FirstScreen from './components/FirstScreen.vue'

definePageMeta({
  layout: 'default',
  mainPadding: false,
  overflowHidden: true,
})
</script>
