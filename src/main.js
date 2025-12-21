import './style.css'

// 星瞳重要日期配置 - 无emoji，使用CSS图标
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
    title: '周年庆',
    month: 6,
    day: 11,
    year: 2021,
    showYears: true,
    accent: 'amber',
    description: '出道周年'
  }
]

// 格式化日期显示
function formatDate(month, day) {
  return `${month}月${day}日`
}

// 计算下一个目标日期
function getNextTargetDate(month, day) {
  const now = new Date()
  const currentYear = now.getFullYear()

  // 今年的目标日期
  let targetDate = new Date(currentYear, month - 1, day, 0, 0, 0, 0)

  // 如果今年的日期已经过了，使用明年的
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, month - 1, day, 0, 0, 0, 0)
  }

  return targetDate
}

// 计算时间差
function getTimeDiff(targetDate) {
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isToday: false }
}

// 创建倒计时卡片 HTML - 去除emoji，使用纯文字标签
function createCountdownCard(event) {
  const targetDate = getNextTargetDate(event.month, event.day)
  const targetYear = targetDate.getFullYear()

  let titleText = event.title
  if (event.showYears && event.year) {
    const yearsCount = targetYear - event.year
    titleText = `${yearsCount}周年`
  }

  return `
    <article class="countdown-card" data-accent="${event.accent}" data-event-id="${event.id}" data-month="${event.month}" data-day="${event.day}">
      <div class="card-glow"></div>
      <div class="card-content">
        <div class="card-header">
          <div class="card-badge">${event.id === 'birthday' ? '生' : event.id === 'debut' ? '出' : event.id === 'valentine' ? '情' : '年'}</div>
          <div class="card-info">
            <h2 class="card-title">${titleText}</h2>
            <span class="card-date">${formatDate(event.month, event.day)}</span>
          </div>
        </div>
        <div class="countdown-display">
          <div class="countdown-unit">
            <div class="countdown-value" data-unit="days">--</div>
            <div class="countdown-label">天</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-unit">
            <div class="countdown-value" data-unit="hours">--</div>
            <div class="countdown-label">时</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-unit">
            <div class="countdown-value" data-unit="minutes">--</div>
            <div class="countdown-label">分</div>
          </div>
        </div>
        <div class="countdown-status"></div>
      </div>
    </article>
  `
}

// 数字动画辅助函数
function animateCount(element, target) {
  const start = 0
  const duration = 1500
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // EaseOutQuart
    const ease = 1 - Math.pow(1 - progress, 4)

    const current = Math.floor(start + (target - start) * ease)
    element.textContent = String(current).padStart(2, '0')

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// 更新单个卡片的倒计时
function updateCardCountdown(card) {
  const month = parseInt(card.dataset.month)
  const day = parseInt(card.dataset.day)
  const targetDate = getNextTargetDate(month, day)
  const timeDiff = getTimeDiff(targetDate)

  const daysEl = card.querySelector('[data-unit="days"]')
  const hoursEl = card.querySelector('[data-unit="hours"]')
  const minutesEl = card.querySelector('[data-unit="minutes"]')
  const statusEl = card.querySelector('.countdown-status')

  if (timeDiff.isToday) {
    daysEl.textContent = '00'
    hoursEl.textContent = '00'
    minutesEl.textContent = '00'
    statusEl.textContent = '今天就是这一天'
    statusEl.classList.add('is-today')
    // 触发礼花 (防抖：简单的只在第一次检查到时触发，这里简化为每次更新都尝试，但粒子系统只是添加粒子，可以接受)
    //为了防止过度生成，我们加一个标记在 element 上
    if (!card.dataset.hasCelebrated && window.particleSystem) {
      window.particleSystem.triggerConfetti()
      card.dataset.hasCelebrated = 'true'
    }
  } else {
    // 首次加载动画
    if (!daysEl.hasAttribute('data-init')) {
      animateCount(daysEl, timeDiff.days)
      daysEl.setAttribute('data-init', 'true')
    } else if (daysEl.textContent !== String(timeDiff.days).padStart(2, '0')) {
      daysEl.textContent = String(timeDiff.days).padStart(2, '0')
    }

    if (!hoursEl.hasAttribute('data-init')) {
      animateCount(hoursEl, timeDiff.hours)
      hoursEl.setAttribute('data-init', 'true')
    } else if (hoursEl.textContent !== String(timeDiff.hours).padStart(2, '0')) {
      hoursEl.textContent = String(timeDiff.hours).padStart(2, '0')
    }

    if (!minutesEl.hasAttribute('data-init')) {
      animateCount(minutesEl, timeDiff.minutes)
      minutesEl.setAttribute('data-init', 'true')
    } else {
      minutesEl.textContent = String(timeDiff.minutes).padStart(2, '0')
    }

    // 秒数更新逻辑可以放在单独的高频定时器中，或者这里简单处理
    // 由于只显示分，我们暂时不处理秒的 DOM 操作以节省性能，除非添加秒显示

    const targetYear = targetDate.getFullYear()
    statusEl.textContent = `${targetYear}年 · 距离还有 ${timeDiff.days} 天`
    statusEl.classList.remove('is-today')
  }
}

// 3D 倾斜与光斑效果初始化
function initTiltAndSpotlight() {
  const cards = document.querySelectorAll('.countdown-card')

  // 鼠标移动监听 - 全局处理光斑坐标，减少事件监听器数量
  document.addEventListener('mousemove', (e) => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  })

  // 倾斜效果
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -8 // 最大倾斜角度
      const rotateY = ((x - centerX) / centerX) * 8

      // 使用 transform 并保留 slideUp 动画可能需要的初始状态覆盖（实际上 slideUp 只有入场）
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    })
  })
}

// 更新所有倒计时
function updateAllCountdowns() {
  const cards = document.querySelectorAll('.countdown-card')
  cards.forEach(updateCardCountdown)
}

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
    this.animate = this.animate.bind(this) // Bind for requestAnimationFrame
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

    // 随机颜色 (Confetti) 或 主题色 (Particle)
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
      vy: isConfetti ? Math.random() * 2 + 2 : (Math.random() - 0.5) * 0.5 - 0.5, // Confetti falls fast, particles float float up
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
      // 基础移动
      p.x += p.vx
      p.y += p.vy

      // 鼠标交互 (仅对背景粒子)
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

      // 摩擦力
      p.vx *= 0.98
      p.vy = p.isConfetti ? p.vy : p.vy * 0.98 - 0.02 // 粒子微向上浮

      // 边界检查与重置
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

      // 应用位置
      const transform = p.isConfetti
        ? `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`
        : `translate(${p.x}px, ${p.y}px)`

      p.element.style.transform = transform
    })

    requestAnimationFrame(this.animate)
  }
}

// 全局粒子系统实例
let particleSystem

// 创建悬浮粒子效果 (现在只是初始化系统)
function createParticles() {
  particleSystem = new ParticleSystem()
}

// 初始化
function init() {
  const grid = document.getElementById('countdownGrid')

  // 创建粒子效果
  createParticles()

  // 渲染所有卡片
  grid.innerHTML = events.map(createCountdownCard).join('')

  // 立即更新一次
  updateAllCountdowns()

  // 初始化高级动效
  initTiltAndSpotlight()


  // 每秒更新
  setInterval(updateAllCountdowns, 1000)
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init)
