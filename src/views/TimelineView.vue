<script setup>
const timelineEvents = [
  {
    year: '2024',
    title: '2024 生日会',
    date: '10月21日',
    desc: '魔法少女星瞳登场！',
    accent: 'rose'
  },
  {
    year: '2024',
    title: 'BML 2024',
    date: '7月',
    desc: '线下演出，全场沸腾。',
    accent: 'violet'
  },
  {
    year: '2023',
    title: '原创曲《星之火》',
    date: '12月',
    desc: '点燃内心的火焰。',
    accent: 'amber'
  },
  {
    year: '2021',
    title: 'B站出道',
    date: '6月11日',
    desc: '梦想开始的地方。',
    accent: 'cyan'
  }
]
</script>

<template>
  <div class="timeline-container w-full max-w-2xl mx-auto py-10 px-4">
    <header class="header text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
      <h1 class="title justify-center">
        <span class="title-star">✦</span>
        大事记
        <span class="title-star">✦</span>
      </h1>
      <p class="subtitle">HISTORY & MEMORIES</p>
    </header>

    <div class="relative border-l border-white/10 ml-4 md:ml-10 pl-8 md:pl-10 space-y-10">
      <div 
        v-for="(item, index) in timelineEvents" 
        :key="index"
        class="timeline-item relative animate-[slideLeft_0.5s_ease-out_backwards]"
        :style="{ animationDelay: `${index * 0.15}s` }"
      >
        <!-- Dot -->
        <div 
          class="absolute -left-[calc(2rem_+_5px)] md:-left-[calc(2.5rem_+_5px)] top-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          :class="`bg-${item.accent}-400 shadow-${item.accent}-400/50`"
        ></div>

        <!-- Card -->
        <div class="timeline-card group p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
            <h3 class="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">{{ item.title }}</h3>
            <span class="text-xs font-mono text-white/50 tracking-wider bg-white/5 px-2 py-0.5 rounded">{{ item.year }} · {{ item.date }}</span>
          </div>
          <p class="text-sm text-white/70 leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
