<template>
  <div class="container">
    <h1>Timeline</h1>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-date">2025</div>
        <div class="timeline-content">
          <h3>Project Started</h3>
          <p>Our project was officially launched.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-date">2024</div>
        <div class="timeline-content">
          <h3>Planning Phase</h3>
          <p>Development of the project plan and initial designs.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-date">2023</div>
        <div class="timeline-content">
          <h3>Concept Development</h3>
          <p>Initial research and concept creation.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: #42b883;
  top: 0;
  bottom: 0;
  left: 120px;
  margin-left: -2px;
}

.timeline-item {
  padding: 10px 40px 10px 150px;
  position: relative;
  margin-bottom: 30px;
}

.timeline-date {
  position: absolute;
  left: 0;
  width: 100px;
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.timeline-content {
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  left: -30px;
  top: 15px;
  border-radius: 50%;
  background-color: white;
  border: 4px solid #42b883;
  z-index: 1;
}

.timeline-content h3 {
  margin-top: 0;
  color: #42b883;
}
</style>

<script setup>
definePageMeta({
  layout: 'default',
})
</script>
