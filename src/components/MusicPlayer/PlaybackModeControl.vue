<script setup>
import { ref } from 'vue'

// 播放模式：'sequence' | 'repeat-one' | 'shuffle'
const props = defineProps({
  mode: {
    type: String,
    default: 'sequence'
  }
})

const emit = defineEmits(['change'])

const modes = ['sequence', 'repeat-one', 'shuffle']
const modeLabels = {
  'sequence': '顺序播放',
  'repeat-one': '单曲循环',
  'shuffle': '随机播放'
}

const cycleMode = () => {
  const currentIndex = modes.indexOf(props.mode)
  const nextIndex = (currentIndex + 1) % modes.length
  emit('change', modes[nextIndex])
}
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Repeat/Shuffle Button -->
    <button
      @click="cycleMode"
      class="text-white/40 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
      :title="modeLabels[mode]"
    >
      <!-- Sequence Icon -->
      <svg v-if="mode === 'sequence'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
      </svg>
      
      <!-- Repeat One Icon -->
      <svg v-else-if="mode === 'repeat-one'" class="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>
      </svg>
      
      <!-- Shuffle Icon -->
      <svg v-else class="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
      </svg>
    </button>
  </div>
</template>
