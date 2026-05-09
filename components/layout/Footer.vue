<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} and-shu.ru
      </p>
    </template>

    <UNavigationMenu :items="items" variant="link" class="hidden md:flex" />

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/shushunov-andrey"
        target="_blank"
        rel="nofollow noreferrer"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineOptions({
  name: 'LayoutFooter',
})

const items: NavigationMenuItem[] = [
  { label: 'Главная', to: '/' },
  { label: 'Таймлайн', to: '/timeline' },
  { label: 'Политика конфиденциальности', to: '/privacy' },
]
</script>
