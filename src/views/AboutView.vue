<script setup>
import { ref } from 'vue'

// Bilibili User Data (using local avatar to avoid CDN issues)
const biliUser = ref({
  uid: '403039446',
  name: 'GEMILUX', 
  face: '/ava.jpg',
  sign: ''
})
</script>

<template>
  <div class="about-container relative w-full min-h-screen overflow-hidden">
    <!-- Diagonal Overlay -->
    <div class="diagonal-bg absolute inset-0 bg-black/60 backdrop-blur-xl"></div>

    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-screen flex flex-col">
      <!-- Header -->
      <header class="mb-12 md:mb-20 animate-slide-in">
        <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 uppercase w-fit pr-6">
          About
        </h1>
        <div class="flex items-center gap-3 md:gap-4 mt-2 ml-1 md:ml-2">
          <div class="h-1 w-12 md:w-20 bg-rose-500"></div>
          <p class="text-sm md:text-lg font-bold tracking-[0.15em] md:tracking-[0.2em] text-white/80 uppercase">The Project</p>
        </div>
      </header>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 flex-grow">
        <!-- Left Col: Intro & Creator -->
        <div class="md:col-span-5 space-y-12 animate-slide-up" style="animation-delay: 0.1s">
          <div class="space-y-6">
            <h2 class="text-2xl md:text-3xl font-bold text-white flex gap-2 items-baseline">
              <span class="text-rose-500">01.</span>
              简介
            </h2>
            <p class="text-base md:text-xl text-white/80 leading-relaxed font-light">
              <span class="block text-xl md:text-2xl font-bold mb-4" style="color: #f472b6; text-shadow: 0 0 20px rgba(244, 114, 182, 0.5);">"我在！！！小星星，你慢慢说！！！"</span>
              <span class="block">或许我暂时没看到，</span>
              <span class="block">但谢谢你能把这些分享给我，</span>
              <span class="block font-bold text-white mt-2 text-shadow-glow">你说的话很重要！！！</span>
            </p>
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl md:text-3xl font-bold text-white flex gap-2 items-baseline">
              <span class="text-violet-500">02.</span>
              开发者
            </h2>
            <a href="https://space.bilibili.com/403039446" target="_blank" class="flex items-center gap-5 group cursor-pointer hover:bg-white/5 p-4 -ml-4 rounded-xl transition-all duration-300">
              <div class="relative">
                <!-- Avatar container with pink ring on hover -->
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-rose-400 transition-all duration-300 shadow-lg group-hover:shadow-rose-500/20">
                  <img :src="biliUser.face" :alt="biliUser.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                </div>
                <!-- Bilibili Icon Badge -->
                <div class="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                   <svg class="w-4 h-4 text-[#FB7299]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12z"/></svg>
                </div>
              </div>
              <div>
                <p class="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">{{ biliUser.name }}</p>
                <p class="text-white/50 text-sm tracking-wider font-mono">UID: {{ biliUser.uid }}</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Right Col: Legal & Info -->
        <div class="md:col-span-6 md:col-start-7 space-y-10 animate-slide-up" style="animation-delay: 0.2s">
          <div class="p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
            <h3 class="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">LEGAL NOTICE</h3>
            <div class="space-y-4 text-sm text-white/70 leading-relaxed">
              <p>
                <strong class="text-white">视频版权：</strong><br>
                所有视频内容均使用 Bilibili 官方播放器嵌入，版权归属星瞳官方及原作者。
              </p>
              <p>
                <strong class="text-white">资料来源：</strong><br>
                大事记数据引用自 <a href="https://zh.moegirl.org.cn/星瞳" target="_blank" class="text-white underline hover:text-cyan-400">萌娘百科</a> (CC BY-NC-SA 3.0 CN)。
              </p>
            </div>
          </div>

          <div class="p-8 border-l-4 border-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent">
            <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">DISCLAIMER</h3>
            <p class="text-white/80 leading-relaxed">
              本站为非营利性粉丝项目，<br>与官方无直接商业关联。
            </p>
          </div>
        </div>
      </div>

      <!-- Footer (Kept same content, adjusted style) -->
      <footer class="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 animate-fade-in">
        <p class="font-mono">© 2025 <a href="https://github.com/GEMILUXVII" target="_blank" class="text-white/60 hover:text-white transition-colors">GEMILUXVII</a></p>
        <p class="font-mono">
          POWERED BY VUE & <a href="https://github.com/GEMILUXVII/starlight" target="_blank" class="text-white/60 hover:text-white transition-colors">STARLIGHT</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.diagonal-bg {
  /* 创建一个左上-右下的倾斜切割效果 */
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  background: linear-gradient(
    115deg, 
    rgba(0,0,0,0.95) 0%, 
    rgba(0,0,0,0.8) 45%, 
    rgba(244, 63, 94, 0.1) 45.1%, 
    rgba(0,0,0,0.4) 100%
  );
}

@media (min-width: 768px) {
  .diagonal-bg {
    /* 大屏幕下更明显的倾斜 */
    background: linear-gradient(
      115deg, 
      rgba(0,0,0,0.9) 0%, 
      rgba(0,0,0,0.85) 50%, 
      transparent 50.1%, 
      transparent 100%
    );
  }
}

.animate-slide-in {
  animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out 0.5s backwards;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
