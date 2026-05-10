# and-shu.ru

Личный сайт. Nuxt 4, статический пререндер (`nitro.preset = 'static'`),
Tailwind v4, @nuxt/ui v4.

## Локальная разработка

```bash
yarn install
yarn dev          # http://localhost:3000
```

Прочие скрипты:

```bash
yarn generate     # статический билд в .output/public
yarn preview      # локальный предпросмотр сборки
yarn typecheck    # vue-tsc
```

## Архитектура

- **`pages/`** — `/` (главная), `/timeline`, `/privacy`.
- **`components/`** — `CookieBanner.vue`, `SpaceBackground.vue`, секции главной
  (`pages/index/components/`), `layout/Header.vue`, `layout/Footer.vue`.
- **`composables/`** — `useCookieConsent` (управление согласием),
  `useInstallPrompt` (PWA-установка), `useLifeWeeks` / `useLifeWeeksSettings`
  (виджет «жизнь в неделях»), `useMediaQuery` (реактивный matchMedia).
- **`plugins/yandex-metrika.client.ts`** — Метрика, грузится лениво только
  после согласия cookie, SPA-трекинг через `router.afterEach`.
- **`public/.htaccess`** — SPA fallback и кэширование.

Серверных рантайм-зависимостей нет: всё работает как статический сайт.

## Аналитика и cookie

- Метрика инициализируется только после нажатия «Принять» в баннере.
- Согласие хранится в `localStorage` под ключом `and-shu:cookie-consent:v1`
  (`accepted` / `declined`).
- Для повторного теста баннера:
  `localStorage.removeItem('and-shu:cookie-consent:v1')` → перезагрузка.

## Деплой

Push в `main` → GitHub Actions собирает статический билд и публикует его
на хостинге. Конфиг — `.github/workflows/deploy.yml`. Параметры
подключения и приватные ключи живут в Settings → Secrets and variables.
