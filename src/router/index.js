import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimelineView from '../views/TimelineView.vue'
import MusicView from '../views/MusicView.vue'
import AboutView from '../views/AboutView.vue'
import GuestbookView from '../views/GuestbookView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimelineView
    },
    {
      path: '/videos',
      name: 'videos',
      component: MusicView
    },
    {
      path: '/guestbook',
      name: 'guestbook',
      component: GuestbookView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
