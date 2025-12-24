<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)

const currentEvent = computed(() => props.events[currentIndex.value])

const accentColors = {
  rose: '#f472b6',
  violet: '#a78bfa',
  cyan: '#22d3ee',
  amber: '#fbbf24'
}

function getCountdown(event) {
  const now = new Date()
  const currentYear = now.getFullYear()
  let targetDate = new Date(currentYear, event.month - 1, event.day, 0, 0, 0, 0)
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, event.month - 1, event.day, 0, 0, 0, 0)
  }
  
  const diff = targetDate - now
  if (diff <= 0) return { days: 0, isToday: true }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    isToday: false
  }
}

function getDisplayTitle(event) {
  if (event.showYears && event.year) {
    const now = new Date()
    const currentYear = now.getFullYear()
    let targetDate = new Date(currentYear, event.month - 1, event.day)
    if (now > targetDate) {
      targetDate = new Date(currentYear + 1, event.month - 1, event.day)
    }
    return `${targetDate.getFullYear() - event.year}周年`
  }
  return event.title
}

function nextEvent() {
  currentIndex.value = (currentIndex.value + 1) % props.events.length
}

function prevEvent() {
  currentIndex.value = (currentIndex.value - 1 + props.events.length) % props.events.length
}

function handleTouchStart(e) {
  touchStartX.value = e.changedTouches[0].screenX
}

function handleTouchEnd(e) {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

function handleSwipe() {
  if (touchEndX.value < touchStartX.value - 50) {
    nextEvent()
  }
  if (touchEndX.value > touchStartX.value + 50) {
    prevEvent()
  }
}

// 自动轮播
let intervalId
onMounted(() => {
  intervalId = setInterval(nextEvent, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="mobile-starlight-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <!-- 背景星尘动画 -->
    <div class="stardust-bg">
      <div v-for="n in 20" :key="n" class="dust" :style="{
        '--delay': `${Math.random() * 5}s`,
        '--x': `${Math.random() * 100}vw`,
        '--y': `${Math.random() * 100}vh`,
        '--size': `${Math.random() * 3 + 1}px`
      }"></div>
    </div>

    <!-- 顶部标题 -->
    <div class="top-bar">
      <h1 class="brand">STARSIDE</h1>
      <span class="indicator">{{ currentIndex + 1 }} / {{ events.length }}</span>
    </div>

    <!-- 核心内容区 (无卡片设计) -->
    <div class="main-content-wrapper">
      <transition name="fade-slide" mode="out-in">
        <div :key="currentEvent.id" class="event-display" :style="{ '--accent': accentColors[currentEvent.accent] }">
          
          <!-- 装饰性光晕背景 (极淡) -->
          <div class="glow-bg"></div>

          <div class="event-info">
            <!-- 顶部小标题 -->
            <div class="meta-top">
              <span class="star-symbol">✦</span>
              <h2 class="event-title">{{ getDisplayTitle(currentEvent) }}</h2>
              <span class="star-symbol">✦</span>
            </div>
            
            <!-- 核心倒计时数字 -->
            <div class="countdown-hero">
              <span class="number">{{ getCountdown(currentEvent).days }}</span>
              <span class="label">DAYS</span>
            </div>
            
            <!-- 底部日期 -->
            <div class="date-display">
              {{ currentEvent.month }} . {{ currentEvent.day }}
            </div>
          </div>

        </div>
      </transition>
    </div>

    <!-- 底部导航点 -->
    <div class="pagination">
      <span 
        v-for="(event, index) in events" 
        :key="event.id" 
        class="dot" 
        :class="{ 'active': index === currentIndex }"
        @click="currentIndex = index"
      ></span>
    </div>

    <!-- 底部链接 -->
    <footer class="mobile-footer">
       <a href="https://space.bilibili.com/401315430" target="_blank" class="plain-link">
         星瞳 Official <span class="arrow">→</span>
       </a>
    </footer>
  </div>
</template>

<style scoped>
.mobile-starlight-container {
  @apply fixed inset-0 w-full h-full flex flex-col items-center justify-between py-12 overflow-hidden;
  /* Deep Cosmic Aurora Background */
  background: radial-gradient(circle at 50% 120%, #2e1065, #000000 60%);
  z-index: 0; /* Ensure it sits above global bg */
}

.stardust-bg {
  @apply absolute inset-0 pointer-events-none;
}

.dust {
  @apply absolute rounded-full bg-white opacity-60;
  width: var(--size);
  height: var(--size);
  left: var(--x);
  top: var(--y);
  animation: float 10s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
}

.top-bar {
  @apply w-full flex justify-between items-center px-8 relative z-10;
}

.brand {
  @apply text-white font-thin tracking-[0.3em] text-xs opacity-60;
  font-family: 'Outfit', sans-serif;
}

.indicator {
  @apply text-white/30 text-xs font-mono;
}

/* Main Content - No Card */
.main-content-wrapper {
  @apply flex-1 w-full flex items-center justify-center relative z-10;
}

.event-display {
  @apply w-full h-full flex flex-col items-center justify-center relative;
}

.glow-bg {
  @apply absolute inset-0 pointer-events-none opacity-20;
  background: radial-gradient(circle at 50% 50%, var(--accent), transparent 60%);
  filter: blur(60px);
}

.event-info {
  @apply flex flex-col items-center justify-center gap-8 relative z-10;
}

.meta-top {
  @apply flex items-center gap-3 text-white/80;
}

.star-symbol {
  @apply text-xs opacity-60;
  color: var(--accent);
}

.event-title {
  @apply text-xl font-light tracking-widest text-white;
  text-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.countdown-hero {
  @apply flex flex-col items-center justify-center;
}

.number {
  @apply text-9xl font-thin text-white leading-none tracking-tighter;
  font-family: 'Outfit', sans-serif;
  text-shadow: 0 0 30px var(--accent);
}

.label {
  @apply text-sm tracking-[0.8em] text-white/40 mt-4 pl-2;
}

.date-display {
  @apply text-white/50 text-sm tracking-widest font-mono mt-4;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

/* Footer & Dots */
.pagination {
  @apply flex gap-4 mb-8 z-10;
}

.dot {
  @apply w-1.5 h-1.5 rounded-full bg-white/10 transition-all duration-500;
}

.dot.active {
  @apply bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-150;
  background-color: var(--accent, white);
}

.mobile-footer {
  @apply relative z-10 mb-4 w-full flex justify-center;
}

.plain-link {
  @apply text-white/30 text-xs tracking-widest inline-flex items-center gap-2 transition-colors relative;
}

.plain-link:active {
  @apply text-white;
}

.arrow {
  @apply opacity-0 transition-all absolute -right-4;
}

.plain-link:active .arrow {
  @apply opacity-100 translate-x-0;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  filter: blur(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.05);
  filter: blur(10px);
}
</style>
