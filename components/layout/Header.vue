<template>
  <UHeader title="and-shu.ru" to="/" mode="drawer">
    <UNavigationMenu :items="items" class="hidden md:flex" />

    <template #right>
      <UButton
        v-if="canInstall"
        icon="i-lucide-download"
        color="primary"
        variant="subtle"
        size="sm"
        :label="installLabel"
        :square="!installLabel"
        :aria-label="installLabel ? undefined : 'Установить приложение'"
        @click="onInstall"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5 md:hidden" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineOptions({
  name: 'LayoutHeader',
})

const route = useRoute()
const { canInstall, install } = useInstallPrompt()

// Tailwind sm = 640px. На мобиле — иконка-only, на sm+ — с лейблом.
const isSmUp = useMediaQuery('(min-width: 640px)')
const installLabel = computed(() => (isSmUp.value ? 'Установить' : undefined))

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Главная',
    to: '/',
    icon: 'i-lucide-house',
    active: route.path === '/',
  },
  {
    label: 'Таймлайн',
    to: '/timeline',
    icon: 'i-lucide-history',
    active: route.path.startsWith('/timeline'),
  },
])

const onInstall = async () => {
  await install()
}
</script>
