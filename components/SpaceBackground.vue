<template>
  <canvas
    v-if="enabled"
    ref="canvasRef"
    class="space-background"
    :class="{ 'space-background_fullscreen': fullscreen }"
  ></canvas>
</template>

<script setup lang="ts">
defineOptions({ name: 'SpaceBackground' })

interface Props {
  enabled?: boolean
  fullscreen?: boolean
  starCount?: number
  rotationSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  fullscreen: false,
  starCount: 300,
  rotationSpeed: 0.001,
})

const FOCAL = 600
const SPREAD = 4000
const Z_NEAR = 1000
const Z_RANGE = 3000
const SHADOW_THRESHOLD = 0.8
const TWINKLE_AMPLITUDE = 0.4
const GRADIENT_STOPS = ['#0a0a0f', '#161618', '#0f0f15'] as const
const COLOR_BIAS = { warmYellow: 0.7, paleBlue: 0.9 } as const

interface RGB { r: number; g: number; b: number }
interface Vec3 { x: number; y: number; z: number }
interface Projection { x: number; y: number; scale: number }

class Star {
  pos: Vec3
  size: number
  brightness: number
  twinkleSpeed: number
  originalBrightness: number
  color: RGB

  constructor() {
    this.pos = {
      x: (Math.random() - 0.5) * SPREAD,
      y: (Math.random() - 0.5) * SPREAD,
      z: Z_NEAR + Math.random() * Z_RANGE,
    }
    this.size = Math.random() * 1.5 + 0.5
    this.brightness = Math.random() * 0.6 + 0.4
    this.originalBrightness = this.brightness
    this.twinkleSpeed = Math.random() * 0.02 + 0.01
    this.color = Star.pickColor()
  }

  static pickColor(): RGB {
    const t = Math.random()
    if (t < COLOR_BIAS.warmYellow) return { r: 255, g: 255, b: 200 }
    if (t < COLOR_BIAS.paleBlue) return { r: 200, g: 220, b: 255 }
    return { r: 255, g: 200, b: 180 }
  }

  update(time: number) {
    this.brightness =
      this.originalBrightness + Math.sin(time * this.twinkleSpeed) * TWINKLE_AMPLITUDE
  }

  private project(centerX: number, centerY: number): Projection | null {
    if (this.pos.z <= 0) return null
    const scale = FOCAL / this.pos.z
    return {
      x: centerX + this.pos.x * scale,
      y: centerY + this.pos.y * scale,
      scale,
    }
  }

  draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    const proj = this.project(centerX, centerY)
    if (!proj) return
    const alpha = this.brightness * Math.min(1, proj.scale * 5)
    const { r, g, b } = this.color

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.beginPath()
    ctx.arc(proj.x, proj.y, this.size * proj.scale, 0, Math.PI * 2)
    ctx.fill()

    if (this.brightness > SHADOW_THRESHOLD) {
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`
      ctx.shadowBlur = this.size * proj.scale * 2
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let animationId: number | null = null
let stars: Star[] = []
let rotationAngle = 0
let resizeHandler: (() => void) | null = null
let reducedMotion = false
let motionMedia: MediaQueryList | null = null
let motionListener: ((e: MediaQueryListEvent) => void) | null = null

const drawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  const centerX = width / 2
  const centerY = height / 2

  ctx.clearRect(0, 0, width, height)

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, GRADIENT_STOPS[0])
  gradient.addColorStop(0.5, GRADIENT_STOPS[1])
  gradient.addColorStop(1, GRADIENT_STOPS[2])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.save()
  if (!reducedMotion) {
    ctx.translate(centerX, centerY)
    ctx.rotate(rotationAngle)
    ctx.translate(-centerX, -centerY)
  }

  for (const star of stars) {
    if (!reducedMotion) star.update(time)
    star.draw(ctx, centerX, centerY)
  }

  ctx.restore()
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  resizeHandler = () => {
    if (!canvasRef.value) return
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
  resizeHandler()
  window.addEventListener('resize', resizeHandler)

  stars = Array.from({ length: props.starCount }, () => new Star())

  if (reducedMotion) {
    drawFrame(ctx, canvas.width, canvas.height, 0)
    return
  }

  const startedAt = performance.now()
  const tick = (now: number) => {
    if (!canvasRef.value) return
    const elapsed = (now - startedAt) / 16.67
    rotationAngle += props.rotationSpeed
    drawFrame(ctx, canvasRef.value.width, canvasRef.value.height, elapsed)
    animationId = requestAnimationFrame(tick)
  }
  animationId = requestAnimationFrame(tick)
}

const cleanup = () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  stars = []
  rotationAngle = 0
}

const onMotionChange = (e: MediaQueryListEvent) => {
  reducedMotion = e.matches
  if (!props.enabled) return
  cleanup()
  initCanvas()
}

const start = () => {
  if (typeof window === 'undefined') return
  motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = motionMedia.matches
  motionListener = onMotionChange
  motionMedia.addEventListener('change', motionListener)
  initCanvas()
}

const stop = () => {
  cleanup()
  if (motionMedia && motionListener) {
    motionMedia.removeEventListener('change', motionListener)
  }
  motionMedia = null
  motionListener = null
}

onMounted(() => {
  if (props.enabled) start()
})

onUnmounted(() => {
  stop()
})

watch(
  () => props.enabled,
  (enabled) => {
    if (enabled) {
      start()
    } else {
      stop()
    }
  },
)
</script>

<style scoped>
.space-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background-color: #161618;
}

.space-background_fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
