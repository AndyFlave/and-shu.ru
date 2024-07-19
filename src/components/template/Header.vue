<template>
  <header class="header">
    <div class="container">
      <NavigationList :routes="routes" />
    </div>
  </header>
</template>

<script>
  import Logotype from '@/components/ui/Logotype'
  import NavigationList from '@/components/ui/NavigationList'
  import navigations from '@/constants/navigations'

  export default {
    name: 'Header',

    components: {
      Logotype,
      NavigationList,
    },

    data() {
      return {
        routes: navigations.routes,
      }
    },
  }
</script>

<style scoped>
  .header {
    padding: 16px 0;
    border-bottom: 1px solid var(--color-white-2);
  }

  .header::v-deep .navigation-list__unit {
    width: 70px;
    height: 70px;
  }
</style>
