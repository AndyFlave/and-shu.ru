<template>
  <nuxt-link to="/" class="logotype">
    <img
      :src="href"
      alt="Логотип на сайте Андрея Шушунова"
      class="logotype__icon"
    >

    <span class="logotype__text">
      Андрей Шушунов
    </span>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'Logotype',

    data() {
      return {
        href: require('@/static/images/svg/logo.svg'),
      }
    },
  }
</script>

<style scoped>
  .logotype {
    display: flex;
    align-items: center;
  }

  .logotype__icon {
    width: 70px;
    height: 70px;
    margin-right: 16px;
    animation: spin 5s linear infinite;
  }

  .logotype__text {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: .33px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>