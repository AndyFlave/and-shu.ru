/**
 * Настройки виджета «Жизнь в неделях» — DOB и ожидаемая продолжительность жизни.
 * Хранятся в localStorage; по умолчанию — данные владельца сайта.
 */
const STORAGE_KEY = 'and-shu:life-weeks:v1'

export const DEFAULT_BIRTH_DATE_ISO = '1994-02-26'
export const DEFAULT_LIFESPAN_YEARS = 80

interface StoredSettings {
  birthDateIso: string
  lifespanYears: number
}

const isValidIso = (s: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(s)

const parseStored = (raw: string | null): StoredSettings | null => {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<StoredSettings>
    if (
      typeof parsed.birthDateIso === 'string' &&
      isValidIso(parsed.birthDateIso) &&
      typeof parsed.lifespanYears === 'number' &&
      parsed.lifespanYears > 0 &&
      parsed.lifespanYears <= 120
    ) {
      return { birthDateIso: parsed.birthDateIso, lifespanYears: parsed.lifespanYears }
    }
  } catch {
    /* ignore */
  }
  return null
}

export const useLifeWeeksSettings = () => {
  const birthDateIso = useState<string>(
    'life-weeks:dob',
    () => DEFAULT_BIRTH_DATE_ISO
  )
  const lifespanYears = useState<number>(
    'life-weeks:lifespan',
    () => DEFAULT_LIFESPAN_YEARS
  )
  const isCustomized = useState<boolean>('life-weeks:customized', () => false)

  const load = () => {
    if (typeof window === 'undefined') return
    const stored = parseStored(window.localStorage.getItem(STORAGE_KEY))
    if (stored) {
      birthDateIso.value = stored.birthDateIso
      lifespanYears.value = stored.lifespanYears
      isCustomized.value = true
    }
  }

  const save = () => {
    if (typeof window === 'undefined') return
    const payload: StoredSettings = {
      birthDateIso: birthDateIso.value,
      lifespanYears: lifespanYears.value,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    isCustomized.value = true
  }

  const reset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    birthDateIso.value = DEFAULT_BIRTH_DATE_ISO
    lifespanYears.value = DEFAULT_LIFESPAN_YEARS
    isCustomized.value = false
  }

  // Date-объект для useLifeWeeks (он принимает Date).
  // На случай битых данных в useState — fallback на DEFAULT_BIRTH_DATE_ISO.
  const parseBirthDate = (iso: string): Date => {
    if (!isValidIso(iso)) iso = DEFAULT_BIRTH_DATE_ISO
    const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10))
    if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
      const [dy, dm, dd] = DEFAULT_BIRTH_DATE_ISO.split('-').map((n) =>
        parseInt(n, 10)
      )
      return new Date(dy!, dm! - 1, dd!)
    }
    return new Date(y!, m! - 1, d!)
  }
  const birthDate = computed<Date>(() => parseBirthDate(birthDateIso.value))

  return {
    birthDateIso,
    lifespanYears,
    birthDate,
    isCustomized: readonly(isCustomized),
    load,
    save,
    reset,
  }
}
