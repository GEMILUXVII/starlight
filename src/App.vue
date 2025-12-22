<script setup>
import { onMounted, computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue'

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

  // Preload bg2.png for smooth transition
  const preloadImg = new Image()
  preloadImg.src = '/bg2.png'
})

const route = useRoute()
const isTimeline = computed(() => route.name === 'timeline')
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <Analytics />
  
  <!-- Dual Background Layers for Elegant Cross-fade -->
  <div 
    class="bg-layer fixed inset-0 -z-30 bg-cover bg-top bg-no-repeat transition-opacity duration-700 ease-in-out will-change-[opacity]"
    style="background-image: url('/bg.png')"
    :class="isTimeline ? 'opacity-0' : 'opacity-100'"
  ></div>
  
  <div 
    class="bg-layer fixed inset-0 -z-30 bg-cover bg-top bg-no-repeat transition-opacity duration-700 ease-in-out will-change-[opacity]"
    style="background-image: url('/bg2.png')"
    :class="isTimeline ? 'opacity-100' : 'opacity-0'"
  ></div>
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
      <div class="w-px h-4 bg-white/20 my-auto"></div>
      <RouterLink 
        to="/music" 
        class="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest"
        active-class="!text-rose-400 font-bold glow"
      >
        Videos
      </RouterLink>
      <div class="w-px h-4 bg-white/20 my-auto"></div>
      <RouterLink 
        to="/about" 
        class="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest"
        active-class="!text-rose-400 font-bold glow"
      >
        About
      </RouterLink>
    </div>
  </nav>

  <main 
    class="main-container flex flex-col p-8 pt-24"
    :class="isHome ? 'h-screen overflow-hidden' : 'min-h-screen'"
  >
    <!-- Router View -->
    <RouterView />
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
