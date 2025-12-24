<script setup>
import ZenCountdownRow from './ZenCountdownRow.vue'

defineProps({
  events: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="countdown-section">
    <ZenCountdownRow
      v-for="(event, index) in events"
      :key="event.id"
      :event="event"
      :delay="200 + index * 100"
    />
  </section>
</template>

<style scoped>
.countdown-section {
  @apply w-full max-w-md;
  animation: fadeIn 0.5s ease-out 0.2s backwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
