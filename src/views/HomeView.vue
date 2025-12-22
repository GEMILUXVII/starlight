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
  <div class="home-container w-full max-w-[1920px] mx-auto px-8 py-12 flex flex-col min-h-screen relative z-10">
    <!-- Header aligned to top-left -->
    <header class="header text-left mb-auto animate-fade-in-down">
      <h1 class="text-6xl font-thin tracking-tighter text-white mb-2 drop-shadow-lg">
        <span class="text-rose-400">✦</span>
        XINGTONG
        <span class="text-rose-400">✦</span>
      </h1>
      <p class="text-xs tracking-[0.5em] text-white/60 uppercase text-shadow pl-2">Fan Countdown Project</p>
    </header>
    
    <!-- Content area: Push to bottom-right -->
    <section class="w-full lg:w-[400px] ml-auto mt-auto flex flex-col gap-6 animate-fade-in-up">
      <CountdownCard 
        v-for="(event, index) in events" 
        :key="event.id"
        :event="event"
        :style="{ animationDelay: `${index * 0.1}s` }"
      />
    </section>

    <footer class="footer mt-12 text-right">
      <a 
        href="https://space.bilibili.com/401315430" 
        target="_blank" 
        rel="noopener" 
        class="inline-flex items-center gap-2 text-white/30 hover:text-white/80 transition-colors text-sm group"
      >
        <svg class="w-5 h-5 group-hover:text-[#FB7299] transition-colors" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12z"/>
        </svg>
        <span>前往 B站 主页</span>
        <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
      </a>
    </footer>
  </div>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out backwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out backwards;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
