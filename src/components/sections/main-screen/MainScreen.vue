<template>
  <section class="main-screen">
    <div class="container">
      <h1 class="main-screen__title" v-html="title"></h1>

      <p v-if="subtitle" v-html="subtitle" class="main-screen__subtitle"></p>

      <SocialList :nets="nets" class="main-screen__social-list" />
    </div>

    <video
      src="/video/bg-video.mp4"
      autoplay
      loop
      muted
      aria-hidden="true"
      class="main-screen__background"
    ></video>
  </section>
</template>

<script>
  import SocialList from '@/components/ui/SocialList'

  export default {
    name: 'MainScreen',

    components: {
      SocialList,
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
  }
</script>

<style scoped>
  .main-screen {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 30px 0 60px;
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
    margin-top: 28px;
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

  @media (max-width: 767px) {
    .main-screen__title {
      font-size: 42px;
      text-align: center;
    }

    .main-screen__subtitle {
      text-align: center;
    }
  }
</style>
