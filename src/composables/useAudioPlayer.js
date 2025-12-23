import { ref, computed } from 'vue'

/**
 * 音乐播放器 Composable
 * 管理播放状态、音量、进度和播放控制
 */
export function useAudioPlayer(getAssetUrl) {
  // 播放器状态
  const currentSong = ref(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.8)
  const audioRef = ref(null)

  // 播放控制
  const playSong = (song, songsList) => {
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

  const playNext = (songsList) => {
    if (!currentSong.value || !songsList.length) return
    const currentIndex = songsList.findIndex(s => s.id === currentSong.value.id)
    const nextIndex = (currentIndex + 1) % songsList.length
    playSong(songsList[nextIndex], songsList)
  }

  const playPrev = (songsList) => {
    if (!currentSong.value || !songsList.length) return
    const currentIndex = songsList.findIndex(s => s.id === currentSong.value.id)
    const prevIndex = currentIndex === 0 ? songsList.length - 1 : currentIndex - 1
    playSong(songsList[prevIndex], songsList)
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
