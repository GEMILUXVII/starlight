<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  audioPlayerStore, 
  togglePlay, 
  playNext, 
  stopPlayback,
  getAssetUrlFromStore,
  formatTime
} from '../stores/audioPlayerStore.js'

const router = useRouter()

// 计算属性
const currentSong = computed(() => audioPlayerStore.currentSong)
const isPlaying = computed(() => audioPlayerStore.isPlaying)
const currentTime = computed(() => audioPlayerStore.currentTime)
const duration = computed(() => audioPlayerStore.duration)

// 进度百分比
const progress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

// 跳转到音乐页面
const goToMusicPage = () => {
  router.push('/music')
}

// 关闭迷你播放器
const closeMiniPlayer = () => {
  stopPlayback()
}
</script>

<template>
  <Transition name="mini-player">
    <div 
      v-if="currentSong"
      class="fixed bottom-4 right-4 z-50 flex items-center gap-3 p-3 pr-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 max-w-[320px]"
    >
      <!-- Album Art -->
      <div 
        class="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group"
        @click="goToMusicPage"
      >
        <img 
          :src="getAssetUrlFromStore(currentSong.cover)" 
          :alt="currentSong.title"
          class="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <!-- Expand Icon -->
        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
          </svg>
        </div>
      </div>

      <!-- Song Info -->
      <div class="flex-1 min-w-0 cursor-pointer" @click="goToMusicPage">
        <h4 class="text-sm font-medium text-white truncate">{{ currentSong.title }}</h4>
        <p class="text-xs text-white/50 truncate">{{ currentSong.artist }}</p>
        
        <!-- Mini Progress Bar -->
        <div class="mt-1.5 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            class="h-full bg-rose-400 rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-1">
        <!-- Play/Pause -->
        <button 
          @click="togglePlay"
          class="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg v-if="!isPlaying" class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>

        <!-- Next -->
        <button 
          @click="playNext"
          class="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>

        <!-- Close -->
        <button 
          @click="closeMiniPlayer"
          class="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          title="关闭播放器"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mini-player-enter-active,
.mini-player-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mini-player-enter-from,
.mini-player-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
