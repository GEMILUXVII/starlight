<script setup>
// About page - no dynamic data needed for now
</script>

<template>
  <div class="about-container w-full max-w-4xl mx-auto py-10 px-4">
    <header class="header text-center mb-12">
      <h1 class="title justify-center">
        <span class="title-star">✦</span>
        关于本站
        <span class="title-star">✦</span>
      </h1>
      <p class="subtitle">ABOUT THIS SITE</p>
    </header>

    <!-- Content Cards -->
    <div class="space-y-8">
      <!-- Site Info Card -->
      <div class="info-card p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/40">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">网站说明</h2>
        </div>
        <div class="text-white/90 space-y-3 leading-relaxed">
          <p>本站专为虚拟偶像<span class="text-rose-400 font-semibold">星瞳</span>而创建的非官方粉丝网站，旨在收录星瞳的精彩作品。</p>
          <p>网站采用现代化技术栈（Vue 3 + Tailwind CSS）构建，提供流畅的浏览体验和美观的视觉呈现。</p>
        </div>
      </div>

      <!-- Copyright Card -->
      <div class="info-card p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/40">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">版权声明</h2>
        </div>
        <div class="text-white/90 space-y-4 leading-relaxed">
          <div>
            <h3 class="text-white font-semibold mb-2">· 视频内容</h3>
            <p class="text-sm text-white/85">本站所有嵌入视频均使用 <span class="text-cyan-400">Bilibili 官方播放器</span>，内容版权归<span class="text-rose-400 font-semibold">星瞳官方</span>及相应创作者所有。本站仅提供展示平台，不存储任何视频文件，不涉及任何版权侵权行为。</p>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-2">· 历史资料</h3>
            <p class="text-sm text-white/85">"大事记"页面内容引用自 <a href="https://zh.moegirl.org.cn/星瞳" target="_blank" class="text-rose-400 hover:text-rose-300 underline">萌娘百科</a>，内容使用 <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/cn/" target="_blank" class="text-cyan-400 hover:text-cyan-300 underline">CC BY-NC-SA 3.0 CN</a> 协议授权。</p>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-2">· 图片素材</h3>
            <p class="text-sm text-white/85">网站背景图片及封面图片均来源于网络公开资源，版权归原作者所有。如有侵权，请及时联系，我们将立即删除。</p>
          </div>
        </div>
      </div>

      <!-- Disclaimer Card -->
      <div class="info-card p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/40">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">免责声明</h2>
        </div>
        <div class="text-white/90 space-y-3 leading-relaxed">
          <p>· 本站为<span class="text-rose-400">非营利性</span>粉丝网站，不进行任何商业活动。</p>
          <p>· 本站与星瞳官方、腾讯或任何官方机构<span class="text-amber-400">无直接关联</span>。</p>
          <p>· 本站内容仅供粉丝交流学习，不代表官方立场。</p>
          <p>· 若本站内容侵犯了您的权益，请及时联系我们，我们将尽快处理。</p>
        </div>
      </div>

      <!-- Creator Card -->
      <div class="info-card p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 to-violet-500/10 backdrop-blur-md border border-white/20">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">创建者信息</h2>
        </div>
        <div class="text-white/90 space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-violet-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              G
            </div>
            <div>
              <p class="text-lg font-semibold text-white">GEMILUX</p>
              <p class="text-sm text-white/70">Fan Site Creator</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <a 
              href="https://space.bilibili.com/403039446" 
              target="_blank"
              class="flex items-center gap-3 p-3 rounded-xl bg-black/20 hover:bg-black/30 transition-colors group"
            >
              <svg class="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12z"/>
              </svg>
              <div class="flex-1">
                <p class="text-xs text-white/50">B站主页</p>
                <p class="text-sm text-white group-hover:text-rose-300 transition-colors">@403039446</p>
              </div>
            </a>
            <div class="flex items-center gap-3 p-3 rounded-xl bg-black/20">
              <svg class="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-xs text-white/50">技术栈</p>
                <p class="text-sm text-white">Vue 3 + Tailwind</p>
              </div>
            </div>
          </div>
          <div class="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p class="text-sm text-white/70 text-center italic">
              "愿这个小站能成为所有小星星的温暖角落 ✨"
            </p>
          </div>
        </div>
      </div>

      <!-- GitHub Link -->
      <a 
        href="https://github.com/GEMILUXVII/starlight" 
        target="_blank"
        class="block p-6 rounded-3xl bg-gradient-to-r from-slate-500/10 to-violet-500/10 backdrop-blur-md border border-white/20 hover:border-white/30 transition-all hover:-translate-y-1 group"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <svg class="w-8 h-8 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <div>
              <p class="text-white font-semibold text-lg group-hover:text-rose-300 transition-colors">本站已开源</p>
              <p class="text-white/60 text-sm">View on GitHub · GEMILUXVII/starlight</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </a>

      <!-- Footer Note -->
      <div class="text-center text-white/40 text-xs space-y-2 py-6">
        <p>本站最后更新于 2025 年 12 月</p>
        <p>Made with Love for Xingtong</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  animation: slideUp 0.6s ease-out backwards;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
