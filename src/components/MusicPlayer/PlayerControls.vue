<script setup>
import PlayButton from './PlayButton.vue'

defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['prev', 'next', 'toggle'])
</script>

<template>
  <div class="flex items-center justify-center lg:justify-start gap-8 md:gap-10">
    <!-- Previous Button -->
    <button 
      @click="emit('prev')" 
      class="text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </svg>
    </button>
    
    <!-- Play/Pause Button -->
    <PlayButton :is-playing="isPlaying" @toggle="emit('toggle')" />

    <!-- Next Button -->
    <button 
      @click="emit('next')" 
      class="text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
      </svg>
    </button>
  </div>
</template>
