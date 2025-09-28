<template>
  <div class="home-layout">
    <SpaceBackground :enabled="true" :fullscreen="true" />
    <LayoutHeader />
    <main class="main-content">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.home-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
