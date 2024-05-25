<template>
  <div class="app template-default">
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
  .template-default {
    height: 100vh;
    background-color: var(--color-black-1);
  }
</style>
