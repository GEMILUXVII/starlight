<script setup>
import { onMounted, onUnmounted } from 'vue'

const ARTALK_SERVER = import.meta.env.VITE_ARTALK_SERVER || ''
const SITE_NAME = 'Starlight'

let artalk = null

onMounted(() => {
  // Load Artalk CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/artalk/dist/Artalk.css'
  document.head.appendChild(link)

  // Load Artalk JS
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/artalk/dist/Artalk.js'
  script.onload = () => {
    artalk = Artalk.init({
      el: '#artalk-comments',
      server: ARTALK_SERVER,
      site: SITE_NAME,
      pageKey: '/guestbook',
      pageTitle: '留言板',
      darkMode: true
    })
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  if (artalk) {
    artalk.destroy()
  }
})
</script>

<template>
  <div class="guestbook-container relative w-full min-h-screen overflow-hidden">
    <!-- Diagonal Overlay -->
    <div class="diagonal-bg absolute inset-0 bg-black/60 backdrop-blur-xl"></div>

    <div class="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col">
      <!-- Header -->
      <header class="mb-12 animate-slide-in">
        <h1 class="text-7xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 uppercase">
          Guestbook
        </h1>
        <div class="flex items-center gap-4 mt-2 ml-2">
          <div class="h-1 w-20 bg-rose-500"></div>
          <p class="text-lg font-bold tracking-[0.2em] text-white/80 uppercase">留言板</p>
        </div>
      </header>

      <!-- Artalk Comments Container -->
      <div class="flex-grow animate-slide-up" style="animation-delay: 0.1s">
        <div id="artalk-comments" class="artalk-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<style>
/* Artalk Dark Theme Overrides */
.artalk {
  --at-color-main: #f472b6 !important;
  --at-color-bg: transparent !important;
  --at-color-font: rgba(255, 255, 255, 0.9) !important;
  --at-color-grey: rgba(255, 255, 255, 0.5) !important;
  --at-color-border: rgba(255, 255, 255, 0.1) !important;
  --at-color-bg-grey: rgba(255, 255, 255, 0.05) !important;
  --at-color-bg-grey-transl: rgba(255, 255, 255, 0.03) !important;
}

.artalk .atk-editor {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
}

.artalk .atk-comment {
  background: rgba(255, 255, 255, 0.03) !important;
  border-radius: 12px !important;
  padding: 16px !important;
  margin-bottom: 12px !important;
}

.artalk .atk-btn {
  background: linear-gradient(135deg, #f472b6, #a78bfa) !important;
  border: none !important;
  border-radius: 8px !important;
}

.artalk .atk-btn:hover {
  filter: brightness(1.1) !important;
}

/* Dropdown menu styling */
.artalk .atk-dropdown {
  background: rgba(20, 20, 30, 0.95) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
}

.artalk .atk-dropdown-item {
  color: rgba(255, 255, 255, 0.8) !important;
}

.artalk .atk-dropdown-item:hover {
  background: rgba(244, 114, 182, 0.2) !important;
  color: #f472b6 !important;
}
</style>
