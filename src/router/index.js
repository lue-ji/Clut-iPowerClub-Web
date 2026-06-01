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
  // 👇 修改：攔截所有未定義的網址，直接導回首頁 (防呆機制)
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

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

// after切換
router.afterEach(() => {
  NProgress.done()
})

export default router