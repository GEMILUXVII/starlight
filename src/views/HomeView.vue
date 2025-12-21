<script setup>
import CountdownCard from '../components/CountdownCard.vue'

const events = [
  {
    id: 'birthday',
    title: '生日',
    month: 10,
    day: 21,
    accent: 'rose',
    description: '星瞳生日'
  },
  {
    id: 'debut',
    title: '出道纪念',
    month: 6,
    day: 11,
    year: 2021,
    accent: 'violet',
    description: 'B站直播出道'
  },
  {
    id: 'valentine',
    title: '情人节',
    month: 2,
    day: 14,
    accent: 'cyan',
    description: '情人节'
  },
  {
    id: 'anniversary',
    title: '5周年',
    month: 6,
    day: 11,
    year: 2021,
    showYears: true,
    accent: 'amber',
    description: '出道周年'
  }
]
</script>

<template>
  <div class="home-container flex flex-col items-center">
    <header class="header mb-8 mt-4 md:mt-0">
      <h1 class="title">
        <span class="title-star">✦</span>
        星瞳
        <span class="title-star">✦</span>
      </h1>
      <p class="subtitle text-center">XINGTONG COUNTDOWN</p>
    </header>
    
    <section class="countdown-grid grid w-full items-center my-auto gap-y-4 gap-x-5">
      <CountdownCard 
        v-for="(event, index) in events" 
        :key="event.id"
        :event="event"
        :style="{ gridColumn: index < 2 ? '1' : '3' }"
      />
    </section>
  </div>
</template>

<style scoped>
/* Grid Layout Specifics not easily handled by Tailwind alone due to the 50vw requirement */
.countdown-grid {
  grid-template-columns: auto minmax(50vw, 1fr) auto;
  grid-template-rows: auto auto;
}

@media (max-width: 900px) {
  .countdown-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
