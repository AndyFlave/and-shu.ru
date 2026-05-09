export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'zinc',
    },
    main: {
      base: 'min-h-[calc(100dvh-var(--ui-header-height))]'
    },
  },
  privacy: {
    // effectiveDate — дата вступления политики в силу, не меняется без причины.
    // lastUpdated — обновляем при правках текста политики.
    effectiveDate: '9 мая 2026 года',
    lastUpdated: '9 мая 2026 года',
  },
})
