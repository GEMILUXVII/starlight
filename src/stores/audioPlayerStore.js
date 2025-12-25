import { reactive, ref, watch } from 'vue'
import { songs as songsData } from '../data/songs.js'

// localStorage keys
const STORAGE_KEY_VOLUME = 'xingtong_player_volume'
const STORAGE_KEY_PLAYBACK_MODE = 'xingtong_player_mode'

// 云存储配置
const STORAGE_BASE_URL = import.meta.env.VITE_STORAGE_BASE_URL || ''

// 获取完整的资源 URL
const getAssetUrl = (path) => {
  if (!path) return '/bg.webp'
  if (path.startsWith('http')) return path
  return STORAGE_BASE_URL ? `${STORAGE_BASE_URL}${path}` : path
}

// 从 localStorage 读取保存的设置
const savedVolume = parseFloat(localStorage.getItem(STORAGE_KEY_VOLUME) || '0.8')
const savedMode = localStorage.getItem(STORAGE_KEY_PLAYBACK_MODE) || 'sequence'

/**
 * 生成稳定的短码（基于标题的 hash）
 * 同一标题永远生成相同的短码
 */
function generateShortCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  // 转换为 base36 并取 4-5 位
  return Math.abs(hash).toString(36).slice(0, 5)
}

/**
 * 全局音频播放器状态
 * 使用 reactive 对象保持状态在路由切换时不丢失
 */
export const audioPlayerStore = reactive({
  // 歌曲数据（按日期降序排列，新的在前）
  // id: 标题（用于内部匹配）
  // code: 短码（用于分享链接）
  songs: [...songsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(song => ({
      ...song,
      id: song.title,
      code: generateShortCode(song.title)
    })),

  // 播放状态
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: savedVolume,

  // 播放模式
  playbackMode: savedMode,

  // 音频元素引用（由 App.vue 设置）
  audioRef: null,

  // 搜索
  searchQuery: '',

  // 计算属性：过滤后的歌曲列表
  get filteredSongs() {
    if (!this.searchQuery.trim()) return this.songs
    const query = this.searchQuery.toLowerCase()
    return this.songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.subtitle.toLowerCase().includes(query) ||
      song.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
})

// 监听播放模式变化并保存
watch(() => audioPlayerStore.playbackMode, (newMode) => {
  localStorage.setItem(STORAGE_KEY_PLAYBACK_MODE, newMode)
})

/**
 * 播放控制方法
 */
export async function playSong(song, forceRestart = false) {
  const store = audioPlayerStore

  if (store.currentSong?.id === song.id && !forceRestart) {
    togglePlay()
    return
  }

  store.currentSong = song

  if (store.audioRef) {
    if (store.audioRef.src === getAssetUrl(song.audio) && forceRestart) {
      store.audioRef.currentTime = 0
    } else {
      store.audioRef.src = getAssetUrl(song.audio)
    }
    try {
      await store.audioRef.play()
      store.isPlaying = true
    } catch (err) {
      console.warn('自动播放被阻止:', err.message)
      store.isPlaying = false
    }
  }
}

export async function togglePlay() {
  const store = audioPlayerStore
  if (!store.audioRef || !store.currentSong) return

  if (store.isPlaying) {
    store.audioRef.pause()
    store.isPlaying = false
  } else {
    try {
      await store.audioRef.play()
      store.isPlaying = true
    } catch (err) {
      console.warn('播放失败:', err.message)
      store.isPlaying = false
    }
  }
}

export function playNext() {
  const store = audioPlayerStore
  if (!store.currentSong) return

  const songs = store.filteredSongs
  const forceRestart = songs.length === 1

  // 随机模式：播放随机歌曲
  if (store.playbackMode === 'shuffle') {
    const otherSongs = songs.filter(s => s.id !== store.currentSong.id)
    if (otherSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherSongs.length)
      playSong(otherSongs[randomIndex], forceRestart)
    } else {
      playSong(songs[0], true)
    }
    return
  }

  // 顺序模式：播放下一首
  const currentIndex = songs.findIndex(s => s.id === store.currentSong.id)
  const nextIndex = (currentIndex + 1) % songs.length
  playSong(songs[nextIndex], forceRestart)
}

export function playPrev() {
  const store = audioPlayerStore
  if (!store.currentSong) return

  const songs = store.filteredSongs
  const forceRestart = songs.length === 1

  // 随机模式：播放随机歌曲
  if (store.playbackMode === 'shuffle') {
    const otherSongs = songs.filter(s => s.id !== store.currentSong.id)
    if (otherSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherSongs.length)
      playSong(otherSongs[randomIndex], forceRestart)
    } else {
      playSong(songs[0], true)
    }
    return
  }

  // 顺序模式：播放上一首
  const currentIndex = songs.findIndex(s => s.id === store.currentSong.id)
  const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1
  playSong(songs[prevIndex], forceRestart)
}

export function seek(e) {
  const store = audioPlayerStore
  if (!store.audioRef || !store.duration) return

  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  store.audioRef.currentTime = percent * store.duration
}

export function setVolume(e) {
  const store = audioPlayerStore
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  store.volume = Math.max(0, Math.min(1, percent))

  if (store.audioRef) {
    store.audioRef.volume = store.volume
  }

  localStorage.setItem(STORAGE_KEY_VOLUME, store.volume.toString())
}

export function setVolumeValue(value) {
  const store = audioPlayerStore
  store.volume = Math.max(0, Math.min(1, value))

  if (store.audioRef) {
    store.audioRef.volume = store.volume
  }

  localStorage.setItem(STORAGE_KEY_VOLUME, store.volume.toString())
}

export function handleEnded() {
  const store = audioPlayerStore

  if (store.playbackMode === 'repeat-one') {
    if (store.audioRef) {
      store.audioRef.currentTime = 0
      store.audioRef.play()
    }
  } else if (store.playbackMode === 'shuffle') {
    const otherSongs = store.filteredSongs.filter(s => s.id !== store.currentSong?.id)
    if (otherSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherSongs.length)
      playSong(otherSongs[randomIndex])
    } else {
      playNext()
    }
  } else {
    playNext()
  }
}

export function stopPlayback() {
  const store = audioPlayerStore
  if (store.audioRef) {
    store.audioRef.pause()
    store.audioRef.currentTime = 0
  }
  store.isPlaying = false
  store.currentSong = null
  store.currentTime = 0
  store.duration = 0
}

export function initAudio(audioElement) {
  const store = audioPlayerStore
  store.audioRef = audioElement
  if (audioElement) {
    audioElement.volume = store.volume
  }
}

export function getAssetUrlFromStore(path) {
  return getAssetUrl(path)
}

export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
