/**
 * Яндекс.Метрика для SPA: скрипт грузится лениво после согласия cookie,
 * через requestIdleCallback — чтобы не мешать первой отрисовке.
 * Ручной трекинг переходов через router.afterEach (defer: true).
 *
 * Источник истины для consent — этот плагин (вызывает load() при app:mounted),
 * чтобы исключить race с CookieBanner.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const counterId = Number(config.public.yandexMetrikaId)

  if (!counterId || Number.isNaN(counterId)) return

  const router = useRouter()
  const { consent, hydrated, load } = useCookieConsent()

  let injected = false
  let initialized = false

  const initStub = () => {
    if (window.ym) return
    const stub = function (this: unknown, ..._args: unknown[]) {
      ;(stub.a = stub.a || []).push(arguments)
    } as unknown as YmFunction
    stub.a = []
    stub.l = Date.now()
    window.ym = stub
  }

  const injectScript = () => {
    if (injected) return
    injected = true
    initStub()

    const src = 'https://mc.yandex.ru/metrika/tag.js'
    const exists = Array.from(document.scripts).some((s) => s.src === src)
    if (!exists) {
      const script = document.createElement('script')
      script.async = true
      script.src = src
      document.head.appendChild(script)
    }
  }

  const sendHit = (url: string, referer?: string) => {
    if (!window.ym) return
    const fullUrl = new URL(url, window.location.origin).toString()
    const params: Record<string, unknown> = {}
    if (referer) params.referer = referer
    window.ym(counterId, 'hit', fullUrl, params)
  }

  const init = () => {
    if (initialized || !window.ym) return
    initialized = true
    window.ym(counterId, 'init', {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
    sendHit(window.location.pathname + window.location.search)
  }

  const enable = () => {
    type IdleCallback = (cb: () => void, opts?: { timeout: number }) => void
    const idle: IdleCallback =
      (window as Window & { requestIdleCallback?: IdleCallback }).requestIdleCallback ??
      ((cb) => {
        window.setTimeout(cb, 1)
      })

    // injectScript() синхронно создаёт ym-stub, поэтому init() гарантированно
    // отрабатывает в том же тике — busy-loop ожидания не нужен.
    idle(
      () => {
        injectScript()
        init()
      },
      { timeout: 2000 },
    )
  }

  // Единственная точка вызова load() — здесь. CookieBanner ждёт hydrated.
  nuxtApp.hook('app:mounted', () => {
    if (!hydrated.value) load()
    if (consent.value === 'accepted') enable()

    watch(consent, (val) => {
      if (val === 'accepted') enable()
    })
  })

  // SPA-трекинг: первый hit делает init(), последующие — afterEach.
  let previousUrl: string | null = null
  router.afterEach((to) => {
    const url = to.fullPath
    if (initialized) sendHit(url, previousUrl ?? undefined)
    previousUrl = url
  })
})
