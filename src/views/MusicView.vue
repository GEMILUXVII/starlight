<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import CoverArt from '../components/MusicPlayer/CoverArt.vue'
import ProgressBar from '../components/MusicPlayer/ProgressBar.vue'
import PlayerControls from '../components/MusicPlayer/PlayerControls.vue'
import VolumeControl from '../components/MusicPlayer/VolumeControl.vue'
import PlaybackModeControl from '../components/MusicPlayer/PlaybackModeControl.vue'
import SongItem from '../components/MusicPlayer/SongItem.vue'
import { 
  audioPlayerStore,
  playSong as storePlaySong,
  togglePlay,
  playNext,
  playPrev,
  seek,
  setVolume,
  setVolumeValue,
  getAssetUrlFromStore
} from '../stores/audioPlayerStore.js'

// 使用全局 store
const currentSong = computed(() => audioPlayerStore.currentSong)
const isPlaying = computed(() => audioPlayerStore.isPlaying)
const currentTime = computed(() => audioPlayerStore.currentTime)
const duration = computed(() => audioPlayerStore.duration)
const volume = computed({
  get: () => audioPlayerStore.volume,
  set: (val) => { audioPlayerStore.volume = val }
})
const filteredSongs = computed(() => audioPlayerStore.filteredSongs)
const searchQuery = computed({
  get: () => audioPlayerStore.searchQuery,
  set: (val) => { audioPlayerStore.searchQuery = val }
})
const playbackMode = computed({
  get: () => audioPlayerStore.playbackMode,
  set: (val) => { audioPlayerStore.playbackMode = val }
})

// 封装播放函数
const playSong = (song) => storePlaySong(song)

// 获取资源 URL
const getAssetUrl = (path) => getAssetUrlFromStore(path)

// 处理静音
const handleMute = (v) => {
  setVolumeValue(v)
}

onMounted(() => {
  // 处理分享链接：检查 URL 参数中是否有指定歌曲
  // hash 路由格式：#/music?song=id
  const hash = window.location.hash
  const queryIndex = hash.indexOf('?')
  if (queryIndex !== -1) {
    const queryString = hash.substring(queryIndex + 1)
    const urlParams = new URLSearchParams(queryString)
    const songId = urlParams.get('song')
    
    if (songId) {
      const sharedSong = audioPlayerStore.songs.find(s => s.id === parseInt(songId))
      if (sharedSong) {
        // 延迟播放，确保音频元素已初始化
        setTimeout(() => {
          playSong(sharedSong)
        }, 100)
      }
      // 清除 URL 参数，保留路由路径
      window.history.replaceState({}, '', window.location.pathname + '#/music')
    }
  }
})

// 键盘快捷键
const handleKeydown = (e) => {
  // 如果在输入框中，不处理快捷键
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  
  switch (e.code) {
    case 'Space':
      e.preventDefault()
      if (currentSong.value) togglePlay()
      break
    case 'ArrowLeft':
      e.preventDefault()
      playPrev()
      break
    case 'ArrowRight':
      e.preventDefault()
      playNext()
      break
    case 'ArrowUp':
      e.preventDefault()
      setVolumeValue(Math.min(1, volume.value + 0.1))
      break
    case 'ArrowDown':
      e.preventDefault()
      setVolumeValue(Math.max(0, volume.value - 0.1))
      break
  }
}

document.addEventListener('keydown', handleKeydown)

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div 
    class="music-player-container relative w-full overflow-hidden"
    :class="currentSong ? 'h-screen' : 'min-h-screen'"
  >
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>

    <!-- Main Content Container -->
    <div 
      class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12"
      :class="currentSong ? 'h-full flex flex-col' : ''"
    >
      <!-- Header -->
      <header class="mb-8 md:mb-10 animate-slide-in">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 uppercase">
          Cover Songs
        </h1>
        <div class="flex items-center gap-3 md:gap-4 mt-2 ml-1 md:ml-2">
          <div class="h-1 w-12 md:w-20 bg-rose-500"></div>
          <p class="text-sm md:text-lg font-bold tracking-[0.15em] md:tracking-[0.2em] text-white/80 uppercase">翻唱切片</p>
        </div>
      </header>

      <!-- Dynamic Layout: Split when playing, centered when not -->
      <div :class="[
        'transition-all duration-500 ease-out',
        currentSong ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 flex-1 min-h-0' : 'flex flex-col items-center'
      ]">
        
        <!-- Left Side: Player (only when song is selected) -->
        <div v-if="currentSong" class="lg:sticky lg:top-8 lg:self-start animate-fade-in">
          <!-- Cover Art -->
          <div class="relative mb-6 flex justify-center">
            <CoverArt
              :cover-url="getAssetUrl(currentSong?.cover)"
              :title="currentSong?.title"
              :is-playing="isPlaying"
              @toggle="togglePlay"
            />
          </div>

          <!-- Now Playing Info -->
          <div class="text-center mb-6">
            <h2 class="text-xl md:text-2xl font-bold text-white mb-1">{{ currentSong.title }}</h2>
            <p class="text-white/60">{{ currentSong.artist }}</p>
            <p v-if="currentSong.subtitle" class="text-white/40 text-sm mt-1">原唱：{{ currentSong.subtitle }}</p>
          </div>

          <!-- Player Controls -->
          <div class="mb-6">
            <!-- Progress Bar -->
            <div class="mb-6">
              <ProgressBar
                :current-time="currentTime"
                :duration="duration"
                @seek="seek"
              />
            </div>

            <!-- Control Buttons -->
            <div class="flex justify-center">
              <PlayerControls
                :is-playing="isPlaying"
                @prev="playPrev"
                @next="playNext"
                @toggle="togglePlay"
              />
            </div>

            <!-- Volume & Playback Mode Row -->
            <div class="mt-6 flex items-center justify-between">
              <VolumeControl
                :volume="volume"
                @change="setVolume"
                @mute="handleMute"
              />
              <PlaybackModeControl
                :mode="playbackMode"
                @change="(m) => playbackMode = m"
              />
            </div>
          </div>
        </div>

        <!-- Right Side: Song List -->
        <div 
          :class="[
            currentSong ? 'w-full flex flex-col min-h-0' : 'w-full max-w-2xl'
          ]"
        >
          <!-- Search Bar -->
          <div class="mb-6 flex items-center gap-4">
            <div class="flex-1 relative">
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="搜索歌曲，所有字段均可筛选"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-colors"
              />
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <span class="text-white/40 text-sm whitespace-nowrap">共 {{ filteredSongs.length }} 个结果</span>
          </div>

          <!-- Song List -->
          <div 
            :class="[
              'space-y-3',
              currentSong ? 'flex-1 overflow-y-auto pr-2 song-list-scroll' : ''
            ]"
          >
            <SongItem
              v-for="song in filteredSongs"
              :key="song.id"
              :song="song"
              :is-active="currentSong?.id === song.id"
              :is-playing="isPlaying"
              :cover-url="getAssetUrl(song.cover)"
              @click="playSong(song)"
            />
          </div>

          <!-- Empty State -->
          <div v-if="filteredSongs.length === 0" class="text-center py-12">
            <p class="text-white/40">没有找到匹配的歌曲</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animations defined globally in main.css */
.song-item {
  /* hardware acceleration for smoother transitions */
  transform: translateZ(0);
}

/* Custom scrollbar for song list */
.song-list-scroll {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.song-list-scroll:hover {
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.song-list-scroll::-webkit-scrollbar {
  width: 6px;
}

.song-list-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.song-list-scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s;
}

.song-list-scroll:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

.song-list-scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
