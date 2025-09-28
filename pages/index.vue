<template>
  <div class="hero-content">
    <div class="container">
      <h1 class="hero-title">Welcome to the Future</h1>
      <p class="hero-description">Experience the cosmic journey through our innovative platform. Navigate through time and space with our cutting-edge technology.</p>
      <div class="hero-buttons">
        <NuxtLink to="/timeline" class="btn btn-primary">Explore Timeline</NuxtLink>
        <button class="btn btn-secondary">Learn More</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #ffffff, #a0c4ff, #64b5f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(100, 200, 255, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
}

.hero-description {
  font-size: 1.3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(45deg, #64b5f6, #42a5f5);
  color: white;
  box-shadow: 0 4px 15px rgba(100, 181, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(100, 181, 246, 0.6);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

@keyframes glow {
  from {
    text-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
  }
  to {
    text-shadow: 0 0 30px rgba(100, 200, 255, 0.8), 0 0 40px rgba(100, 200, 255, 0.3);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style>

<script setup>
definePageMeta({
  layout: 'home',
})
</script>