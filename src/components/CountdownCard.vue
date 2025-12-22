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
  return props.event.accent 
})
</script>

<template>
  <article 
    class="countdown-card group" 
    :data-accent="event.accent"
  >
    <div class="flex items-center justify-between">
      <!-- Left: Title & Date -->
      <div>
        <h2 class="text-2xl font-light text-white mb-1 group-hover:text-shadow-glow transition-all" :class="`text-${event.accent}`">{{ displayTitle }}</h2>
        <span class="text-sm text-white/40 font-mono tracking-widest">{{ event.month }}/{{ event.day }}</span>
      </div>

      <!-- Right: Countdown -->
      <div 
        v-if="!isToday"
        class="flex items-baseline gap-4 text-right"
      >
        <div class="flex flex-col items-end">
           <span class="text-3xl font-light text-white leading-none tabular-nums">{{ days }}</span>
           <span class="text-[0.6rem] text-white/30 uppercase tracking-widest">Days</span>
        </div>
        <div class="w-px h-8 bg-white/10"></div>
        <div class="flex gap-3">
          <div class="flex flex-col items-center w-8">
            <span class="text-lg font-light text-white/80 leading-none tabular-nums">{{ hours }}</span>
            <span class="text-[0.5rem] text-white/30 uppercase mt-1">Hr</span>
          </div>
          <div class="flex flex-col items-center w-8">
            <span class="text-lg font-light text-white/80 leading-none tabular-nums">{{ minutes }}</span>
            <span class="text-[0.5rem] text-white/30 uppercase mt-1">Min</span>
          </div>
        </div>
      </div>

      <!-- Today Status -->
      <div v-else class="text-right">
        <span class="text-xl font-bold text-amber-400 animate-pulse">{{ statusText }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Minimal Wide Strip Style */
.countdown-card {
  @apply relative w-full p-6 rounded-xl transition-all duration-300;
  background: linear-gradient(to right, transparent, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.4) 100%);
  border-right: 4px solid transparent; /* Changed to right border */
}

/* Accent Borders (Right side) */
.countdown-card[data-accent="rose"] { border-right-color: #f472b6; }
.countdown-card[data-accent="violet"] { border-right-color: #a78bfa; }
.countdown-card[data-accent="cyan"] { border-right-color: #22d3ee; }
.countdown-card[data-accent="amber"] { border-right-color: #fbbf24; }

.countdown-card:hover {
  background: linear-gradient(to right, transparent, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 100%);
  transform: translateX(-8px); /* Move slightly left on hover */
}

/* Enhanced visibility classes */
.font-visible {
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.text-shadow-glow {
  text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
}

.shadow-text {
  text-shadow: 0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5);
  font-weight: 400; /* Increased from extralight */
}
</style>
