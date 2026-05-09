<template>
  <UContainer class="py-8 sm:py-12">
    <article class="prose prose-invert mx-auto max-w-3xl space-y-6">
      <header class="space-y-2 not-prose">
        <UBadge color="neutral" variant="soft" label="Документ" />
        <h1 class="text-3xl font-semibold tracking-tight text-highlighted sm:text-4xl">
          Политика конфиденциальности
        </h1>
        <p class="text-sm text-toned">
          Дата вступления в силу: {{ effectiveDate }}.
          Последнее обновление: {{ lastUpdated }}.
        </p>
      </header>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">1. Общие положения</h2>
        <p class="text-sm text-toned">
          Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
          персональных данных и иной информации пользователей сайта
          <NuxtLink to="/" class="text-primary underline-offset-2 hover:underline">
            and-shu.ru
          </NuxtLink>
          (далее — «Сайт»). Политика составлена в соответствии с требованиями
          Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» (РФ),
          Общего регламента по защите данных (Regulation (EU) 2016/679, GDPR)
          в части, применимой к посетителям из Европейского экономического пространства,
          а также применимых норм законодательства США (включая CCPA в части,
          применимой к посетителям из штата Калифорния).
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">2. Оператор</h2>
        <p class="text-sm text-toned">
          Оператором обработки персональных данных является физическое лицо
          <strong>Шушунов Андрей Александрович</strong> (далее — «Оператор»).
          Контакт для запросов, связанных с обработкой персональных данных:
          <a
            :href="`mailto:${contactEmail}`"
            class="text-primary underline-offset-2 hover:underline"
          >
            {{ contactEmail }}
          </a>.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">3. Какие данные собираются</h2>
        <p class="text-sm text-toned">
          Оператор не собирает на Сайте идентифицирующих персональных данных
          (имя, телефон, адрес и т. п.) и не использует регистрационные формы.
          Автоматически могут обрабатываться следующие сведения:
        </p>
        <ul class="list-disc space-y-1 pl-5 text-sm text-toned">
          <li>IP-адрес посетителя;</li>
          <li>тип и язык браузера, операционная система, разрешение экрана;</li>
          <li>источник перехода (referrer), URL посещённых страниц, время визита;</li>
          <li>файлы cookie и идентификаторы клиента, выставляемые сервисом веб-аналитики;</li>
          <li>записи поведения посетителя на странице (вебвизор), включая нажатия мыши,
            прокрутку, ввод в поля без идентифицирующего содержания —
            при условии полученного согласия.</li>
        </ul>
        <p class="text-sm text-toned">
          Сбор и обработка перечисленных данных осуществляются с использованием сервиса
          <strong>Яндекс.Метрика</strong> (ООО «Яндекс», 119021, Россия, Москва,
          ул. Льва Толстого, д. 16). Подробнее об обработке данных Яндексом —
          <a
            href="https://yandex.ru/legal/confidential/"
            target="_blank"
            rel="noopener"
            class="text-primary underline-offset-2 hover:underline"
          >
            yandex.ru/legal/confidential
          </a>.
          Данные хранятся на серверах Яндекса на территории Российской Федерации;
          трансграничная передача может осуществляться в порядке и на условиях,
          определённых Яндексом.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">4. Цели обработки</h2>
        <ul class="list-disc space-y-1 pl-5 text-sm text-toned">
          <li>оценка посещаемости и анализ поведения для улучшения работы Сайта;</li>
          <li>выявление и устранение технических ошибок, обеспечение стабильной работы;</li>
          <li>защита Сайта от несанкционированного доступа и автоматизированных атак.</li>
        </ul>
        <p class="text-sm text-toned">
          Оператор не использует полученные данные для принятия юридически значимых
          автоматизированных решений в отношении пользователя и не осуществляет
          профайлинг в смысле ст. 22 GDPR.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">5. Правовые основания</h2>
        <p class="text-sm text-toned">
          Обработка осуществляется на основании:
        </p>
        <ul class="list-disc space-y-1 pl-5 text-sm text-toned">
          <li>согласия посетителя, выраженного через нажатие кнопки «Принять»
            в баннере об использовании cookie (ст. 6 152-ФЗ; ст. 6(1)(a) GDPR);</li>
          <li>законного интереса Оператора в обеспечении безопасности и работоспособности
            Сайта (ст. 6(1)(f) GDPR) — для технических и защитных целей.</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">6. Сроки хранения</h2>
        <p class="text-sm text-toned">
          Данные веб-аналитики хранятся на стороне Яндекс.Метрики в течение установленного
          сервисом срока (как правило, до 25 месяцев), после чего обезличиваются
          или удаляются. Технические cookie-идентификаторы Яндекс.Метрики действуют
          в браузере посетителя в соответствии с настройками сервиса
          (как правило, до 12 месяцев с момента последнего визита).
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">7. Cookie и локальное хранилище</h2>
        <p class="text-sm text-toned">
          Сайт использует cookie и локальное хранилище браузера (localStorage)
          для следующих целей:
        </p>
        <ul class="list-disc space-y-1 pl-5 text-sm text-toned">
          <li>сохранение факта вашего ответа в баннере cookie (ключ
            <code class="text-xs">and-shu:cookie-consent:v1</code>) — обязательно
            для работы баннера;</li>
          <li>файлы cookie сервиса Яндекс.Метрика (домен
            <code class="text-xs">mc.yandex.ru</code> и связанные) — только при
            вашем согласии.</li>
        </ul>
        <p class="text-sm text-toned">
          Вы можете в любой момент отозвать согласие и удалить cookie через настройки
          браузера и/или очистив локальное хранилище для домена and-shu.ru.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">8. Передача третьим лицам</h2>
        <p class="text-sm text-toned">
          Оператор не продаёт, не сдаёт в аренду и не передаёт персональные данные
          третьим лицам, за исключением передачи указанному обработчику —
          ООО «Яндекс» — в объёме, необходимом для предоставления услуг веб-аналитики.
          Передача данных по требованию государственных органов осуществляется
          в случаях и порядке, установленных действующим законодательством.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">9. Ваши права</h2>
        <p class="text-sm text-toned">
          В соответствии с применимым законодательством вы имеете право:
        </p>
        <ul class="list-disc space-y-1 pl-5 text-sm text-toned">
          <li>получить подтверждение факта обработки данных и их копию;</li>
          <li>требовать уточнения, блокирования или удаления данных, если они
            неточны, неактуальны или обрабатываются с нарушением закона;</li>
          <li>отозвать согласие на обработку в любой момент;</li>
          <li>возразить против обработки, основанной на законном интересе;</li>
          <li>обратиться с жалобой в надзорный орган
            (в РФ — Роскомнадзор, в ЕС — национальный орган по защите данных).</li>
        </ul>
        <p class="text-sm text-toned">
          Запросы направляются на адрес
          <a
            :href="`mailto:${contactEmail}`"
            class="text-primary underline-offset-2 hover:underline"
          >
            {{ contactEmail }}
          </a>.
          Срок ответа — не более 30 дней с момента получения запроса.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">10. Дети</h2>
        <p class="text-sm text-toned">
          Сайт не ориентирован на лиц младше 16 лет. Оператор не собирает осознанно
          данные таких лиц. Если вам стало известно, что данные ребёнка были собраны
          без согласия родителя/опекуна, сообщите об этом для удаления.
        </p>
      </section>

      <section class="space-y-2">
        <h2 class="text-xl font-semibold text-highlighted">11. Изменения политики</h2>
        <p class="text-sm text-toned">
          Оператор оставляет за собой право вносить изменения в Политику. Актуальная
          редакция всегда доступна по адресу
          <NuxtLink to="/privacy" class="text-primary underline-offset-2 hover:underline">
            and-shu.ru/privacy
          </NuxtLink>.
          В случае существенных изменений Оператор уведомит посетителей путём
          размещения соответствующего уведомления на Сайте.
        </p>
      </section>
    </article>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Политика конфиденциальности — and-shu.ru',
  meta: [
    {
      name: 'description',
      content:
        'Политика конфиденциальности сайта and-shu.ru: какие данные обрабатываются, на каких основаниях, как отозвать согласие.',
    },
    { name: 'robots', content: 'index,follow' },
  ],
})

const { contactEmail } = useRuntimeConfig().public
const { privacy } = useAppConfig()
const { effectiveDate, lastUpdated } = privacy
</script>
