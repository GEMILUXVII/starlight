<script setup>
import OrbitalConstellation from '../components/home/OrbitalConstellation.vue'
import { events } from '../data/events.js'
</script>

<template>
  <div class="home-container">
    <!-- 轨道星弧 -->
    <OrbitalConstellation :events="events" />
  </div>
</template>

<style scoped>
.home-container {
  @apply w-full h-full flex flex-col items-center justify-center relative z-10;
  min-height: calc(100vh - 120px);
}
</style>
