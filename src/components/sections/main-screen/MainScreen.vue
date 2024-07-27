<template>
  <section class="main-screen">
    <div class="container main-screen__container">
      <h1 class="main-screen__title" v-html="title"></h1>

      <div class="main-screen__content">
        <p v-if="subtitle" v-html="subtitle" class="main-screen__subtitle"></p>
        <NavigationList :routes="routes" class="main-screen__navigation-list" />
        <SocialList :nets="nets" class="main-screen__social-list" />
      </div>
    </div>

    <video
      src="/video/bg-video.mp4"
      autoplay
      loop
      muted
      playsinline
      disablePictureInPicture
      aria-hidden="true"
      class="main-screen__background"
    ></video>
  </section>
</template>

<script>
  import SocialList from '@/components/ui/SocialList'
  import NavigationList from '@/components/ui/NavigationList'
  import navigations from '@/constants/navigations'

  export default {
    name: 'MainScreen',

    components: {
      SocialList,
      NavigationList,
    },

    props: {
      title: {
        type: String,
        required: true,
        default: '',
      },

      subtitle: {
        type: String,
        required: false,
        default: '',
      },

      nets: {
        type: Array,
        required: false,
        default: () => [],
      },
    },

    data() {
      return {
        routes: navigations.routes.slice(1),
      }
    },
  }
</script>

<style scoped>
  .main-screen {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 30px 0 60px;
    z-index: 1;
  }

  .main-screen:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-black-1);
    z-index: 1;
  }

  .main-screen__container {
    position: relative;
    z-index: 2;
  }

  .main-screen__title {
    font-size: 60px;
  }

  .main-screen__subtitle {
    margin-top: 16px;
    font-size: 18px;
    letter-spacing: 0.33px;
  }

  .main-screen__social-list {
    margin-top: 34px;
  }

  .main-screen__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    z-index: -1;
  }

  .main-screen__background::-webkit-media-controls {
    display: none !important;
  }

  .main-screen__background::-moz-media-controls {
    display: none !important;
  }

  .main-screen__background::media-controls {
    display: none !important;
  }

  .main-screen__content {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .main-screen__navigation-list {
    margin-top: 22px;
  }

  @media (max-width: 767px) {
    .main-screen__title {
      font-size: 42px;
      text-align: center;
    }

    .main-screen__subtitle {
      text-align: center;
    }

    .main-screen__content {
      align-items: center;
    }
  }
</style>
