import { ref, watch } from 'vue'

// localStorage keys
const STORAGE_KEY_VOLUME = 'xingtong_player_volume'

/**
 * 音乐播放器 Composable
 * 管理播放状态、音量、进度和播放控制
 */
export function useAudioPlayer(getAssetUrl) {
  // 从 localStorage 读取保存的音量，默认 0.8
  const savedVolume = parseFloat(localStorage.getItem(STORAGE_KEY_VOLUME) || '0.8')

  // 播放器状态
  const currentSong = ref(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(savedVolume)
  const audioRef = ref(null)

  // 播放控制
  const playSong = async (song, songsList, forceRestart = false) => {
    if (currentSong.value?.id === song.id && !forceRestart) {
      togglePlay()
      return
    }
    currentSong.value = song
    if (audioRef.value) {
      // 如果是同一首歌，只需要重置时间
      if (audioRef.value.src === getAssetUrl(song.audio) && forceRestart) {
        audioRef.value.currentTime = 0
      } else {
        audioRef.value.src = getAssetUrl(song.audio)
      }
      try {
        await audioRef.value.play()
        isPlaying.value = true
      } catch (err) {
        // 浏览器阻止自动播放，需要用户交互
        console.warn('自动播放被阻止，需要用户点击播放:', err.message)
        isPlaying.value = false
      }
    }
  }

  const togglePlay = async () => {
    if (!audioRef.value || !currentSong.value) return
    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      try {
        await audioRef.value.play()
        isPlaying.value = true
      } catch (err) {
        console.warn('播放失败:', err.message)
        isPlaying.value = false
      }
    }
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
    // 保存到 localStorage
    localStorage.setItem(STORAGE_KEY_VOLUME, volume.value.toString())
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const playNext = (songsList) => {
    if (!currentSong.value || !songsList.length) return
    const currentIndex = songsList.findIndex(s => s.id === currentSong.value.id)
    const nextIndex = (currentIndex + 1) % songsList.length
    // 如果只有一首歌，强制重新播放
    const forceRestart = songsList.length === 1
    playSong(songsList[nextIndex], songsList, forceRestart)
  }

  const playPrev = (songsList) => {
    if (!currentSong.value || !songsList.length) return
    const currentIndex = songsList.findIndex(s => s.id === currentSong.value.id)
    const prevIndex = currentIndex === 0 ? songsList.length - 1 : currentIndex - 1
    // 如果只有一首歌，强制重新播放
    const forceRestart = songsList.length === 1
    playSong(songsList[prevIndex], songsList, forceRestart)
  }

  // 音频事件处理
  const onTimeUpdate = () => {
    if (audioRef.value) currentTime.value = audioRef.value.currentTime
  }

  const onLoadedMetadata = () => {
    if (audioRef.value) duration.value = audioRef.value.duration
  }

  const onEnded = (songsList) => {
    playNext(songsList)
  }

  const initAudio = () => {
    if (audioRef.value) {
      audioRef.value.volume = volume.value
    }
  }

  return {
    // State
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    audioRef,

    // Controls
    playSong,
    togglePlay,
    seek,
    setVolume,
    playNext,
    playPrev,

    // Utilities
    formatTime,

    // Event handlers
    onTimeUpdate,
    onLoadedMetadata,
    onEnded,
    initAudio
  }
}
