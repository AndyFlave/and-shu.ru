/**
 * Реактивный matchMedia. Безопасен на SSR/в Node — там вернёт `false`.
 * На клиенте обновляется через listener `change`.
 */
export const useMediaQuery = (query: string) => {
  const matches = ref(false)

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return readonly(matches)
  }

  const media = window.matchMedia(query)
  matches.value = media.matches

  const onChange = (e: MediaQueryListEvent) => {
    matches.value = e.matches
  }

  onMounted(() => {
    media.addEventListener('change', onChange)
  })

  onBeforeUnmount(() => {
    media.removeEventListener('change', onChange)
  })

  return readonly(matches)
}
