<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 腾讯云 COS 存储桶配置
const COS_BASE_URL = import.meta.env.VITE_COS_BASE_URL || ''

// 获取完整的资源 URL
const getAssetUrl = (path) => {
  if (!path) return '/bg.webp' // 默认封面
  if (path.startsWith('http')) return path // 已经是完整 URL
  return COS_BASE_URL ? `${COS_BASE_URL}${path}` : path
}

// 音乐数据 - 路径相对于 COS 存储桶根目录
const songs = ref([
  {
    id: 1,
    title: '红山果',
    subtitle: '安与骑兵',
    artist: '安与骑兵',
    date: '2025-01-25',
    cover: '/covers/红山果.jpg',
    audio: '/audio/红山果.mp3',
    tags: ['翻唱']
  },
  {
    id: 2,
    title: '我所有的夜有所梦里',
    subtitle: '就是怦然心动',
    artist: 'ZaZaZsu咂咂苏',
    date: '2025-02-14',
    cover: '/covers/我所有的夜有所梦里.jpg',
    audio: '/audio/我所有的夜有所梦里.mp3',
    tags: ['翻唱']
  },
])


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

// 播放器状态
const currentSong = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.8)
const audioRef = ref(null)

// 播放控制
const playSong = (song) => {
  if (currentSong.value?.id === song.id) {
    togglePlay()
    return
  }
  currentSong.value = song
  isPlaying.value = true
  if (audioRef.value) {
    audioRef.value.src = getAssetUrl(song.audio)
    audioRef.value.play()
  }
}

const togglePlay = () => {
  if (!audioRef.value || !currentSong.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const seek = (e) => {
  if (!audioRef.value || !duration.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audioRef.value.currentTime = percent * duration.value
}

const setVolume = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  volume.value = Math.max(0, Math.min(1, percent))
  if (audioRef.value) audioRef.value.volume = volume.value
}

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

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

// 音频事件处理
const onTimeUpdate = () => {
  if (audioRef.value) currentTime.value = audioRef.value.currentTime
}

const onLoadedMetadata = () => {
  if (audioRef.value) duration.value = audioRef.value.duration
}

const onEnded = () => {
  playNext()
}

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
})
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
          
          <button 
            @click="togglePlay"
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
        <div 
          v-for="song in filteredSongs" 
          :key="song.id"
          @click="playSong(song)"
          class="song-item group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-[0.99]"
          :class="{ 'bg-white/10 !border-white/10 shadow-lg shadow-black/20': currentSong?.id === song.id }"
        >
          <!-- Cover -->
          <div class="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-xl transition-shadow">
            <img :src="getAssetUrl(song.cover)" :alt="song.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            
            <!-- Playing Overlay -->
            <div 
              v-if="currentSong?.id === song.id && isPlaying"
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
                :class="currentSong?.id === song.id ? 'text-char-blue' : 'text-white group-hover:text-white/90'"
              >
                {{ song.title }}
              </h3>
              <div v-if="song.tags.length" class="flex gap-1.5">
                 <span 
                  v-for="tag in song.tags.slice(0, 2)" 
                  :key="tag"
                  class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border"
                  :class="currentSong?.id === song.id ? 'border-char-blue/30 text-char-blue bg-char-blue/10' : 'border-white/10 text-white/40 group-hover:border-white/20'"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <p class="text-sm truncate transition-colors" :class="currentSong?.id === song.id ? 'text-white/70' : 'text-white/40 group-hover:text-white/60'">
              {{ song.artist }}
              <span v-if="song.subtitle" class="opacity-60"> · {{ song.subtitle }}</span>
            </p>
          </div>

          <!-- Date/Status -->
          <div class="hidden sm:flex flex-col items-end gap-1">
             <span class="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">{{ song.date }}</span>
          </div>

          <!-- Action Button -->
          <button class="w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
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

.animate-pulse-slow {
  animation: pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

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
