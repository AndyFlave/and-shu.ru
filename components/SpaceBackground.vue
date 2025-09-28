<template>
  <canvas
    v-if="enabled"
    ref="canvas"
    class="space-background"
    :class="{ 'space-background--fullscreen': fullscreen }"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

defineOptions({
  name: 'SpaceBackground',
})

const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  starCount: {
    type: Number,
    default: 300,
  },
  rotationSpeed: {
    type: Number,
    default: 0.001,
  },
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
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')

  function resizeCanvas() {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  for (let i = 0; i < props.starCount; i++) {
    stars.push(new Star())
  }

  function animate() {
    if (!canvas.value) return

    time++
    const width = canvas.value.width
    const height = canvas.value.height
    const centerX = width / 2
    const centerY = height / 2
    const focal = 600

    rotationAngle += props.rotationSpeed

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
    animationId = null
  }
  if (resizeCanvas) {
    window.removeEventListener('resize', resizeCanvas)
    resizeCanvas = null
  }
  stars = []
  time = 0
  rotationAngle = 0
}

onMounted(() => {
  if (props.enabled) {
    const { resizeCanvas: resizeFn } = initCanvas()
    resizeCanvas = resizeFn
  }
})

onUnmounted(() => {
  cleanup()
})

// Watch for enabled prop changes
watch(
  () => props.enabled,
  (newValue) => {
    if (newValue) {
      const { resizeCanvas: resizeFn } = initCanvas()
      resizeCanvas = resizeFn
    } else {
      cleanup()
    }
  }
)
</script>

<style scoped>
.space-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.space-background--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
