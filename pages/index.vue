<template>
  <div class="hero-content">
    <div class="container">
      <h1 class="hero-title">Welcome to the Future</h1>
      <p class="hero-description">
        Experience the cosmic journey through our innovative platform. Navigate
        through time and space with our cutting-edge technology.
      </p>
      <div class="hero-buttons">
        <NuxtLink to="/timeline" class="btn btn-primary"
          >Explore Timeline</NuxtLink
        >
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
    padding: $spacing-xl 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }

  .hero-title {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: $spacing-lg;
    @include gradient-text($text-color, $accent-color, $primary-color);
    @include glow-effect($primary-color, 0.5);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .hero-description {
    font-size: $font-size-xl;
    line-height: 1.6;
    color: $text-muted;
    margin-bottom: $spacing-xxl;
    @include glow-effect($primary-color, 0.3);
  }

  .hero-buttons {
    display: flex;
    gap: $spacing-lg;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: $spacing-md $spacing-xl;
    border: none;
    border-radius: $border-radius-full;
    font-size: $font-size-lg;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &-primary {
      background: linear-gradient(45deg, $primary-color, $secondary-color);
      color: $text-color;
      box-shadow: 0 4px 15px rgba($primary-color, 0.4);
      @include button-hover($primary-color);
    }

    &-secondary {
      background: transparent;
      color: $text-color;
      border: 2px solid rgba($text-color, 0.3);
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba($text-color, 0.1);
        border-color: rgba($text-color, 0.5);
        transform: translateY(-3px);
      }
    }
  }

  @keyframes glow {
    from {
      @include glow-effect($primary-color, 0.5);
    }
    to {
      text-shadow: 0 0 30px rgba($primary-color, 0.8),
        0 0 40px rgba($primary-color, 0.3);
    }
  }

  @media (max-width: $breakpoint-md) {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-description {
      font-size: $font-size-lg;
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
