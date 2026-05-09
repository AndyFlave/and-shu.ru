<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="visible"
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      class="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl sm:inset-x-4 sm:bottom-4"
    >
      <div
        class="rounded-xl border border-default/80 bg-elevated/95 p-4 shadow-lg backdrop-blur sm:p-5"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <p class="text-sm text-toned">
            Сайт использует cookie и сервис веб-аналитики Яндекс.Метрика для улучшения работы сайта.
            Подробнее — в
            <NuxtLink to="/privacy" class="text-primary underline-offset-2 hover:underline">
              политике конфиденциальности
            </NuxtLink>.
          </p>

          <div class="flex shrink-0 items-center gap-2">
            <UButton
              label="Отклонить"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="onDecline"
            />
            <UButton
              label="Принять"
              color="primary"
              size="sm"
              @click="onAccept"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// load() вызывается из plugins/yandex-metrika.client.ts (единый источник истины).
const { consent, hydrated, accept, decline } = useCookieConsent()

const visible = computed(() => hydrated.value && consent.value === null)

const onAccept = () => accept()
const onDecline = () => decline()
</script>
