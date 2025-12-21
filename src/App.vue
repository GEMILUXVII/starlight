<script setup>
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

// 交互式粒子系统
class ParticleSystem {
  constructor() {
    this.container = document.createElement('div')
    this.container.className = 'particles'
    document.body.insertBefore(this.container, document.body.firstChild)
    
    this.particles = []
    this.mouseX = 0
    this.mouseY = 0
    this.hasMouseMoved = false
    
    this.init()
    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)
    
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.hasMouseMoved = true
    })
  }

  init() {
    for (let i = 0; i < 40; i++) {
      this.createParticle()
    }
  }

  createParticle(isConfetti = false) {
    const particle = document.createElement('div')
    particle.className = isConfetti ? 'confetti' : 'particle'
    
    const size = isConfetti ? Math.random() * 6 + 4 : Math.random() * 4 + 1
    const x = Math.random() * window.innerWidth
    const y = isConfetti ? -10 : Math.random() * window.innerHeight
    
    particle.style.width = `${size}px`
    particle.style.height = isConfetti ? `${size * 1.5}px` : `${size}px`
    particle.style.left = '0px'
    particle.style.top = '0px'
    
    if (isConfetti) {
      const colors = ['#f472b6', '#a78bfa', '#22d3ee', '#fbbf24']
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      particle.style.borderRadius = '0'
      particle.style.transform = `rotate(${Math.random() * 360}deg)`
    } else {
      particle.style.background = Math.random() > 0.5 ? 'var(--rose)' : 'var(--violet)'
    }

    this.container.appendChild(particle)
    
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: isConfetti ? Math.random() * 2 + 2 : (Math.random() - 0.5) * 0.5 - 0.5,
      size: size,
      isConfetti: isConfetti,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    })
  }

  triggerConfetti() {
    for (let i = 0; i < 50; i++) {
      this.createParticle(true)
    }
  }

  animate() {
    this.particles.forEach((p, index) => {
      p.x += p.vx
      p.y += p.vy
      
      if (!p.isConfetti && this.hasMouseMoved) {
        const dx = p.x - this.mouseX
        const dy = p.y - this.mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRange = 200
        
        if (dist < repelRange) {
          const force = (repelRange - dist) / repelRange
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 0.5
          p.vy += Math.sin(angle) * force * 0.5
        }
      }

      p.vx *= 0.98
      p.vy = p.isConfetti ? p.vy : p.vy * 0.98 - 0.02

      if (p.isConfetti) {
        p.rotation += p.rotationSpeed
        if (p.y > window.innerHeight) {
          p.element.remove()
          this.particles.splice(index, 1)
        }
      } else {
        if (p.y < -10) p.y = window.innerHeight + 10
        if (p.x < -10) p.x = window.innerWidth + 10
        if (p.x > window.innerWidth + 10) p.x = -10
      }

      const transform = p.isConfetti 
        ? `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`
        : `translate(${p.x}px, ${p.y}px)`
      
      p.element.style.transform = transform
    })
    requestAnimationFrame(this.animate)
  }
}

onMounted(() => {
  if (!window.particleSystem) {
    window.particleSystem = new ParticleSystem()
  }
})
</script>

<template>
  <div class="bg-layer"></div>
  <div class="glass-overlay"></div>
  
  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
    <div class="glass-nav pointer-events-auto flex gap-6 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
      <RouterLink 
        to="/" 
        class="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest"
        active-class="!text-rose-400 font-bold glow"
      >
        Countdown
      </RouterLink>
      <div class="w-px h-4 bg-white/20 my-auto"></div>
      <RouterLink 
        to="/timeline" 
        class="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest"
        active-class="!text-rose-400 font-bold glow"
      >
        Timeline
      </RouterLink>
    </div>
  </nav>

  <main class="main-container min-h-screen flex flex-col p-8 pt-24">
    <!-- Router View -->
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    
    <footer class="footer mt-auto pt-8">
      <a href="https://space.bilibili.com/401315430" target="_blank" rel="noopener" class="bili-link">
        <svg class="bili-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
        </svg>
        <span>前往 B站 主页</span>
        <span class="bili-arrow">→</span>
      </a>
    </footer>
  </main>
</template>

<style>
/* Global Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Nav Link Glow */
.nav-link.glow {
  text-shadow: 0 0 10px rgba(244, 114, 182, 0.5);
}
</style>
