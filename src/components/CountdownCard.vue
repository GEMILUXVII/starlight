<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const statusText = ref('')
const isToday = ref(false)
const hasCelebrated = ref(false)
const cardRef = ref(null)

// 3D 倾斜逻辑
const cardTransform = ref('')

const handleMouseMove = (e) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -8
  const rotateY = ((x - centerX) / centerX) * 8

  cardRef.value.style.setProperty('--mouse-x', `${x}px`)
  cardRef.value.style.setProperty('--mouse-y', `${y}px`)
  cardTransform.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
}

const handleMouseLeave = () => {
  cardTransform.value = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
}

// 倒计时逻辑
function getNextTargetDate(month, day) {
  const now = new Date()
  const currentYear = now.getFullYear()
  let targetDate = new Date(currentYear, month - 1, day, 0, 0, 0, 0)
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, month - 1, day, 0, 0, 0, 0)
  }
  return targetDate
}

function getTimeDiff(targetDate) {
  const now = new Date()
  const diff = targetDate - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isToday: true }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    isToday: false
  }
}

function animateCount(target, currentRef) {
  const start = 0
  const duration = 1500
  const startTime = performance.now()
  
  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(start + (target - start) * ease)
    currentRef.value = String(current).padStart(2, '0')
    
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

function updateCountdown(animate = false) {
  const targetDate = getNextTargetDate(props.event.month, props.event.day)
  const diff = getTimeDiff(targetDate)
  
  isToday.value = diff.isToday
  
  if (isToday.value) {
    days.value = '00'
    hours.value = '00'
    minutes.value = '00'
    statusText.value = '今天就是这一天'
    if (!hasCelebrated.value && window.particleSystem) {
      window.particleSystem.triggerConfetti()
      hasCelebrated.value = true
    }
  } else {
    // 首次加载动画
    if (animate) {
      animateCount(diff.days, days)
      animateCount(diff.hours, hours)
      animateCount(diff.minutes, minutes)
    } else {
      days.value = String(diff.days).padStart(2, '0')
      hours.value = String(diff.hours).padStart(2, '0')
      minutes.value = String(diff.minutes).padStart(2, '0')
    }
    
    const targetYear = targetDate.getFullYear()
    statusText.value = `${targetYear}年 · 距离还有 ${diff.days} 天`
  }
}

let interval
onMounted(() => {
  updateCountdown(true) // With animation
  interval = setInterval(() => updateCountdown(false), 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

// 计算属性
const badgeText = computed(() => {
  const map = { birthday: '生', debut: '出', valentine: '情' }
  return map[props.event.id] || '年'
})

const displayTitle = computed(() => {
  if (props.event.showYears && props.event.year) {
    const targetDate = getNextTargetDate(props.event.month, props.event.day)
    return `${targetDate.getFullYear() - props.event.year}周年`
  }
  return props.event.title
})

const accentClass = computed(() => {
  return props.event.accent // We'll use data attribute for style hook
})
</script>

<template>
  <article 
    ref="cardRef"
    class="countdown-card" 
    :data-accent="event.accent"
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
    :style="{ transform: cardTransform }"
  >
    <div class="card-content">
      <div class="card-header pb-3 border-b border-white/10 mb-4 text-center">
        <div class="hidden">{{ badgeText }}</div>
        <div class="card-info">
          <h2 class="card-title text-lg font-semibold text-white mb-0.5" :class="`text-${event.accent}`">{{ displayTitle }}</h2>
          <span class="card-date text-xs text-white/40">{{ event.month }}月{{ event.day }}日</span>
        </div>
      </div>
      
      <div class="countdown-display flex items-center justify-center gap-0.5">
        <div class="countdown-unit text-center p-1">
          <div class="countdown-value text-3xl font-extralight tabular-nums text-white leading-none shadow-text">{{ days }}</div>
          <div class="countdown-label text-[0.65rem] text-white/40 uppercase mt-1">天</div>
        </div>
        <div class="countdown-separator text-xl text-white/40 pb-3 font-light">:</div>
        <div class="countdown-unit text-center p-1">
          <div class="countdown-value text-3xl font-extralight tabular-nums text-white leading-none shadow-text">{{ hours }}</div>
          <div class="countdown-label text-[0.65rem] text-white/40 uppercase mt-1">时</div>
        </div>
        <div class="countdown-separator text-xl text-white/40 pb-3 font-light">:</div>
        <div class="countdown-unit text-center p-1">
          <div class="countdown-value text-3xl font-extralight tabular-nums text-white leading-none shadow-text">{{ minutes }}</div>
          <div class="countdown-label text-[0.65rem] text-white/40 uppercase mt-1">分</div>
        </div>
      </div>
      
      <div 
        class="countdown-status mt-3 px-2.5 py-1.5 rounded-lg bg-white/5 text-center text-xs text-white/70"
        :class="{ 'bg-gradient-to-br from-amber-400/20 to-rose-400/20 text-amber-400': isToday }"
      >
        {{ statusText }}
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Card styles using Tailwind @apply within CSS for the glass effect and interactions */
.countdown-card {
  @apply relative w-[200px] p-5 rounded-3xl bg-white/5 backdrop-blur-[40px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_20px_40px_-10px_rgba(0,0,0,0.3)] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] animate-[slideUp_0.8s_cubic-bezier(0.23,1,0.32,1)_backwards] overflow-hidden will-change-transform;
  transform-style: preserve-3d;
}

.countdown-card::before {
  content: '';
  @apply absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[3px] rounded-b-[3px] transition-[width] duration-300;
}

/* Explicit accent colors for the top bar */
.countdown-card[data-accent="rose"]::before { background: #f472b6; }
.countdown-card[data-accent="violet"]::before { background: #a78bfa; }
.countdown-card[data-accent="cyan"]::before { background: #22d3ee; }
.countdown-card[data-accent="amber"]::before { background: #fbbf24; }

/* Text colors */
.text-rose { color: #f472b6; }
.text-violet { color: #a78bfa; }
.text-cyan { color: #22d3ee; }
.text-amber { color: #fbbf24; }

.countdown-card:hover {
  @apply -translate-y-2 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_30px_60px_-12px_rgba(0,0,0,0.4),0_0_20px_-5px_rgba(255,255,255,0.1)];
}

.countdown-card:hover::before {
  @apply w-[80%];
}

/* Spotlight Effect */
.countdown-card::after {
  content: "";
  @apply absolute inset-0 rounded-[inherit] z-[2] opacity-0 transition-opacity duration-300 pointer-events-none;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.1),
    transparent 40%
  );
}

.countdown-card:hover::after {
  @apply opacity-100;
}

.shadow-text {
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

@media (max-width: 1200px) {
  .countdown-card {
    @apply w-[180px] p-4;
  }
}

@media (max-width: 900px) {
  .countdown-card {
    @apply w-[160px];
  }
}

@media (max-width: 480px) {
  .countdown-card {
    @apply w-full max-w-[200px];
  }
}
</style>
