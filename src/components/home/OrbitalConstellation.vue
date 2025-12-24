<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

const hoveredEvent = ref(null)

// 手指位置（根据背景图调整）
// 手指尖位置
const fingerX = 44 // vw - 再往左
const fingerY = 10  // vh - 再往上

// 星星从手指向右上方发散
const starPositions = [
  { offsetX: 8, offsetY: -2 },    // 右上方 - 第一颗星
  { offsetX: 14, offsetY: -5 },   // 更右上 - 第二颗
  { offsetX: 18, offsetY: -1 },   // 右侧偏上 - 第三颗
  { offsetX: 22, offsetY: 3 },    // 右侧 - 第四颗
]

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

// 颜色映射
const accentColors = {
  rose: '#f472b6',
  violet: '#a78bfa',
  cyan: '#22d3ee',
  amber: '#fbbf24'
}

// 星星微微闪烁动画
const twinklePhase = ref(0)
let animationFrame

function animate() {
  twinklePhase.value += 0.02
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="fingertip-stars-container">
    <!-- 左下角标题 + B站链接 (统一居中对齐) -->
    <div class="title-section">
      <h1 class="main-title">
        <span class="star">✦</span>
        XINGTONG
        <span class="star">✦</span>
      </h1>
      <p class="subtitle">星星的星 闪耀双瞳的瞳</p>
      
      <!-- B站链接 -->
      <a 
        href="https://space.bilibili.com/401315430" 
        target="_blank" 
        rel="noopener" 
        class="bili-link"
      >
        <svg class="bili-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12z"/>
        </svg>
        <span>前往 B站 主页</span>
        <span class="arrow">→</span>
      </a>
    </div>

    <!-- 手指发出的连接线 -->
    <svg class="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line 
        v-for="(event, index) in events"
        :key="`line-${event.id}`"
        :x1="fingerX"
        :y1="fingerY"
        :x2="fingerX + starPositions[index].offsetX"
        :y2="fingerY + starPositions[index].offsetY"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="0.1"
        stroke-dasharray="0.3 0.6"
      />
    </svg>

    <!-- 星星事件节点 -->
    <div 
      v-for="(event, index) in events"
      :key="event.id"
      class="star-node"
      :style="{
        '--x': `${fingerX + starPositions[index].offsetX}vw`,
        '--y': `${fingerY + starPositions[index].offsetY}vh`,
        '--color': accentColors[event.accent],
        '--delay': `${index * 0.75}s`,
        '--twinkle': Math.sin(twinklePhase + index * 1.5) * 0.3 + 0.7
      }"
      @mouseenter="hoveredEvent = event.id"
      @mouseleave="hoveredEvent = null"
    >
      <!-- 发光星点 -->
      <div class="star-glow" :class="{ 'is-hovered': hoveredEvent === event.id }">
        <span class="star-icon">✦</span>
      </div>
      
      <!-- 标签 -->
      <div class="star-label" :class="{ 'is-hovered': hoveredEvent === event.id }">
        <span class="label-title">{{ getDisplayTitle(event) }}</span>
        <span class="label-days">{{ getCountdown(event).days }}<small>天</small></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fingertip-stars-container {
  @apply w-full h-full relative z-10;
  min-height: calc(100vh - 120px);
}

/* 左下角标题 */
.title-section {
  @apply absolute bottom-28 left-8 md:left-12 flex flex-col items-center;
  animation: fadeInUp 0.8s ease-out;
}

.main-title {
  @apply text-4xl sm:text-5xl md:text-6xl font-thin text-white tracking-tight;
}

.main-title .star {
  @apply text-base sm:text-lg opacity-40;
  color: var(--rose);
  animation: twinkle 3s ease-in-out infinite;
}

.main-title .star:last-child {
  animation-delay: 1.5s;
}

.subtitle {
  @apply text-xs tracking-[0.3em] uppercase mt-1;
  color: rgba(255, 255, 255, 0.3);
}

/* 连接线SVG */
.connection-lines {
  @apply absolute inset-0 w-full h-full pointer-events-none;
}

/* 星星节点 */
.star-node {
  @apply absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  animation: starAppear 0.6s ease-out var(--delay) backwards;
}

.star-glow {
  @apply relative flex items-center justify-center transition-all duration-300 cursor-pointer;
  filter: drop-shadow(0 0 8px var(--color)) drop-shadow(0 0 16px var(--color));
  opacity: var(--twinkle);
}

.star-glow.is-hovered {
  transform: scale(1.5);
  filter: drop-shadow(0 0 12px var(--color)) drop-shadow(0 0 24px var(--color)) drop-shadow(0 0 36px var(--color));
  opacity: 1;
}

.star-icon {
  @apply text-3xl md:text-4xl;
  color: var(--color);
  animation: starBreathe 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

/* 标签 */
.star-label {
  @apply absolute left-8 top-1/2 -translate-y-1/2;
  @apply flex items-baseline gap-2 whitespace-nowrap;
  @apply transition-all duration-300;
  opacity: 0.7;
}

.star-label.is-hovered {
  opacity: 1;
  transform: translateX(4px) translateY(-50%);
}

.label-title {
  @apply text-sm font-light text-white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.8);
}

.label-days {
  @apply text-lg font-thin tabular-nums;
  color: var(--color);
  text-shadow: 0 0 10px var(--color);
}

.label-days small {
  @apply text-xs ml-0.5 opacity-60;
}

.bili-link {
  @apply inline-flex items-center gap-2 text-sm transition-all duration-300 mt-4;
  color: rgba(255, 255, 255, 0.25);
}

.bili-link:hover {
  color: rgba(255, 255, 255, 0.7);
}

.bili-link:hover .bili-icon {
  color: #FB7299;
}

.bili-link:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

.bili-icon {
  @apply w-5 h-5 transition-colors duration-300;
}

.arrow {
  @apply opacity-0 -translate-x-2 transition-all duration-300;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes starBreathe {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 4px currentColor);
  }
  50% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 12px currentColor) drop-shadow(0 0 20px currentColor);
  }
}

@keyframes starAppear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .title-section {
    @apply left-4 bottom-20;
  }
  
  .main-title {
    @apply text-3xl;
  }
  
  .star-node {
    /* 移动端星星位置调整 */
    --x: calc(var(--x) * 0.8 + 10vw);
    --y: calc(var(--y) * 0.9 + 5vh);
  }
  
  .star-icon {
    @apply text-lg;
  }
  
  .star-label {
    @apply left-6;
  }
  
  .label-title {
    @apply text-xs;
  }
  
  .label-days {
    @apply text-base;
  }
  
  .bottom-link {
    @apply left-4;
  }
}
</style>
