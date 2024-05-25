<template>
  <div class="index-page">
    <MainScreen :title="title" :subtitle="subtitle" :nets="nets" />
  </div>
</template>

<script>
  import MainScreen from '@/components/sections/main-screen/MainScreen'

  export default {
    name: 'IndexPage',

    components: { MainScreen },

    data() {
      return {
        title: `Hi. I'm <span style="color: #ff490d;">Andrey Shushunov</span>`,
        subtitle: `I'm <span style="color: #ff490d;">Senior Frontend Engineer</span> based in Tbilisi. <br> Welcome on my personal website.`,
        nets: [
          {
            icon: require('@/static/images/svg/linkedin.svg'),
            link: 'https://www.linkedin.com/in/shushunov-andrey/',
            alt: 'linkedin frontend-разработчика Андрея Шушунова',
            rel: 'nofollow noreferer',
            target: '_blank',
          },
          {
            icon: require('@/static/images/svg/tg.svg'),
            link: 'https://t.me/shushunov_andrey',
            alt: 'Телеграм frontend-разработчика Андрея Шушунова',
            rel: 'nofollow noreferer',
            target: '_blank',
          },
          {
            icon: require('@/static/images/svg/inst.svg'),
            link: 'https://www.instagram.com/shushunov_andrey/',
            alt: 'Инстаграм frontend-разработчика Андрея Шушунова',
            rel: 'nofollow noreferer',
            target: '_blank',
          },
          {
            icon: require('@/static/images/svg/fb.svg'),
            link: 'https://www.facebook.com/shushunovAndrey/',
            alt: 'Фейсбук frontend-разработчика Андрея Шушунова',
            rel: 'nofollow noreferer',
            target: '_blank',
          },
          {
            link: 'https://ok.ru/shushunovandrey',
            icon: require('@/static/images/svg/ok.svg'),
            alt: 'Одноклассники frontend-разработчика Андрея Шушунова',
            rel: 'nofollow noreferer',
            target: '_blank',
          },
          {
            link: 'https://vk.com/shushunov_aa',
            icon: require('@/static/images/svg/vk.svg'),
            alt: 'Вконтакте frontend-разработчика Андрея Шушунова',
            rel: 'nofollow noreferer',
            target: '_blank',
          },
          {
            icon: require('@/static/images/svg/mail.svg'),
            link: 'mailto:infinitumDevelopment@yandex.ru',
            alt: 'Почта frontend-разработчика Андрея Шушунова',
          },
          // {
          //   icon: require('@/static/images/svg/github.svg'),
          //   link: '',
          //   alt: '',
          // },
        ],
      }
    },
  }
</script>

<style scoped>
  .index-page {
  }

  .index-page__title {
  }
</style>
