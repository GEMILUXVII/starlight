<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  volume: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change', 'mute'])

// 静音状态和静音前的音量
const isMuted = ref(false)
const volumeBeforeMute = ref(props.volume)

const handleChange = (event) => {
  emit('change', event)
  // 调节音量后取消静音状态
  if (isMuted.value) {
    isMuted.value = false
  }
}

const toggleMute = () => {
  if (isMuted.value) {
    // 取消静音，恢复之前的音量
    isMuted.value = false
    emit('mute', volumeBeforeMute.value)
  } else {
    // 静音，保存当前音量
    volumeBeforeMute.value = props.volume
    isMuted.value = true
    emit('mute', 0)
  }
}

// 外部音量变化时更新静音状态
watch(() => props.volume, (newVolume) => {
  if (newVolume > 0 && isMuted.value) {
    isMuted.value = false
  }
})
</script>

<template>
  <div class="flex items-center gap-3 group/volume">
    <!-- Speaker Icon (clickable for mute) -->
    <button 
      @click="toggleMute"
      class="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
      :title="isMuted ? '取消静音' : '静音'"
    >
      <!-- Muted -->
      <svg v-if="isMuted || volume === 0" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
      <!-- Low Volume -->
      <svg v-else-if="volume < 0.3" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </svg>
      <!-- Medium Volume -->
      <svg v-else-if="volume < 0.7" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
      </svg>
      <!-- High Volume -->
      <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
    </button>
    
    <!-- Volume Slider -->
    <div 
      class="w-24 h-6 flex items-center cursor-pointer"
      @click="handleChange"
    >
      <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          class="h-full bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all"
          :style="{ width: isMuted ? '0%' : `${volume * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

