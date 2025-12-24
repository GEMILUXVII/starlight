<script setup>
import { ref, computed, onMounted } from 'vue'
import CoverArt from '../components/MusicPlayer/CoverArt.vue'
import ProgressBar from '../components/MusicPlayer/ProgressBar.vue'
import PlayerControls from '../components/MusicPlayer/PlayerControls.vue'
import VolumeControl from '../components/MusicPlayer/VolumeControl.vue'
import SongItem from '../components/MusicPlayer/SongItem.vue'
import { songs as songsData } from '../data/songs.js'
import { useAudioPlayer } from '../composables/useAudioPlayer.js'

// 云存储配置（支持腾讯COS、Cloudflare R2等）
const STORAGE_BASE_URL = import.meta.env.VITE_STORAGE_BASE_URL || ''

// 获取完整的资源 URL
const getAssetUrl = (path) => {
  if (!path) return '/bg.webp'
  if (path.startsWith('http')) return path
  return STORAGE_BASE_URL ? `${STORAGE_BASE_URL}${path}` : path
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

    <!-- Main Content Container -->
    <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
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
        currentSong ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12' : 'flex flex-col items-center'
      ]">
        
        <!-- Left Side: Player (only when song is selected) -->
        <div v-if="currentSong" class="lg:sticky lg:top-8 lg:self-start animate-fade-in">
          <!-- Cover Art -->
          <div class="relative mb-6 flex justify-center lg:justify-start">
            <CoverArt
              :cover-url="getAssetUrl(currentSong?.cover)"
              :title="currentSong?.title"
              :is-playing="isPlaying"
              @toggle="togglePlay"
            />
          </div>

          <!-- Now Playing Info -->
          <div class="text-center lg:text-left mb-6">
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
            <PlayerControls
              :is-playing="isPlaying"
              @prev="playPrev"
              @next="playNext"
              @toggle="togglePlay"
            />

            <!-- Volume Control -->
            <div class="mt-6">
              <VolumeControl
                :volume="volume"
                @change="setVolume"
              />
            </div>
          </div>
        </div>

        <!-- Right Side: Song List -->
        <div :class="currentSong ? 'w-full' : 'w-full max-w-2xl'">
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
