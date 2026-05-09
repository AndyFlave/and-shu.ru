/**
 * Жизнь в неделях. Каждая неделя — 7 дней с момента DOB.
 * Сетка строится по точному календарю: общее количество недель =
 * floor((DOB + lifespanYears лет − DOB) / 7), а не lifespan × 52.
 * Последний ряд может быть неполным — это правильное отражение того,
 * что 52 недели ≠ 1 год (в году ~52.18 недели).
 */
export type WeekStatus = 'past' | 'current' | 'future'

export interface WeekCell {
  index: number
  start: Date
  end: Date
  status: WeekStatus
}

export interface LifeRow {
  year: number
  rowIndex: number
  weeks: WeekCell[]
}

export interface LifeWeeksMetrics {
  totalWeeks: number
  livedWeeks: number
  remainingWeeks: number
  currentWeekIndex: number
  livedPercent: number
  remainingPercent: number
  age: number

  // Точные единицы (от DOB до now / от now до endDate)
  livedDays: number
  remainingDays: number
  livedHours: number
  remainingHours: number
  livedMinutes: number
  remainingMinutes: number
  livedMonths: number
  remainingMonths: number
}

export interface UseLifeWeeksOptions {
  birthDate: MaybeRefOrGetter<Date>
  lifespanYears: MaybeRefOrGetter<number>
}

const DAY_MS = 24 * 60 * 60 * 1000
const WEEK_MS = 7 * DAY_MS
const WEEKS_PER_YEAR = 52

const startOfDay = (d: Date): Date => {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}

export const useLifeWeeks = (options: UseLifeWeeksOptions) => {
  const now = ref(startOfDay(new Date()))

  // Дата меняется максимум раз в сутки. Дёргаем `now` на возврат вкладки
  // в фокус (после длительного сна вкладки) и фоновым тиком раз в 6 часов
  // как страховку для постоянно открытой вкладки.
  const tick = () => {
    now.value = startOfDay(new Date())
  }
  let interval: ReturnType<typeof setInterval> | null = null
  const onVisibilityChange = () => {
    if (!document.hidden) tick()
  }

  onMounted(() => {
    interval = setInterval(tick, 6 * 60 * 60 * 1000)
    document.addEventListener('visibilitychange', onVisibilityChange)
  })
  onBeforeUnmount(() => {
    if (interval) clearInterval(interval)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })

  const birthDate = computed<Date>(() => startOfDay(toValue(options.birthDate)))
  const lifespanYears = computed<number>(() => toValue(options.lifespanYears))

  // Конец предполагаемой жизни — точно lifespanYears календарных лет от рождения.
  const endDate = computed<Date>(() => {
    const d = new Date(birthDate.value)
    d.setFullYear(d.getFullYear() + lifespanYears.value)
    return startOfDay(d)
  })

  // Точное число прожитых-предстоящих недель в этом отрезке.
  const totalWeeks = computed<number>(() =>
    Math.max(
      0,
      Math.floor((endDate.value.getTime() - birthDate.value.getTime()) / WEEK_MS)
    )
  )

  const currentWeekIndex = computed<number>(() => {
    const diffMs = now.value.getTime() - birthDate.value.getTime()
    if (diffMs < 0) return -1
    return Math.floor(diffMs / WEEK_MS)
  })

  const rows = computed<LifeRow[]>(() => {
    const result: LifeRow[] = []
    const dob = birthDate.value
    const totalW = totalWeeks.value
    const cwi = currentWeekIndex.value

    let yearIdx = 0
    let weekInYear = 0
    let weeksAccum: WeekCell[] = []

    for (let index = 0; index < totalW; index++) {
      const start = new Date(dob.getTime() + index * WEEK_MS)
      const end = new Date(start.getTime() + 6 * DAY_MS)
      let status: WeekStatus = 'future'
      if (index < cwi) status = 'past'
      else if (index === cwi) status = 'current'
      weeksAccum.push({ index, start, end, status })
      weekInYear++

      if (weekInYear === WEEKS_PER_YEAR) {
        result.push({
          year: dob.getFullYear() + yearIdx,
          rowIndex: yearIdx,
          weeks: weeksAccum,
        })
        yearIdx++
        weekInYear = 0
        weeksAccum = []
      }
    }

    // Хвост: ряд с не-полным числом недель (последние ~14 недель за lifespan).
    if (weeksAccum.length > 0) {
      result.push({
        year: dob.getFullYear() + yearIdx,
        rowIndex: yearIdx,
        weeks: weeksAccum,
      })
    }

    return result
  })

  const metrics = computed<LifeWeeksMetrics>(() => {
    const totalW = totalWeeks.value
    const lived = Math.max(0, currentWeekIndex.value)
    const remaining = Math.max(0, totalW - lived - 1)
    const livedPercent = totalW > 0 ? (lived / totalW) * 100 : 0
    const dob = birthDate.value
    const today = now.value
    const end = endDate.value
    const passedAnniversary =
      today >= new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
    const age = today.getFullYear() - dob.getFullYear() - (passedAnniversary ? 0 : 1)

    const livedMs = Math.max(0, today.getTime() - dob.getTime())
    const remainingMs = Math.max(0, end.getTime() - today.getTime())

    const livedDays = Math.floor(livedMs / DAY_MS)
    const remainingDays = Math.floor(remainingMs / DAY_MS)

    const livedHours = Math.floor(livedMs / (60 * 60 * 1000))
    const remainingHours = Math.floor(remainingMs / (60 * 60 * 1000))

    const livedMinutes = Math.floor(livedMs / (60 * 1000))
    const remainingMinutes = Math.floor(remainingMs / (60 * 1000))

    const livedMonths =
      (today.getFullYear() - dob.getFullYear()) * 12 +
      (today.getMonth() - dob.getMonth()) -
      (today.getDate() < dob.getDate() ? 1 : 0)
    const remainingMonths =
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth()) -
      (end.getDate() < today.getDate() ? 1 : 0)

    return {
      totalWeeks: totalW,
      livedWeeks: lived,
      remainingWeeks: remaining,
      currentWeekIndex: currentWeekIndex.value,
      livedPercent,
      remainingPercent: 100 - livedPercent,
      age,
      livedDays,
      remainingDays,
      livedHours,
      remainingHours,
      livedMinutes,
      remainingMinutes,
      livedMonths: Math.max(0, livedMonths),
      remainingMonths: Math.max(0, remainingMonths),
    }
  })

  return {
    birthDate,
    lifespanYears,
    weeksPerYear: WEEKS_PER_YEAR,
    rows,
    metrics,
  }
}
