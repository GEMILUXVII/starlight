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
    class="group relative w-20 h-20 flex items-center justify-center transition-transform duration-300 hover:scale-[1.05] active:scale-95 z-20"
  >
    <!-- Sound Waves (Active only when playing) -->
    <template v-if="isPlaying">
      <div class="absolute inset-0 rounded-full border border-char-blue/40 opacity-0 animate-wave"></div>
      <div class="absolute inset-0 rounded-full border border-char-blue/40 opacity-0 animate-wave delay-600"></div>
      <div class="absolute inset-0 rounded-full border border-char-blue/40 opacity-0 animate-wave delay-1200"></div>
    </template>

    <!-- Play Button Body (Minimalist & Solid) -->
    <div class="relative w-16 h-16 rounded-full bg-char-blue flex items-center justify-center shadow-[0_0_20px_rgba(46,92,255,0.4)] border border-white/20 z-20 group-hover:bg-[#1B3BA0] transition-colors duration-300">
       <!-- Subtle Inner Glow -->
       <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

       <!-- Icon -->
       <svg v-if="!isPlaying" class="w-7 h-7 text-white ml-1 fill-current drop-shadow-sm" viewBox="0 0 24 24">
         <path d="M8 5v14l11-7z"/>
       </svg>
       <svg v-else class="w-7 h-7 text-white fill-current drop-shadow-sm" viewBox="0 0 24 24">
         <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
       </svg>
    </div>
  </button>
</template>

<style scoped>
@keyframes wave {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}

.animate-wave {
  animation: wave 2s infinite ease-out;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-1200 {
  animation-delay: 1.2s;
}
</style>
