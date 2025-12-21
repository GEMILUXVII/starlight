<script setup>
import { ref } from 'vue'

const musicList = [
  {
    id: 1,
    title: '瞳',
    type: '原创曲',
    date: '2022-11-04',
    bvid: 'BV1MW4y177ZG',
    cover: 'https://imgbed.aspchang.cn/file/46fc603768bd78de2b47c50607a28ee9de36c0ad.jpg',
    desc: '首张迷你专辑《星·引力》主打曲',
    accent: 'rose'
  },
  {
    id: 2,
    title: '神明少女舞',
    type: '舞蹈',
    date: '2022-06-28',
    bvid: 'BV1HS4y1p7GR',
    cover: 'https://imgbed.aspchang.cn/file/image(4).png',
    desc: '神明少女舞，但是星瞳',
    accent: 'blue'
  },
  {
    id: 3,
    title: '刀马旦',
    type: '合作',
    date: '2023-04-30',
    bvid: 'BV1d14y1o7JZ',
    cover: 'https://imgbed.aspchang.cn/file/image(3).png',
    desc: '星瞳✨兰音共献刀马旦，耍花枪舞翻全场！',
    accent: 'red'
  },
  {
    id: 4,
    title: '屏中人',
    type: '原创',
    date: '2023-10-29',
    bvid: 'BV18N41137XE',
    cover: 'https://imgbed.aspchang.cn/file/image(2).png',
    desc: '屏中无限近的你我，虚拟与现实的链接',
    accent: 'pink'
  },
  {
    id: 5,
    title: '星游记',
    type: 'VLOG',
    date: '2025-03-10',
    bvid: 'BV1hPRGYcE53',
    cover: 'https://imgbed.aspchang.cn/file/image(1).png',
    desc: '冬季午后与瞳瞳一起漫步在北京什刹海！',
    accent: 'violet'
  },
  {
    id: 6,
    title: 'Bad Apple',
    type: '翻唱',
    date: '2025-11-07',
    bvid: 'BV1JR11BVEzz',
    cover: 'https://imgbed.aspchang.cn/file/image.png',
    desc: '镇站之宝禁忌填词！！25 年了还有翻唱？',
    accent: 'cyan'
  }
]

const selectedVideo = ref(null)

const openVideo = (music) => {
  selectedVideo.value = music
}

const closeVideo = () => {
  selectedVideo.value = null
}
</script>

<template>
  <div class="music-container w-full max-w-6xl mx-auto py-10 px-4">
    <header class="header text-center mb-12">
      <h1 class="title justify-center">
        <span class="title-star">✦</span>
        作品选
        <span class="title-star">✦</span>
      </h1>
      <p class="subtitle">VIDEOS & PERFORMANCES</p>
    </header>

    <!-- Music Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="music in musicList" 
        :key="music.id"
        class="music-card group cursor-pointer"
        @click="openVideo(music)"
      >
        <div class="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/20">
          <!-- Cover Image -->
          <div class="aspect-video relative overflow-hidden">
            <img 
              v-if="music.cover" 
              :src="music.cover" 
              :alt="music.title"
              class="w-full h-full object-cover"
            />
            <div 
              v-else
              class="w-full h-full bg-gradient-to-br from-rose-500/20 to-violet-500/20 flex items-center justify-center"
            >
              <svg class="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
          </div>

          <!-- Info -->
          <div class="p-5 flex flex-col" style="min-height: 140px">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">{{ music.title }}</h3>
              <span :class="`text-xs px-3 py-1 rounded-full bg-${music.accent}-500/40 text-white border-2 border-${music.accent}-400/60 whitespace-nowrap font-semibold shadow-lg`">
                {{ music.type }}
              </span>
            </div>
            <p class="text-sm text-white/80 mb-3 line-clamp-2">{{ music.desc }}</p>
            <div class="flex items-center justify-between text-xs text-white/60 mt-auto">
              <span>{{ music.date }}</span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.87c0 .36-.29.65-.65.65H3.65c-.36 0-.65-.29-.65-.65V5.13c0-.36.29-.65.65-.65h16.7c.36 0 .65.29.65.65v7.74zm-7.68-3.97c.65 0 1.18.53 1.18 1.18 0 .65-.53 1.18-1.18 1.18-.65 0-1.18-.53-1.18-1.18 0-.65.53-1.18 1.18-1.18z"/>
                </svg>
                Bilibili
              </span>
            </div>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              点击播放
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <Transition name="modal">
      <div 
        v-if="selectedVideo" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click="closeVideo"
      >
        <div 
          class="relative w-full max-w-4xl bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          @click.stop
        >
          <!-- Close Button -->
          <button 
            @click="closeVideo"
            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Video Title -->
          <div class="p-6 pb-4">
            <h2 class="text-2xl font-bold text-white mb-1">{{ selectedVideo.title }}</h2>
            <p class="text-white/60">{{ selectedVideo.desc }}</p>
          </div>

          <!-- Bilibili Embed -->
          <div class="aspect-video">
            <iframe 
              :src="`//player.bilibili.com/player.html?bvid=${selectedVideo.bvid}&page=1&high_quality=1&danmaku=0`"
              scrolling="no" 
              border="0" 
              frameborder="no" 
              framespacing="0" 
              allowfullscreen="true"
              class="w-full h-full"
            ></iframe>
          </div>

          <!-- Footer Actions -->
          <div class="p-6 pt-4 flex items-center justify-between bg-black/20">
            <a 
              :href="`https://www.bilibili.com/video/${selectedVideo.bvid}`" 
              target="_blank"
              class="text-sm text-white/60 hover:text-rose-400 transition-colors flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906l-1.174 1.12zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
              </svg>
              在 B站 观看
            </a>
            <span class="text-xs text-white/40">{{ selectedVideo.date }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
