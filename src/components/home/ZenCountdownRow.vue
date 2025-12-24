<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const isToday = ref(false)

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

function updateCountdown() {
  const targetDate = getNextTargetDate(props.event.month, props.event.day)
  const diff = getTimeDiff(targetDate)
  
  isToday.value = diff.isToday
  days.value = diff.days
  hours.value = diff.hours
  minutes.value = diff.minutes
}

// 计算属性
const displayTitle = computed(() => {
  if (props.event.showYears && props.event.year) {
    const targetDate = getNextTargetDate(props.event.month, props.event.day)
    return `${targetDate.getFullYear() - props.event.year}周年`
  }
  return props.event.title
})

const accentColor = computed(() => {
  const colors = {
    rose: '#f472b6',
    violet: '#a78bfa',
    cyan: '#22d3ee',
    amber: '#fbbf24'
  }
  return colors[props.event.accent] || colors.rose
})

const formatDate = computed(() => {
  const m = String(props.event.month).padStart(2, '0')
  const d = String(props.event.day).padStart(2, '0')
  return `${m}.${d}`
})

let interval
onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 60000) // 每分钟更新
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div 
    class="zen-row"
    :style="{ 
      '--accent': accentColor,
      animationDelay: `${delay}ms`
    }"
  >
    <!-- 左侧：事件信息 -->
    <div class="event-info">
      <span class="event-title">{{ displayTitle }}</span>
      <span class="event-date">{{ formatDate }}</span>
    </div>

    <!-- 右侧：倒计时数字 -->
    <div class="countdown-display" v-if="!isToday">
      <span class="days-number">{{ days }}</span>
      <span class="days-label">days</span>
    </div>
    
    <!-- 今天状态 -->
    <div class="today-status" v-else>
      <span class="today-text">Today!</span>
    </div>
  </div>
</template>

<style scoped>
.zen-row {
  @apply flex items-center justify-between py-4 sm:py-5 md:py-6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  animation: slideInRow 0.6s ease-out backwards;
  transition: all 0.4s ease;
}

.zen-row:hover {
  border-bottom-color: var(--accent);
  padding-left: 0.5rem;
}

.zen-row:hover .event-title {
  color: var(--accent);
}

.zen-row:hover .days-number {
  color: var(--accent);
  transform: translateX(-4px);
}

/* 左侧事件信息 */
.event-info {
  @apply flex flex-col gap-0.5;
}

.event-title {
  @apply text-base sm:text-lg md:text-xl font-light text-white/90 transition-colors duration-300;
  letter-spacing: 0.05em;
}

.event-date {
  @apply text-xs sm:text-sm font-light tracking-widest;
  color: rgba(255, 255, 255, 0.3);
  font-variant-numeric: tabular-nums;
}

/* 右侧倒计时 */
.countdown-display {
  @apply flex items-baseline gap-2 sm:gap-3;
}

.days-number {
  @apply text-3xl sm:text-4xl md:text-5xl font-thin text-white transition-all duration-300;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.days-label {
  @apply text-xs sm:text-sm font-light uppercase tracking-widest;
  color: rgba(255, 255, 255, 0.25);
}

/* 今天状态 */
.today-status {
  @apply flex items-center;
}

.today-text {
  @apply text-lg sm:text-xl font-light;
  color: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes slideInRow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
