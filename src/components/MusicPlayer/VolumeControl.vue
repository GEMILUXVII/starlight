<script setup>
defineProps({
  volume: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change'])

const handleChange = (event) => {
  emit('change', event)
}
</script>

<template>
  <div class="flex items-center justify-center lg:justify-start gap-3 group/volume">
    <svg class="w-4 h-4 text-white/30 group-hover/volume:text-white/60 transition-colors" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
    </svg>
    <div 
      class="w-24 h-6 flex items-center cursor-pointer"
      @click="handleChange"
    >
      <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          class="h-full bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          :style="{ width: `${volume * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>
