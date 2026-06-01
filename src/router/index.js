import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

NProgress.configure({ showSpinner: false, speed: 400 })// 自訂進度條顏色&細節

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/events', component: () => import('../views/EventsView.vue') },
  { path: '/interaction', component: () => import('../views/InteractionView.vue') },
  { path: '/join', component: () => import('../views/JoinView.vue') },
  { path: '/staff', component: () => import('../views/StaffView.vue') },
  { path: '/events/:slug', component: () => import('../views/EventDetailView.vue') },
  { path: '/faq', component: () => import('../views/FAQView.vue') },
  // 👇 知識庫/資源中心路由
  { path: '/resources', component: () => import('../views/ResourceView.vue') },
  { path: '/media', component: () => import('../views/MediaView.vue') },
  // 👇 新增：Minigame 遊戲實驗室路由 (懶加載)
  { path: '/minigame', component: () => import('../views/MiniGM.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const PAGE_TITLES = {
  '/': 'iPower 社團 | 讓每個人發揮正向影響力',
  '/about': '關於我們 | iPower 社團',
  '/events': '活動總覽 | iPower 社團',
  '/interaction': '互動 Bar | iPower 社團',
  '/join': '加入我們 | iPower 社團',
  '/staff': '認識團隊 | iPower 社團',
  '/faq': '常見問題 | iPower 社團',
  '/resources': '社團知識庫 | iPower 社團',
  '/media': '影音專區 | iPower 社團',
  '/minigame': '遊戲實驗室 | iPower 社團',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 } 
    }
  }
})

// when切換
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to) => {
  NProgress.done()
  if (to.name === 'not-found') {
    document.title = '找不到頁面 | iPower 社團'
    return
  }
  if (to.path.startsWith('/events/') && to.params.slug) {
    document.title = '活動詳情 | iPower 社團'
    return
  }
  document.title = PAGE_TITLES[to.path] || 'iPower 社團'
})

export default router