<script setup>
// 社交链接组件 - 极简风格
</script>

<template>
  <footer class="social-links">
    <a 
      href="https://space.bilibili.com/401315430" 
      target="_blank" 
      rel="noopener" 
      class="social-link"
    >
      <svg class="bili-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12z"/>
      </svg>
      <span class="link-text">前往 B站 主页</span>
      <span class="arrow">→</span>
    </a>
  </footer>
</template>

<style scoped>
.social-links {
  @apply relative z-10;
  animation: fadeIn 0.8s ease-out 0.6s backwards;
}

.social-link {
  @apply inline-flex items-center gap-2 text-sm transition-all duration-300;
  color: rgba(255, 255, 255, 0.25);
}

.social-link:hover {
  color: rgba(255, 255, 255, 0.7);
}

.social-link:hover .bili-icon {
  color: #FB7299;
}

.social-link:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

.bili-icon {
  @apply w-5 h-5 transition-colors duration-300;
}

.link-text {
  @apply font-light;
}

.arrow {
  @apply opacity-0 -translate-x-2 transition-all duration-300;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
