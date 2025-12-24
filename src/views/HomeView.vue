<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import OrbitalConstellation from '../components/home/OrbitalConstellation.vue'
import MobileStarlight from '../components/home/MobileStarlight.vue'
import { events } from '../data/events.js'

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="home-container">
    <!-- 桌面端：轨道星弧 -->
    <OrbitalConstellation v-if="!isMobile" :events="events" />
    
    <!-- 移动端：单点星光 -->
    <MobileStarlight v-else :events="events" />
  </div>
</template>

<style scoped>
.home-container {
  @apply w-full h-full flex flex-col items-center justify-center relative z-10;
  min-height: 100vh; /* Ensure full height */
}
</style>
