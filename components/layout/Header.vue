<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">My Project</h1>
      <nav class="navigation">
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/timeline">Timeline</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
  defineOptions({
    name: 'LayoutHeader',
  })
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    margin: 0;
    font-size: 3rem;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
    background: linear-gradient(45deg, #ffffff, #a0c4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .navigation ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navigation li {
    margin-left: 2rem;
  }

  .navigation a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(100, 200, 255, 0.3);
  }

  .navigation a:hover,
  .navigation a.router-link-active {
    background: rgba(100, 200, 255, 0.2);
    box-shadow: 0 0 20px rgba(100, 200, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 2rem;
    }

    .logo {
      font-size: 2rem;
    }

    .navigation li {
      margin-left: 1rem;
    }

    .navigation a {
      font-size: 1rem;
    }
  }
</style>
