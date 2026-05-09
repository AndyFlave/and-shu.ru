<template>
  <UModal
    v-model:open="openState"
    title="Ваши данные"
    description="Введите свою дату рождения и предполагаемую продолжительность жизни — виджет покажет вашу карту времени."
  >
    <template #body>
      <UForm :state="form" class="space-y-4" @submit="onSubmit">
        <UFormField label="Дата рождения" name="dob" required>
          <UInput
            v-model="form.dob"
            type="date"
            :max="todayIso"
            class="date-input w-full cursor-pointer"
            @click="openDatePicker"
          />
        </UFormField>

        <UFormField label="Ожидаемая продолжительность (лет)" name="lifespan" required>
          <UInput
            v-model.number="form.lifespan"
            type="number"
            min="1"
            max="120"
            class="w-full"
          />
        </UFormField>

        <p class="text-xs text-muted">
          Данные сохраняются локально в вашем браузере и используются только для виджета.
          В любой момент можно вернуться к моим данным.
        </p>

        <div class="flex items-center justify-end gap-2 pt-2">
          <UButton
            v-if="isCustomized"
            label="Сбросить к дефолту"
            icon="i-lucide-rotate-ccw"
            color="neutral"
            variant="ghost"
            @click="onReset"
          />
          <UButton
            label="Отмена"
            color="neutral"
            variant="ghost"
            @click="openState = false"
          />
          <UButton label="Применить" type="submit" :disabled="!canSubmit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
interface Props {
  open?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), { open: false })
const emit = defineEmits<Emits>()

const openState = computed({
  get: () => props.open,
  set: (v: boolean) => emit('update:open', v),
})

const { birthDateIso, lifespanYears, isCustomized, save, reset } =
  useLifeWeeksSettings()

interface FormState {
  dob: string
  lifespan: number
}

const form = ref<FormState>({
  dob: birthDateIso.value,
  lifespan: lifespanYears.value,
})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      form.value = { dob: birthDateIso.value, lifespan: lifespanYears.value }
    }
  }
)

const todayIso = computed<string>(() => {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
})

const canSubmit = computed<boolean>(() => {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(form.value.dob) &&
    form.value.dob <= todayIso.value &&
    form.value.lifespan > 0 &&
    form.value.lifespan <= 120
  )
})

const onSubmit = () => {
  if (!canSubmit.value) return
  birthDateIso.value = form.value.dob
  lifespanYears.value = form.value.lifespan
  save()
  openState.value = false
}

const onReset = () => {
  reset()
  form.value = { dob: birthDateIso.value, lifespan: lifespanYears.value }
}

/**
 * Открывает нативный календарь при клике на любую часть поля,
 * а не только на иконку справа. Работает в Chromium/Edge/Safari (новые версии).
 * Для Firefox — CSS-трюк ниже растягивает picker-indicator на всё поле.
 */
const openDatePicker = (e: MouseEvent) => {
  const root = e.currentTarget as HTMLElement
  const input = root.querySelector('input[type="date"]') as HTMLInputElement | null
  if (input && typeof input.showPicker === 'function') {
    try {
      input.showPicker()
    } catch {
      /* SecurityError при программном вызове без user gesture — игнорируем */
    }
  }
}
</script>

<style scoped>
/* Webkit/Blink: растягиваем невидимый picker indicator на весь input,
   чтобы клик в любом месте поля открывал календарь. */
.date-input :deep(input[type='date']) {
  cursor: pointer;
  position: relative;
}
.date-input :deep(input[type='date']::-webkit-calendar-picker-indicator) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
</style>
