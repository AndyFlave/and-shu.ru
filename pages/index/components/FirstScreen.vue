<template>
  <section class="relative flex min-h-[calc(100dvh-var(--ui-header-height))] w-full items-center overflow-hidden py-10 sm:py-14">
    <div
      class="pointer-events-none absolute inset-x-0 top-[-14rem] mx-auto h-[28rem] max-w-3xl rounded-full bg-primary/10 blur-3xl sm:top-[-18rem] sm:h-[34rem] sm:max-w-5xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[34rem] sm:w-[34rem]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] sm:h-[48rem] sm:w-[48rem]"
      aria-hidden="true"
    />
    <UContainer>
      <div class="relative mx-auto max-w-4xl text-center">
        <!-- Подпись-идентификатор сверху -->
        <p class="font-mono text-[10px] uppercase tracking-[0.28em] text-muted sm:text-[11px] sm:tracking-[0.34em]">
          shushunov_andrey
        </p>

        <!-- Тонкий разделитель -->
        <span
          class="mx-auto mt-4 block h-px w-14 bg-gradient-to-r from-transparent via-primary/70 to-transparent sm:mt-5 sm:w-16"
          aria-hidden="true"
        />

        <!-- H1 — имя -->
        <h1
          class="mx-auto mt-7 max-w-[12ch] font-display text-3xl font-medium leading-tight tracking-tight text-highlighted drop-shadow-[0_0_32px_rgba(255,255,255,0.12)] sm:mt-8 sm:max-w-none sm:whitespace-nowrap sm:text-5xl md:text-6xl"
        >
          Андрей Шушунов
        </h1>

        <!-- Подзаголовок-загадка -->
        <div class="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-4 border-y border-white/10 py-4 sm:mt-7 sm:gap-5 sm:border-y-0 sm:py-0">
          <span
            class="hidden h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-white/20 sm:block"
            aria-hidden="true"
          />
          <p
            class="max-w-xl text-balance font-serif text-[14px] leading-7 text-toned/90 sm:text-base sm:leading-8"
          >
            То, что не было зафиксировано — исчезает быстрее.
          </p>
          <span
            class="hidden h-px w-10 shrink-0 bg-gradient-to-l from-transparent to-white/20 sm:block"
            aria-hidden="true"
          />
        </div>

        <!-- Вход -->
        <div class="mt-8 flex justify-center sm:mt-10">
          <UButton
            to="/timeline"
            icon="i-lucide-history"
            label="Открыть таймлайн"
            color="primary"
            variant="solid"
            size="lg"
            class="w-full max-w-xs justify-center sm:w-auto"
          />
        </div>

        <!-- Социальные сети -->
        <ul
          class="mt-7 flex flex-wrap items-center justify-center gap-1.5 sm:mt-8 sm:gap-2"
          aria-label="Социальные сети"
        >
          <li v-for="link in socialLinks" :key="link.label">
            <UButton
              :to="link.href"
              :icon="link.icon"
              :aria-label="link.label"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'nofollow noreferrer' : undefined"
              color="neutral"
              variant="ghost"
              size="md"
              square
              class="text-muted hover:text-highlighted"
            />
          </li>
        </ul>

        <!-- Направления -->
        <ul
          class="mt-12 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:mt-16 sm:gap-x-3 sm:text-[10px] sm:tracking-[0.18em]"
          aria-label="Направления"
        >
          <template v-for="(direction, idx) in directions" :key="direction">
            <li v-if="idx > 0" class="hidden text-default/50 sm:inline" aria-hidden="true">·</li>
            <li>{{ direction }}</li>
          </template>
        </ul>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type SocialLink = {
  label: string
  href: string
  icon: string
  external?: boolean
}

const { contactEmail } = useRuntimeConfig().public

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shushunov-andrey/',
    icon: 'i-simple-icons-linkedin',
    external: true,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/shushunov_andrey',
    icon: 'i-simple-icons-telegram',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/shushunov_andrey/',
    icon: 'i-simple-icons-instagram',
    external: true,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/shushunovAndrey/',
    icon: 'i-simple-icons-facebook',
    external: true,
  },
  {
    label: 'VKontakte',
    href: 'https://vk.com/shushunov_aa',
    icon: 'i-simple-icons-vk',
    external: true,
  },
  {
    label: 'Email',
    href: `mailto:${contactEmail}`,
    icon: 'i-lucide-mail',
  },
]

// Направления — поправь под себя.
const directions = [
  'frontend',
  'systems',
  'products',
  'craft',
  'time',
]
</script>
