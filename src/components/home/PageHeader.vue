<script setup>
// 页面标题组件 - 日式极简风格
</script>

<template>
  <header class="page-header">
    <h1 class="hero-title">
      <span class="star-icon left">✦</span>
      <span class="title-text">XINGTONG</span>
      <span class="star-icon right">✦</span>
    </h1>
    <p class="hero-subtitle">星星的星 闪耀双瞳的瞳</p>
  </header>
</template>

<style scoped>
.page-header {
  @apply relative z-10;
  animation: fadeInDown 0.8s ease-out;
}

.hero-title {
  @apply flex items-center gap-3 text-4xl sm:text-5xl md:text-6xl font-thin tracking-tighter text-white;
  letter-spacing: -0.02em;
}

.title-text {
  @apply relative;
  background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.star-icon {
  @apply text-lg sm:text-xl opacity-40;
  color: var(--rose);
  animation: twinkle 3s ease-in-out infinite;
}

.star-icon.right {
  animation-delay: 1.5s;
}

.hero-subtitle {
  @apply text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase mt-2 md:mt-3;
  color: rgba(255, 255, 255, 0.35);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
</style>
