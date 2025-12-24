<script setup>
import { ref } from 'vue'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  coverUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click'])

// 分享功能
const copied = ref(false)
const shareSong = async () => {
  // 使用 hash 路由格式：/#/music?song=id
  const url = `${window.location.origin}${window.location.pathname}#/music?song=${props.song.id}`
  try {
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div 
    @click="emit('click')"
    class="song-item group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-[0.99]"
    :class="{ 'bg-white/10 !border-white/10 shadow-lg shadow-black/20': isActive }"
  >
    <!-- Cover -->
    <div class="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-xl transition-shadow">
      <img :src="coverUrl" :alt="song.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      
      <!-- Playing Overlay -->
      <div 
        v-if="isActive && isPlaying"
        class="absolute inset-0 bg-char-navy/60 backdrop-blur-[2px] flex items-center justify-center text-char-blue"
      >
        <div class="flex items-end gap-[3px] h-4">
          <span class="w-1 bg-current rounded-full animate-music-bar-1 opacity-80"></span>
          <span class="w-1 bg-white rounded-full animate-music-bar-2"></span>
          <span class="w-1 bg-current rounded-full animate-music-bar-3 opacity-80"></span>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0 flex flex-col justify-center">
      <div class="flex items-center gap-3 mb-1">
        <h3 
          class="font-bold text-lg truncate transition-colors"
          :class="isActive ? 'text-char-blue' : 'text-white group-hover:text-white/90'"
        >
          {{ song.title }}
        </h3>
        <div v-if="song.tags.length" class="flex gap-1.5">
           <span 
            v-for="tag in song.tags.slice(0, 2)" 
            :key="tag"
            class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border"
            :class="isActive ? 'border-char-blue/30 text-char-blue bg-char-blue/10' : 'border-white/10 text-white/40 group-hover:border-white/20'"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <p class="text-sm truncate transition-colors" :class="isActive ? 'text-white/70' : 'text-white/40 group-hover:text-white/60'">
        {{ song.artist }}
        <span v-if="song.subtitle" class="opacity-60"> · {{ song.subtitle }}</span>
      </p>
    </div>

    <!-- Date/Status -->
    <div class="hidden sm:flex flex-col items-end gap-1">
       <span class="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">{{ song.date }}</span>
    </div>

    <!-- Share Button -->
    <button 
      @click.stop="shareSong"
      class="w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      :class="copied ? 'text-green-400 bg-green-400/20' : 'text-white/20 hover:text-white hover:bg-white/10'"
      :title="copied ? '已复制链接' : '分享歌曲'"
    >
      <!-- Check Icon (copied) -->
      <svg v-if="copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <!-- Share Icon -->
      <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.animate-music-bar-1 {
  animation: musicBar 0.5s ease-in-out infinite alternate;
}

.animate-music-bar-2 {
  animation: musicBar 0.7s ease-in-out infinite alternate;
  animation-delay: 0.1s;
}

.animate-music-bar-3 {
  animation: musicBar 0.9s ease-in-out infinite alternate;
  animation-delay: 0.2s;
}

@keyframes musicBar {
  0% { height: 4px; opacity: 0.5; }
  100% { height: 16px; opacity: 1; }
}

.song-item {
  transform: translateZ(0);
}
</style>
