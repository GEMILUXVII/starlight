<script setup>
import { formatTime } from '../../stores/audioPlayerStore.js'

defineProps({
  currentTime: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['seek'])

const handleSeek = (event) => {
  emit('seek', event)
}
</script>

<template>
  <div class="group/progress flex items-center gap-4">
    <span class="text-xs text-white/40 w-10 text-right font-mono tracking-wider">
      {{ formatTime(currentTime) }}
    </span>
    
    <div 
      class="flex-1 h-8 flex items-center cursor-pointer relative"
      @click="handleSeek"
    >
      <!-- Track -->
      <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm"></div>
      
      <!-- Progress Overlay -->
      <div 
        class="absolute left-0 h-1 bg-gradient-to-r from-char-blue to-char-silver rounded-full shadow-[0_0_12px_rgba(46,92,255,0.6)]"
        :style="{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }"
      ></div>

      <!-- Thumb/Glow -->
      <div 
        class="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 scale-50 group-hover/progress:opacity-100 group-hover/progress:scale-100 transition-all duration-300 ease-out pointer-events-none"
        :style="{ left: duration ? `calc(${(currentTime / duration) * 100}% - 6px)` : '0' }"
      >
        <div class="absolute inset-0 bg-char-blue/50 rounded-full animate-ping"></div>
      </div>
    </div>

    <span class="text-xs text-white/40 w-10 font-mono tracking-wider">
      {{ formatTime(duration) }}
    </span>
  </div>
</template>
