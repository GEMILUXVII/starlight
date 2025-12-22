<script setup>
// About page - Left accent border style with enhanced text visibility
</script>

<template>
  <div class="about-container w-full max-w-2xl mx-auto py-16 px-6">
    <!-- Header -->
    <header class="text-center mb-16">
      <h1 class="main-title text-5xl font-light tracking-[0.2em] text-white mb-4">
        关于
      </h1>
      <div class="w-20 h-0.5 bg-rose-400 mx-auto"></div>
    </header>

    <!-- Content Sections with left accent border -->
    <div class="space-y-12">
      
      <!-- Section 1: Intro -->
      <section class="section-block pl-6 border-l-2 border-rose-400">
        <p class="text-white text-xl leading-relaxed font-medium section-text">
          这是一个为虚拟偶像<span class="text-rose-400">星瞳</span>创建的非官方粉丝网站。
        </p>
        <p class="text-white/90 text-lg leading-relaxed mt-3 section-text">
          在这里，你可以看到倒计时、大事记、精选作品，以及更多关于星瞳的一切。
        </p>
      </section>

      <!-- Section 2: Copyright -->
      <section class="section-block pl-6 border-l-2 border-cyan-400">
        <h2 class="text-cyan-400 text-sm tracking-[0.2em] uppercase mb-4 font-bold">版权声明</h2>
        <div class="space-y-3 text-white/90 text-base leading-relaxed section-text">
          <p>视频内容使用 <span class="text-cyan-300 font-medium">Bilibili 官方播放器</span>嵌入，版权归星瞳官方及创作者所有。</p>
          <p>大事记内容引用自 <a href="https://zh.moegirl.org.cn/星瞳" target="_blank" class="text-rose-400 hover:text-rose-300 underline">萌娘百科</a>，采用 CC BY-NC-SA 3.0 CN 协议。</p>
          <p>图片素材来源于网络，如有侵权请联系删除。</p>
        </div>
      </section>

      <!-- Section 3: Disclaimer -->
      <section class="section-block pl-6 border-l-2 border-amber-400">
        <h2 class="text-amber-400 text-sm tracking-[0.2em] uppercase mb-4 font-bold">免责声明</h2>
        <p class="text-white/90 text-base leading-relaxed section-text">
          本站为<span class="text-rose-400 font-medium">非营利性</span>粉丝网站，与星瞳官方、腾讯或任何官方机构<span class="text-amber-400 font-medium">无直接关联</span>。
        </p>
      </section>

      <!-- Section 4: Creator -->
      <section class="section-block pl-6 border-l-2 border-violet-400">
        <h2 class="text-violet-400 text-sm tracking-[0.2em] uppercase mb-4 font-bold">创建者</h2>
        <a 
          href="https://space.bilibili.com/403039446" 
          target="_blank"
          class="inline-flex items-center gap-3 group"
        >
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-violet-500 flex items-center justify-center text-white text-lg font-bold">
            G
          </div>
          <div>
            <span class="text-white text-lg font-medium group-hover:text-rose-400 transition-colors section-text">GEMILUX</span>
            <p class="text-white/60 text-xs">@403039446</p>
          </div>
        </a>
        <p class="text-white/60 text-sm mt-4 section-text">技术栈：Vue 3 · Tailwind CSS · Vite</p>
      </section>

    </div>

    <!-- Footer -->
    <footer class="mt-20 text-center space-y-1">
      <p class="text-white/50 text-sm italic section-text">
        © 2025 
        <a href="https://github.com/GEMILUXVII" target="_blank" class="hover:text-white transition-colors">GEMILUXVII</a>
      </p>
      <p class="text-white/40 text-xs section-text">
        Powered by Vue and 
        <a href="https://github.com/GEMILUXVII/starlight" target="_blank" class="hover:text-white/70 transition-colors">Starlight</a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.main-title {
  text-shadow: 
    0 0 20px rgba(0, 0, 0, 0.9),
    0 0 40px rgba(0, 0, 0, 0.8),
    0 4px 8px rgba(0, 0, 0, 0.9);
}

.section-text {
  text-shadow: 
    0 0 15px rgba(0, 0, 0, 0.95),
    0 0 30px rgba(0, 0, 0, 0.9),
    0 2px 4px rgba(0, 0, 0, 0.95),
    1px 1px 2px rgba(0, 0, 0, 1);
}

.section-block {
  animation: fadeIn 0.6s ease-out backwards;
}

.section-block:nth-child(1) { animation-delay: 0.1s; }
.section-block:nth-child(2) { animation-delay: 0.15s; }
.section-block:nth-child(3) { animation-delay: 0.2s; }
.section-block:nth-child(4) { animation-delay: 0.25s; }
.section-block:nth-child(5) { animation-delay: 0.3s; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
