# and-shu.ru

Личный сайт. Nuxt 4, SPA static (`ssr: false` + `nitro.preset = 'static'`),
Tailwind v4, @nuxt/ui v4. Деплоится на Sprinthost через GitHub Actions + rsync.

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
  (виджет «жизнь в неделях»).
- **`plugins/yandex-metrika.client.ts`** — Метрика 92329310, грузится лениво
  только после согласия cookie, SPA-трекинг через `router.afterEach`.
- **`public/.htaccess`** — SPA fallback и кэширование, защита папок поддоменов.

Серверных рантайм-зависимостей нет: всё работает как статический SPA.

## Деплой

Push в `main` → GitHub Actions запускает workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `yarn install` (workflow использует `npm install` для скорости).
2. `npm run generate`.
3. `rsync -avz --delete .output/public/ → Sprinthost`.

### Требуемые GitHub-переменные и секреты

В **Settings → Secrets and variables → Actions** репозитория добавить:

- **Secrets**
  - `SSH_PRIVATE_KEY` — приватный SSH-ключ для пользователя `a0435840` на Sprinthost
    (publickey ключа должен быть в `~/.ssh/authorized_keys` на сервере).
- **Variables**
  - `DEPLOY_PATH` — например, `/home/a0435840/domains/and-shu.ru/public_html/`.

### Что НЕ удаляется при деплое (`--exclude` в rsync)

Папки поддоменов на сервере (`wishlist/`, `sites/`, `soundstorm-map/`,
`bodyfolio/`), служебные `cgi-bin/`, `.well-known/`, `logs/`, `tmp/`.

⚠️ **Важно**: если на сервере появится новый поддомен в общем `public_html`,
обязательно добавить его и в `--exclude` workflow, и в `RewriteRule ^…` в
`public/.htaccess`, иначе `rsync --delete` сотрёт его файлы.

## Аналитика и cookie

- Метрика инициализируется только после нажатия «Принять» в баннере.
- Согласие хранится в `localStorage` под ключом
  `and-shu:cookie-consent:v1` (`accepted` / `declined`).
- Для повторного теста баннера: `localStorage.removeItem('and-shu:cookie-consent:v1')`
  → перезагрузка.
