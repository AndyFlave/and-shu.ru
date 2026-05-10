<template>
  <div
    class="flex flex-col"
    :style="{
      minHeight: 'calc(100dvh - var(--ui-header-height))',
    }"
  >
    <UContainer class="flex flex-1 flex-col py-6 sm:py-8">
      <div
        class="grid flex-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12"
      >
        <!-- ЛЕВАЯ КОЛОНКА: контент + статистика -->
        <aside class="flex min-h-0 flex-col gap-6">
          <header class="space-y-3">
            <UBadge color="primary" variant="soft" label="Memento mori" size="md" />
            <h1
              class="text-3xl font-semibold leading-[1.05] tracking-tight text-highlighted sm:text-4xl xl:text-5xl"
            >
              Карта жизни в неделях
            </h1>
            <p class="max-w-md text-sm leading-relaxed text-toned sm:text-base">
              Каждая клетка — одна неделя. В одном ряду — 52 недели,
              что равно одному году жизни. Прошедшие недели подсвечены,
              текущая выделена отдельным цветом.
            </p>
            <p class="max-w-md text-sm leading-relaxed text-muted">
              Введите свою дату рождения — и получите свою личную карту времени.
            </p>
          </header>

          <div class="flex flex-wrap items-center gap-2">
            <UButton
              :label="isCustomized ? 'Изменить данные' : 'Построить свою карту времени'"
              :icon="isCustomized ? 'i-lucide-pencil' : 'i-lucide-sparkles'"
              color="primary"
              size="lg"
              class="shadow-sm transition hover:shadow-md"
              @click="settingsOpen = true"
            />
            <UButton
              v-if="isCustomized"
              icon="i-lucide-rotate-ccw"
              color="neutral"
              variant="ghost"
              size="lg"
              square
              aria-label="Сбросить к дефолтным данным"
              @click="reset"
            />
          </div>

          <!-- СТАТИСТИКА -->
          <section class="space-y-3 border-t border-default/60 pt-4">
            <!-- Эмоциональный заголовок с акцентом на «осталось» -->
            <div class="space-y-1">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Впереди
              </p>
              <p class="font-mono text-3xl font-bold leading-none text-success sm:text-4xl">
                {{ metrics.remainingWeeks.toLocaleString('ru-RU') }}
                <span class="ml-1 text-base font-medium text-toned">недель</span>
              </p>
              <p class="text-xs text-muted">
                {{ remainingMottoText }}
              </p>
            </div>

            <!-- Большие проценты: акцент на «Прожито / Осталось» -->
            <div class="space-y-2">
              <div class="flex items-end justify-between gap-3">
                <div>
                  <p class="text-[10px] font-medium uppercase tracking-wider text-muted">
                    Прожито
                  </p>
                  <p class="font-mono text-2xl font-bold leading-none text-primary sm:text-3xl">
                    {{ metrics.livedPercent.toFixed(1) }}<span class="text-base font-medium">%</span>
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-medium uppercase tracking-wider text-muted">
                    Осталось
                  </p>
                  <p class="font-mono text-2xl font-bold leading-none text-success sm:text-3xl">
                    {{ metrics.remainingPercent.toFixed(1) }}<span class="text-base font-medium">%</span>
                  </p>
                </div>
              </div>

              <div
                class="h-2 w-full overflow-hidden rounded-full bg-elevated/80"
                role="progressbar"
                :aria-valuenow="metrics.livedPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="`Прожито ${metrics.livedPercent.toFixed(1)}%`"
              >
                <div
                  class="h-full rounded-full bg-primary transition-[width] duration-500"
                  :style="{ width: `${metrics.livedPercent}%` }"
                />
              </div>

              <p class="text-right text-[11px] text-muted">
                Возраст
                <span class="font-mono text-toned">{{ metrics.age }}</span>
                /
                <span class="font-mono text-toned">{{ lifespanYears }}</span>
              </p>
            </div>

            <!-- Компактная таблица: прожито / осталось -->
            <div class="overflow-hidden rounded-md border border-default/60 text-xs">
              <div class="divide-y divide-default/60">
                <div
                  v-for="row in detailRows"
                  :key="row.label"
                  class="grid grid-cols-[auto_1fr_1fr] items-center"
                >
                  <div class="px-2.5 py-1 text-[11px] text-muted">{{ row.label }}</div>
                  <div class="px-2.5 py-1 text-right font-mono text-primary">
                    {{ row.lived }}
                  </div>
                  <div class="px-2.5 py-1 text-right font-mono text-success">
                    {{ row.remaining }}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <!-- ПРАВАЯ КОЛОНКА: виджет на всю высоту -->
        <div class="flex min-h-0 w-full">
          <TimelineLifeWeeksGrid :rows="rows" :weeks-per-year="weeksPerYear" />
        </div>
      </div>
    </UContainer>

    <TimelineSettingsDialog v-model:open="settingsOpen" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  mainPadding: false,
})

const seoTitle = 'Жизнь в неделях — карта прожитых недель и memento mori'
const seoDescription =
  'Карта жизни в неделях: введите дату рождения и увидите все прожитые и оставшиеся недели. Визуализация memento mori — простой способ почувствовать ценность времени.'
const ogDescription =
  'Каждая клетка — одна неделя жизни. Прожитые закрашены, текущая выделена. Memento mori как карта времени.'
const pageUrl = 'https://and-shu.ru/timeline'

useHead({
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    {
      name: 'keywords',
      content:
        'жизнь в неделях, memento mori, мементо мори, карта жизни в неделях, прожитые недели, визуализация жизни, годы жизни в неделях, сколько недель в жизни',
    },
    { property: 'og:title', content: 'Жизнь в неделях — memento mori' },
    { property: 'og:description', content: ogDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:locale', content: 'ru_RU' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Жизнь в неделях — memento mori' },
    { name: 'twitter:description', content: ogDescription },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Жизнь в неделях',
        alternateName: 'Memento mori — карта времени',
        description: seoDescription,
        url: pageUrl,
        inLanguage: 'ru',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
      }),
    },
  ],
})

const { lifespanYears, birthDate, isCustomized, load, reset } =
  useLifeWeeksSettings()

const { rows, metrics, weeksPerYear } = useLifeWeeks({
  birthDate,
  lifespanYears,
})

const settingsOpen = ref(false)

onMounted(() => {
  load()
})

const fmt = (n: number) => n.toLocaleString('ru-RU')

const detailRows = computed(() => [
  { label: 'Месяцы',  lived: fmt(metrics.value.livedMonths),  remaining: fmt(metrics.value.remainingMonths) },
  { label: 'Недели',  lived: fmt(metrics.value.livedWeeks),   remaining: fmt(metrics.value.remainingWeeks) },
  { label: 'Дни',     lived: fmt(metrics.value.livedDays),    remaining: fmt(metrics.value.remainingDays) },
  { label: 'Часы',    lived: fmt(metrics.value.livedHours),   remaining: fmt(metrics.value.remainingHours) },
  { label: 'Минуты',  lived: fmt(metrics.value.livedMinutes), remaining: fmt(metrics.value.remainingMinutes) },
])

/** Эмоциональный лозунг — переключается по числу оставшихся недель. */
const remainingMottoText = computed<string>(() => {
  const w = metrics.value.remainingWeeks
  const d = metrics.value.remainingDays
  if (w <= 0) return 'Цените каждый день — впереди важное.'
  if (w < 100) return 'Каждая неделя — отдельная история.'
  if (w < 1000) return `${fmt(w)} суббот и ${fmt(d)} закатов впереди.`
  return `${fmt(d)} закатов впереди — столько же возможностей.`
})
</script>
