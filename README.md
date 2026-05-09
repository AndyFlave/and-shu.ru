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

1. `corepack enable` + `yarn install --immutable`.
2. `yarn generate` → `.output/public/`.
3. SSH-keygen, `scp` `~/.deploy-excludes` с сервера.
4. `rsync -avz --delete --exclude-from=.deploy-excludes` на Sprinthost.

### Настройка GitHub (один раз)

В **Settings → Secrets and variables → Actions** репозитория добавить:

- **Secrets**
  - `SSH_PRIVATE_KEY` — приватный SSH-ключ (см. ниже как сгенерировать).
- **Variables**
  - `DEPLOY_PATH` — `/home/a0435840/domains/and-shu.ru/public_html/`.

### Настройка Sprinthost (один раз)

1. **SSH-ключ.** Сгенерировать пару (или использовать существующую):

   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/and-shu-deploy
   # → ~/and-shu-deploy (private), ~/and-shu-deploy.pub (public)
   ```

   Публичный ключ дописать в `~/.ssh/authorized_keys` на сервере
   (через ISP-панель Sprinthost или по существующему SSH-доступу).
   Приватный — скопировать целиком (включая `-----BEGIN/END-----`)
   в GitHub Secret `SSH_PRIVATE_KEY`.

2. **Список исключений на сервере.** Это критично: без него `rsync --delete`
   сотрёт чужие поддомены. Создать `~/.deploy-excludes`:

   ```
   bodyfolio/
   sites/
   soundstorm-map/
   wishlist/
   cgi-bin/
   .well-known/
   logs/
   tmp/
   ```

   При появлении нового поддомена в `public_html/` — **просто добавить
   строку в этот файл на сервере**, никаких правок репо/workflow не нужно.

   Если файла на сервере нет, workflow остановится с ошибкой
   `~/.deploy-excludes не найден на сервере` — это намеренная защита.

## Аналитика и cookie

- Метрика инициализируется только после нажатия «Принять» в баннере.
- Согласие хранится в `localStorage` под ключом
  `and-shu:cookie-consent:v1` (`accepted` / `declined`).
- Для повторного теста баннера: `localStorage.removeItem('and-shu:cookie-consent:v1')`
  → перезагрузка.
