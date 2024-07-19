<template>
  <div class="app template-fullpage">
    <Header />
    <main>
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
  .template-fullpage {
  }
</style>
