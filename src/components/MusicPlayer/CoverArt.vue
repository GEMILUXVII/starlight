<script setup>
defineProps({
  coverUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Album Cover'
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/20 group">
    <img 
      :src="coverUrl" 
      :alt="title"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <!-- Play overlay -->
    <div 
      class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      @click="emit('toggle')"
    >
      <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
        <svg v-if="!isPlaying" class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </div>
    </div>
  </div>
</template>
