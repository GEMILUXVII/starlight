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
  } else {
    daysEl.textContent = String(timeDiff.days).padStart(2, '0')
    hoursEl.textContent = String(timeDiff.hours).padStart(2, '0')
    minutesEl.textContent = String(timeDiff.minutes).padStart(2, '0')

    const targetYear = targetDate.getFullYear()
    statusEl.textContent = `${targetYear}年 · 距离还有 ${timeDiff.days} 天`
    statusEl.classList.remove('is-today')
  }
}

// 更新所有倒计时
function updateAllCountdowns() {
  const cards = document.querySelectorAll('.countdown-card')
  cards.forEach(updateCardCountdown)
}

// 创建悬浮粒子效果
function createParticles() {
  const container = document.createElement('div')
  container.className = 'particles'

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.animationDelay = `${Math.random() * 20}s`
    particle.style.animationDuration = `${15 + Math.random() * 20}s`
    particle.style.opacity = `${0.1 + Math.random() * 0.3}`
    particle.style.width = particle.style.height = `${2 + Math.random() * 4}px`
    container.appendChild(particle)
  }

  document.body.insertBefore(container, document.body.firstChild)
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

  // 每秒更新
  setInterval(updateAllCountdowns, 1000)
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init)
