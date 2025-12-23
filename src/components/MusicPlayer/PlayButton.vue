<script setup>
defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <button 
    @click="emit('toggle')"
    class="group relative flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
  >
    <!-- Breathing Glow (Active only when playing) -->
    <div 
      v-if="isPlaying"
      class="absolute w-20 h-20 rounded-full animate-pulse-glow"
    ></div>

    <!-- Icon Only (Apple Music Style) -->
    <svg v-if="!isPlaying" class="w-14 h-14 text-white fill-current drop-shadow-lg transition-opacity duration-200 group-hover:opacity-80" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <svg v-else class="w-14 h-14 text-white fill-current drop-shadow-lg transition-opacity duration-200 group-hover:opacity-80" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  </button>
</template>

<style scoped>
.animate-pulse-glow {
  animation: pulseGlow 2.5s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { 
    opacity: 0.1; 
    transform: scale(1); 
    background-color: rgba(255,255,255,0.15);
    box-shadow: 0 0 15px rgba(255,255,255,0.2);
  }
  50% { 
    opacity: 0.9; 
    transform: scale(0.9); 
    background-color: rgba(46,92,255,0.15);
    box-shadow: 0 0 35px rgba(46,92,255,0.3);
  }
}
</style>
