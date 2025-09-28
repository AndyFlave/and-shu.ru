<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 My Project. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
defineOptions({
  name: 'LayoutFooter',
})
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}
</style>
