export type CookieConsent = 'accepted' | 'declined' | null

const STORAGE_KEY = 'and-shu:cookie-consent:v1'

export const useCookieConsent = () => {
  const consent = useState<CookieConsent>('cookie-consent', () => null)
  const hydrated = useState<boolean>('cookie-consent:hydrated', () => false)

  const load = () => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      consent.value =
        raw === 'accepted' || raw === 'declined' ? (raw as CookieConsent) : null
    } catch {
      consent.value = null
    } finally {
      hydrated.value = true
    }
  }

  const accept = () => {
    consent.value = 'accepted'
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'accepted')
    }
  }

  const decline = () => {
    consent.value = 'declined'
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'declined')
    }
  }

  const reset = () => {
    consent.value = null
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    consent: readonly(consent),
    hydrated: readonly(hydrated),
    load,
    accept,
    decline,
    reset,
  }
}
