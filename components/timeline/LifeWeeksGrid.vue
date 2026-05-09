<template>
  <div class="flex h-full w-full flex-col gap-3">
    <!-- Легенда: pills, более выраженная -->
    <ul
      class="flex shrink-0 flex-wrap items-center justify-center gap-2 text-xs lg:justify-end"
      aria-label="Легенда"
    >
      <li
        class="inline-flex items-center gap-2 rounded-full border border-default/70 bg-elevated/40 px-2.5 py-1"
      >
        <span class="size-2.5 rounded-[2px] bg-primary" aria-hidden="true" />
        <span class="text-toned">Прожитая неделя</span>
      </li>
      <li
        class="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-2.5 py-1"
      >
        <span class="size-2.5 rounded-[2px] bg-success" aria-hidden="true" />
        <span class="text-toned">Текущая</span>
      </li>
      <li
        class="inline-flex items-center gap-2 rounded-full border border-default/70 bg-elevated/40 px-2.5 py-1"
      >
        <span class="size-2.5 rounded-[2px] bg-white ring-1 ring-default" aria-hidden="true" />
        <span class="text-toned">Будущая</span>
      </li>
    </ul>

    <!-- Грид: ширина зафиксирована по breakpoint'у, ячейки квадратные.
         На мобиле центрируем, на lg+ прижимаем к правому краю колонки. -->
    <div class="flex flex-1 items-start justify-center overflow-hidden lg:justify-end">
      <div
        class="life-grid grid"
        :style="{
          gridTemplateColumns: `var(--label-col) repeat(${weeksPerYear}, var(--cell))`,
          gridTemplateRows: `var(--label-col) repeat(${rows.length}, var(--cell))`,
        }"
        role="grid"
        :aria-rowcount="rows.length + 1"
        :aria-colcount="weeksPerYear + 1"
      >
        <!-- Заголовок-подпись колонки слева -->
        <div
          class="flex items-end justify-end pr-1.5 font-mono text-[10px] leading-none text-muted"
          aria-hidden="true"
        >
          Years
        </div>
        <!-- Заголовочный ряд: пустые слоты для выравнивания -->
        <div
          v-for="n in weeksPerYear"
          :key="`head-${n}`"
          aria-hidden="true"
        />

        <template v-for="row in rows" :key="row.rowIndex">
          <!-- Возраст слева, видимый каждые 4 года + последняя строка -->
          <div
            class="flex items-center justify-end pr-1.5 font-mono text-[10px] leading-none text-muted"
            :class="{ 'opacity-0': !showAgeLabel(row.rowIndex) }"
            aria-hidden="true"
          >
            {{ ageLabel(row.rowIndex) }}
          </div>

          <!-- 52 недели -->
          <span
            v-for="week in row.weeks"
            :key="week.index"
            :title="`${formatDate(week.start)} — ${formatDate(week.end)}`"
            :class="cellClass(week.status)"
            class="transition-colors"
            role="gridcell"
            :aria-label="`Неделя ${week.index + 1}: ${statusLabel(week.status)}`"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LifeRow, WeekStatus } from '~/composables/useLifeWeeks'

interface Props {
  rows: LifeRow[]
  weeksPerYear: number
}

const props = defineProps<Props>()
const rowsLen = computed(() => props.rows.length)

/**
 * Метка возраста в строке = age в начале этой строки (0-based, как в legacy).
 * Текущая неделя 32-летнего попадает в строку с меткой «32».
 * Поскольку rows.length = lifespan + 1 (последний ряд = «хвост» сверх lifespan),
 * метка для rowIndex просто = rowIndex (0..80).
 */
const ageLabel = (rowIndex: number): number => rowIndex

const showAgeLabel = (rowIndex: number): boolean => {
  if (rowIndex === 0) return false
  if (rowIndex === rowsLen.value - 1) return true
  return rowIndex % 4 === 0
}

const cellClass = (status: WeekStatus): string => {
  if (status === 'past') return 'bg-primary hover:brightness-110'
  if (status === 'current') return 'bg-success ring-1 ring-success/80 relative z-10'
  return 'bg-white hover:bg-neutral-100'
}

const STATUS_LABELS: Record<WeekStatus, string> = {
  past: 'прожита',
  current: 'текущая',
  future: 'впереди',
}

const statusLabel = (status: WeekStatus): string => STATUS_LABELS[status]

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const formatDate = (d: Date): string => dateFormatter.format(d)
</script>

<style scoped>
/*
 * Фиксированный размер ячейки по breakpoint'у — виджет не «дышит» по ширине
 * при изменении высоты viewport. На каждом breakpoint ширина грида детерминирована:
 *   width  = label-col + 52 * cell
 *   height = label-col + 80 * cell
 *
 * При cell=7px и lifespan=80 высота грида ≈ 588px — помещается в стандартный
 * десктопный viewport (≥800px свободной высоты после header/footer/padding).
 */
/* На мобиле — 4×4 с gap 1px (помещается в любой узкий viewport),
   на sm+ — 6×6 с gap 2px (как в legacy). */
.life-grid {
  --cell: 4px;
  --label-col: 20px;
  gap: 1px;
}

@media (min-width: 640px) {
  .life-grid {
    --cell: 6px;
    --label-col: 22px;
    gap: 2px;
  }
}
</style>
