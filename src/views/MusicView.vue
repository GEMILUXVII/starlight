<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 音乐数据 - 本地文件存储在 /public/music/ 目录
const songs = ref([
  {
    id: 1,
    title: '血腥爱情故事',
    subtitle: '跟唱半首',
    artist: '张惠妹',
    date: '2025-01-31',
    cover: '/music/covers/default.jpg',
    audio: '/music/blood-love-story.mp3',
    tags: ['翻唱']
  },
  {
    id: 2,
    title: '星月神话',
    subtitle: '电视剧《神话》插曲',
    artist: '金莎',
    date: '2025-01-31',
    cover: '/music/covers/default.jpg',
    audio: '/music/star-moon-myth.mp3',
    tags: ['翻唱', '影视']
  },
  {
    id: 3,
    title: '向天再借五百年',
    subtitle: '电视剧《康熙王朝》主题曲',
    artist: '韩磊',
    date: '2025-01-31',
    cover: '/music/covers/default.jpg',
    audio: '/music/500-years.mp3',
    tags: ['翻唱', '影视']
  },
  {
    id: 4,
    title: '虚拟',
    subtitle: '',
    artist: '陈粒',
    date: '2025-01-31',
    cover: '/music/covers/default.jpg',
    audio: '/music/virtual.mp3',
    tags: ['翻唱']
  },
  {
    id: 5,
    title: 'See You Again Song',
    subtitle: 'US',
    artist: 'Wiz Khalifa',
    date: '2025-01-31',
    cover: '/music/covers/default.jpg',
    audio: '/music/see-you-again.mp3',
    tags: ['翻唱', '英文']
  },
  {
    id: 6,
    title: '不该',
    subtitle: '大喊大叫',
    artist: '周杰伦, 张惠妹',
    date: '2025-01-31',
    cover: '/music/covers/default.jpg',
    audio: '/music/bu-gai.mp3',
    tags: ['翻唱']
  }
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
    audioRef.value.src = song.audio
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
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
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
            :src="currentSong?.cover || '/bg.webp'" 
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
        <div class="flex items-center gap-3 mb-4">
          <span class="text-xs text-white/50 w-10 text-right font-mono">{{ formatTime(currentTime) }}</span>
          <div 
            class="flex-1 h-1 bg-white/10 rounded-full cursor-pointer group"
            @click="seek"
          >
            <div 
              class="h-full bg-gradient-to-r from-rose-500 to-violet-500 rounded-full relative transition-all"
              :style="{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }"
            >
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span class="text-xs text-white/50 w-10 font-mono">{{ formatTime(duration) }}</span>
        </div>

        <!-- Control Buttons -->
        <div class="flex items-center justify-center gap-6">
          <button @click="playPrev" class="text-white/60 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button 
            @click="togglePlay"
            class="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-violet-500 flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform"
          >
            <svg v-if="!isPlaying" class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button @click="playNext" class="text-white/60 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <!-- Volume Control -->
        <div class="flex items-center justify-center gap-2 mt-4">
          <svg class="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <div 
            class="w-20 h-1 bg-white/10 rounded-full cursor-pointer"
            @click="setVolume"
          >
            <div 
              class="h-full bg-white/40 rounded-full"
              :style="{ width: `${volume * 100}%` }"
            ></div>
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
      <div class="space-y-2">
        <div 
          v-for="song in filteredSongs" 
          :key="song.id"
          @click="playSong(song)"
          class="song-item flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5"
          :class="{ 'bg-white/10': currentSong?.id === song.id }"
        >
          <!-- Cover -->
          <div class="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img :src="song.cover" :alt="song.title" class="w-full h-full object-cover" />
            <div 
              v-if="currentSong?.id === song.id && isPlaying"
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div class="flex gap-0.5">
                <span class="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                <span class="w-1 h-4 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                <span class="w-1 h-2 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-white font-medium truncate">{{ song.title }}</h3>
              <span 
                v-for="tag in song.tags.slice(0, 2)" 
                :key="tag"
                class="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 whitespace-nowrap"
              >
                {{ tag }}
              </span>
            </div>
            <p class="text-white/50 text-sm truncate">{{ song.artist }}{{ song.subtitle ? ` · ${song.subtitle}` : '' }}</p>
          </div>

          <!-- Date -->
          <span class="text-white/30 text-sm hidden sm:block">{{ song.date }}</span>

          <!-- More Button -->
          <button class="text-white/30 hover:text-white/60 transition-colors p-1">
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

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.song-item {
  border: 1px solid transparent;
}

.song-item:hover {
  border-color: rgba(255, 255, 255, 0.05);
}
</style>
