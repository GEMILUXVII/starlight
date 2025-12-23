<script setup>
import { ref, computed, onMounted } from 'vue'
import PlayButton from '../components/MusicPlayer/PlayButton.vue'
import SongItem from '../components/MusicPlayer/SongItem.vue'
import { songs as songsData } from '../data/songs.js'
import { useAudioPlayer } from '../composables/useAudioPlayer.js'

// 腾讯云 COS 存储桶配置
const COS_BASE_URL = import.meta.env.VITE_COS_BASE_URL || ''

// 获取完整的资源 URL
const getAssetUrl = (path) => {
  if (!path) return '/bg.webp'
  if (path.startsWith('http')) return path
  return COS_BASE_URL ? `${COS_BASE_URL}${path}` : path
}

// 音乐数据
const songs = ref(songsData)

// 搜索
const searchQuery = ref('')
const filteredSongs = computed(() => {
  if (!searchQuery.value.trim()) return songs.value
  const query = searchQuery.value.toLowerCase()
  return songs.value.filter(song => 
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query) ||
    song.subtitle.toLowerCase().includes(query) ||
    song.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

// 使用播放器 Composable
const {
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  audioRef,
  playSong: playerPlaySong,
  togglePlay,
  seek,
  setVolume,
  formatTime,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded: playerOnEnded,
  initAudio
} = useAudioPlayer(getAssetUrl)

// 封装播放函数
const playSong = (song) => playerPlaySong(song, filteredSongs.value)
const playNext = () => {
  if (!currentSong.value) return
  const currentIndex = filteredSongs.value.findIndex(s => s.id === currentSong.value.id)
  const nextIndex = (currentIndex + 1) % filteredSongs.value.length
  playSong(filteredSongs.value[nextIndex])
}
const playPrev = () => {
  if (!currentSong.value) return
  const currentIndex = filteredSongs.value.findIndex(s => s.id === currentSong.value.id)
  const prevIndex = currentIndex === 0 ? filteredSongs.value.length - 1 : currentIndex - 1
  playSong(filteredSongs.value[prevIndex])
}
const onEnded = () => playNext()

onMounted(() => initAudio())
</script>

<template>
  <div class="music-player-container relative w-full min-h-screen overflow-hidden">
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>

    <div class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <!-- Header -->
      <header class="mb-8 md:mb-12 animate-slide-in text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight text-white drop-shadow-lg">
          Cover Songs
        </h1>
        <p class="text-base md:text-lg text-white/60 mt-2 tracking-widest">
          翻唱切片 / 歌单图鉴 🎵
        </p>
      </header>

      <!-- Cover Art Section -->
      <div class="relative mb-8 flex justify-center">
        <div class="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/20 group">
          <img 
            :src="getAssetUrl(currentSong?.cover)" 
            :alt="currentSong?.title || 'Album Cover'"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Play overlay -->
          <div 
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            @click="togglePlay"
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
      </div>

      <!-- Now Playing Info -->
      <div v-if="currentSong" class="text-center mb-6 animate-fade-in">
        <h2 class="text-xl md:text-2xl font-bold text-white mb-1">{{ currentSong.title }}</h2>
        <p class="text-white/60">{{ currentSong.artist }}</p>
      </div>

      <!-- Player Controls -->
      <div v-if="currentSong" class="mb-8 px-4">
        <!-- Progress Bar -->
        <div class="group/progress flex items-center gap-4 mb-8">
          <span class="text-xs text-white/40 w-10 text-right font-mono tracking-wider">{{ formatTime(currentTime) }}</span>
          
          <div 
            class="flex-1 h-8 flex items-center cursor-pointer relative"
            @click="seek"
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

          <span class="text-xs text-white/40 w-10 font-mono tracking-wider">{{ formatTime(duration) }}</span>
        </div>

        <!-- Control Buttons -->
        <div class="flex items-center justify-center gap-8 md:gap-10">
          <button 
            @click="playPrev" 
            class="text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          
          <PlayButton :is-playing="isPlaying" @toggle="togglePlay" />

          <button 
            @click="playNext" 
            class="text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <!-- Volume Control -->
        <div class="flex items-center justify-center gap-3 mt-8 group/volume">
          <svg class="w-4 h-4 text-white/30 group-hover/volume:text-white/60 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <div 
            class="w-24 h-6 flex items-center cursor-pointer"
            @click="setVolume"
          >
            <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                :style="{ width: `${volume * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

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
      <div class="space-y-3">
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

    <!-- Hidden Audio Element -->
    <audio 
      ref="audioRef"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
  </div>
</template>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.song-item {
  /* hardware acceleration for smoother transitions */
  transform: translateZ(0);
}
</style>
