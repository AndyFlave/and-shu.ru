<template>
  <div class="app template-default">
    <main class="template-default__main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
  import Header from '@/components/template/Header'

  export default {
    components: {
      Header,
    },
  }
</script>

<style scoped>
  .template-default {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }

  .template-default__main {
    height: 100%;
  }
</style>
