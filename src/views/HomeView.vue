<script setup>
import PageHeader from '../components/home/PageHeader.vue'
import CountdownSection from '../components/home/CountdownSection.vue'
import SocialLinks from '../components/home/SocialLinks.vue'
import { events } from '../data/events.js'
</script>

<template>
  <div class="home-container">
    <!-- 左侧内容区 -->
    <div class="content-left">
      <PageHeader />
      
      <!-- 分隔线 -->
      <div class="divider"></div>
      
      <!-- 倒计时区域 -->
      <CountdownSection :events="events" />
      
      <!-- 底部链接 -->
      <div class="footer-area">
        <SocialLinks />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  @apply w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12;
  @apply flex flex-col h-full relative z-10;
}

.content-left {
  @apply flex flex-col h-full;
  max-width: 480px;
}

/* 分隔线 */
.divider {
  @apply w-full h-px my-6 md:my-8;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.05) 100%
  );
  animation: expandLine 0.8s ease-out 0.3s backwards;
}

.footer-area {
  @apply mt-auto pt-6 md:pt-8;
}

@keyframes expandLine {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(1);
    transform-origin: left;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .content-left {
    @apply max-w-full text-center items-center;
  }
  
  .divider {
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
  }
}
</style>
