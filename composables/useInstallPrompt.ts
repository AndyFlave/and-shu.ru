/**
 * PWA install prompt. Работает в Chromium-браузерах (Chrome/Edge/Brave/Yandex).
 * В Safari iOS установка только через Share → «На экран Домой» (вручную).
 * В Firefox `beforeinstallprompt` не поддерживается.
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt(): Promise<void>
}

export const useInstallPrompt = () => {
  const deferred = useState<BeforeInstallPromptEvent | null>(
    'pwa-install-prompt',
    () => null
  )
  const installed = useState<boolean>('pwa-installed', () => false)

  const canInstall = computed<boolean>(() => deferred.value !== null && !installed.value)

  const onBeforeInstallPrompt = (e: Event) => {
    e.preventDefault()
    deferred.value = e as BeforeInstallPromptEvent
  }

  const onAppInstalled = () => {
    deferred.value = null
    installed.value = true
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    // Если уже запущено как standalone — не показываем кнопку.
    const standalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      // Safari iOS legacy property
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    if (standalone) {
      installed.value = true
      return
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
  })

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.removeEventListener('appinstalled', onAppInstalled)
  })

  const install = async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    const evt = deferred.value
    if (!evt) return 'unavailable'
    await evt.prompt()
    const choice = await evt.userChoice
    deferred.value = null
    if (choice.outcome === 'accepted') installed.value = true
    return choice.outcome
  }

  return {
    canInstall,
    installed: readonly(installed),
    install,
  }
}
