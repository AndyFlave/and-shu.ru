<template>
  <header class="header">
    <canvas ref="canvas" class="comet-canvas"></canvas>
    <div class="header-content">
      <div class="container">
        <h1 class="logo">My Project</h1>
        <nav class="navigation">
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/timeline">Timeline</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'LayoutHeader',
})

const canvas = ref(null)
let animationId = null
let stars = []
let time = 0
let rotationAngle = 0
let resizeCanvas = null

class Star {
  constructor() {
    this.pos = {
      x: (Math.random() - 0.5) * 4000,
      y: (Math.random() - 0.5) * 4000,
      z: 1000 + Math.random() * 3000,
    }
    this.size = Math.random() * 1.5 + 0.5
    this.brightness = Math.random() * 0.6 + 0.4
    this.twinkleSpeed = Math.random() * 0.02 + 0.01
    this.originalBrightness = this.brightness
    this.color = this.getStarColor()
  }

  getStarColor() {
    const colorType = Math.random()
    if (colorType < 0.7) {
      return { r: 255, g: 255, b: 200 }
    } else if (colorType < 0.9) {
      return { r: 200, g: 220, b: 255 }
    } else {
      return { r: 255, g: 200, b: 180 }
    }
  }

  update() {
    this.brightness =
      this.originalBrightness + Math.sin(time * this.twinkleSpeed) * 0.4
  }

  draw(ctx, centerX, centerY, focal) {
    const proj = this.project(this.pos, centerX, centerY, focal)
    if (!proj) return
    const alpha = this.brightness * Math.min(1, proj.scale * 5)

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`
    ctx.beginPath()
    ctx.arc(proj.x, proj.y, this.size * proj.scale, 0, Math.PI * 2)
    ctx.fill()

    if (this.brightness > 0.8) {
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${
        this.color.b
      }, ${alpha * 0.3})`
      ctx.shadowBlur = this.size * proj.scale * 2
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  project(p, centerX, centerY, focal) {
    if (p.z <= 0) return null
    const scale = focal / p.z
    return {
      x: centerX + p.x * scale,
      y: centerY + p.y * scale,
      scale: scale,
    }
  }
}

function initCanvas() {
  const ctx = canvas.value.getContext('2d')

  function resizeCanvas() {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  for (let i = 0; i < 300; i++) {
    stars.push(new Star())
  }

  function animate() {
    time++
    const width = canvas.value.width
    const height = canvas.value.height
    const centerX = width / 2
    const centerY = height / 2
    const focal = 600

    rotationAngle += 0.001

    ctx.clearRect(0, 0, width, height)

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#0a0a0f')
    gradient.addColorStop(0.5, '#161618')
    gradient.addColorStop(1, '#0f0f15')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotationAngle)
    ctx.translate(-centerX, -centerY)

    stars.forEach((star) => {
      star.update()
      star.draw(ctx, centerX, centerY, focal)
    })

    ctx.restore()

    animationId = requestAnimationFrame(animate)
  }

  animate()

  return { resizeCanvas }
}

function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (resizeCanvas) {
    window.removeEventListener('resize', resizeCanvas)
  }
}

onMounted(() => {
  const { resizeCanvas: resizeFn } = initCanvas()
  resizeCanvas = resizeFn
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.header {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comet-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  width: 100%;
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
