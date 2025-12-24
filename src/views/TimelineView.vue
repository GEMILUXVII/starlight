<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { OverlayScrollbars } from 'overlayscrollbars'
import { rawEvents } from '../data/rawEvents.js'

// Current visible year (for fixed display)
const currentYear = ref('')
const yearSections = ref([])
let observer = null
let osInstance = null // 保存 OverlayScrollbars 实例引用

onMounted(() => {
  nextTick(() => {
    // Get all year section elements
    yearSections.value = document.querySelectorAll('[data-year]')
    
    // Create IntersectionObserver
    observer = new IntersectionObserver((entries) => {
      // Find the topmost visible section
      let topSection = null
      let topY = Infinity
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          if (rect.top < topY && rect.top < window.innerHeight * 0.5) {
            topY = rect.top
            topSection = entry.target
          }
        }
      })
      
      // Also check all sections to find which one is most visible at top
      yearSections.value.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom > 150) {
          currentYear.value = section.dataset.year
        }
      })
    }, {
      threshold: [0, 0.1, 0.5],
      rootMargin: '-100px 0px -50% 0px'
    })
    
    // Observe all year sections
    yearSections.value.forEach(section => {
      observer.observe(section)
    })
    
    // Set initial year
    if (yearSections.value.length > 0) {
      currentYear.value = yearSections.value[0].dataset.year
    }
    
    // Initialize OverlayScrollbars for Timeline page only
    // 保存实例引用以便后续正确销毁
    osInstance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: 'os-theme-star',
        autoHide: 'leave',
        autoHideDelay: 800
      }
    })
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  // 使用保存的实例引用正确销毁 OverlayScrollbars
  if (osInstance) {
    osInstance.destroy()
    osInstance = null
  }
})

// Accent color mapping for timeline dots
const accentColors = {
  rose: '#f472b6',
  violet: '#a78bfa',
  cyan: '#22d3ee',
  amber: '#fbbf24',
  blue: '#3b82f6',
  emerald: '#10b981',
  pink: '#ec4899',
  red: '#ef4444',
  orange: '#f97316',
  teal: '#14b8a6',
  purple: '#a855f7',
  sky: '#0ea5e9',
  yellow: '#eab308',
  green: '#22c55e',
  slate: '#64748b',
  gray: '#9ca3af'
}

const getAccentColor = (accent) => accentColors[accent] || '#ffffff'

const eventsByYear = computed(() => {
  const groups = {}
  rawEvents.forEach(event => {
    const year = event.date.split('-')[0]
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(event)
  })
  return Object.keys(groups).sort((a, b) => b - a).map(year => ({
    year,
    events: groups[year]
  }))
})
</script>

<template>
    <div class="relative max-w-5xl mx-auto px-4">
      <!-- Fixed Year Display - Hidden on mobile, shown on md+ -->
      <div class="hidden md:block fixed md:left-[calc(50%-32rem)] top-32 z-40 pointer-events-none">
        <span class="text-8xl font-black text-white/35 select-none tracking-tighter vertical-text drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
          {{ currentYear }}
        </span>
      </div>

      <!-- Minimalist Center Line -->
      <div class="absolute left-3 md:left-1/2 top-12 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2"></div>

      <div v-for="group in eventsByYear" :key="group.year" :data-year="group.year" class="relative group/year pb-20">
        
        <!-- Mobile Year Header -->
        <div class="md:hidden text-4xl font-black text-white/30 mb-8 pl-10 tracking-tighter">
          {{ group.year }}
        </div>

        <div class="space-y-16">
          <div 
            v-for="(item, index) in group.events" 
            :key="index"
            class="timeline-row flex flex-col md:flex-row items-baseline w-full group relative"
            :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
          >
            <!-- Content Side (45%) -->
            <div class="w-full pl-10 md:pl-0 md:w-[45%] md:px-12 relative z-20">
              <div 
                class="relative transition-all duration-500 group-hover:-translate-y-1"
                :style="{ animationDelay: `${index * 0.05}s` }"
                :class="index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'"
              >
                <!-- Date -->
                <div class="flex items-center gap-3 mb-2 transition-opacity duration-300">
                  <span 
                    class="text-xs font-black font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border backdrop-blur-md shadow-lg"
                    :style="{ 
                      backgroundColor: 'rgba(0,0,0,0.85)', 
                      borderColor: getAccentColor(item.accent),
                      color: getAccentColor(item.accent),
                      boxShadow: `0 0 10px ${getAccentColor(item.accent)}40`
                    }"
                  >
                    {{ item.displayDate }}
                  </span>
                  <div class="h-px w-12 bg-black/50 shadow-[0_0_2px_rgba(255,255,255,0.5)]"></div>
                </div>

                <!-- Title -->
                <h3 class="text-3xl font-bold text-white/90 mb-3 tracking-wide leading-tight group-hover:text-white transition-colors duration-300 text-shadow-sm">
                  {{ item.title }}
                </h3>

                <!-- Desc -->
                <p class="text-base text-white/70 font-normal leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {{ item.desc }}
                </p>
              </div>
            </div>

            <!-- Axis Dot -->
            <div class="absolute left-3 md:left-1/2 w-3 h-3 md:-translate-x-1/2 top-2 flex items-center justify-center">
              <div 
                class="w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:scale-[2] group-hover:shadow-[0_0_15px_currentColor]"
                :style="{ backgroundColor: getAccentColor(item.accent), color: getAccentColor(item.accent) }"
              ></div>
              <!-- Pulse ring -->
              <div 
                class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-hover:scale-[4] transition-all duration-700"
                :style="{ backgroundColor: getAccentColor(item.accent) }"
              ></div>
            </div>

            <!-- Empty Side -->
            <div class="hidden md:block md:w-[45%]"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Minimal Footer -->
    <footer class="mt-40 pt-12 border-t border-white/5 text-center text-xs text-white/20 uppercase tracking-[0.2em] font-light">
      <p class="hover:text-white/40 transition-colors cursor-default">
        Inspired by Starlight
      </p>
    </footer>
</template>

<style scoped>
/* Organic Fade In Animations */
.animate-fade-in-left {
  animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.text-shadow-sm {
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}
</style>
