<template>
  <header class="header">
    <div class="container">
      <Logotype />
    </div>
  </header>
</template>

<script>
  import Logotype from '@/components/ui/Logotype'

  export default {
    name: 'Header',

    components: {
      Logotype
    },
  }
</script>

<style scoped>
  .header {
    padding: 20px 0;
    background-color: #2F2F2F;
  }
</style>