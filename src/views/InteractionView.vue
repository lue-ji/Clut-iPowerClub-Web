<template>
  <div class="interaction-view">
    <section class="hero interaction-hero">
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>
      <div class="page hero-inner relative-z">
        <span class="hero-badge fade-in">Interaction Bar</span>
        <h1 class="hero-title fade-in">互動 Bar</h1>
        <p class="hero-text fade-in">
          活動、笑容與心得，都在這裡慢慢累積成 iPower 的故事。
        </p>
      </div>
    </section>

    <section class="section section-sm soft-mesh-bg">
      <div class="page">
        <div class="filter-bar fade-in">
          <button class="filter-btn" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">全部</button>
          <button class="filter-btn" :class="{ active: activeTab === 'events' }" @click="activeTab = 'events'">活動精選</button>
          <button class="filter-btn" :class="{ active: activeTab === 'stories' }" @click="activeTab = 'stories'">微笑牆</button>
        </div>

        <div v-if="activeTab === 'all' || activeTab === 'events'" class="content-section">
          <div class="section-head-mini">
            <h2 class="title-sm">🎉 活動精選</h2>
          </div>
          <div class="grid grid-3">
            <router-link
              :to="`/events/${event.slug}`"
              v-for="event in sortedEvents"
              :key="event.id"
              class="card event-card-glass fade-in"
            >
              <img :src="event.image" class="event-image" :alt="event.title" loading="lazy" decoding="async" />
              <div class="event-body">
                <span class="tag">{{ event.type }}</span>
                <h3>{{ event.title }}</h3>
                <p class="desc-sm">{{ event.summary }}</p>
              </div>
            </router-link>
          </div>
        </div>

        <div v-if="activeTab === 'all' || activeTab === 'stories'" class="content-section">
          <div class="section-head-mini smile-head">
            <h2 class="title-sm">😊 微笑牆</h2>
            <button
              v-if="!loading"
              type="button"
              class="btn btn-outline btn-sm"
              @click="fetchData"
            >
              重新整理
            </button>
          </div>

          <p v-if="loading" class="state-text">笑容正在路途上...</p>

          <div v-else-if="fetchError && !mergedStories.length" class="state-box error-box">
            <p>{{ fetchError }}</p>
            <button type="button" class="btn btn-sm" @click="fetchData">再試一次</button>
          </div>

          <p v-else-if="usingFallback" class="state-hint">目前顯示離線備用留言（API 暫時無法連線）</p>

          <div v-if="!loading && mergedStories.length" class="masonry-container">
            <div
              v-for="(item, index) in mergedStories"
              :key="`${item.time || 't'}-${item.name}-${index}`"
              class="card smile-card-glass masonry-item fade-in"
            >
              <div class="smile-card-content">
                <img
                  :src="item.image || defaultAvatar"
                  class="smile-img"
                  :alt="`${item.name || '社員'}的留言`"
                  loading="lazy"
                  decoding="async"
                />
                <div class="smile-body">
                  <p class="smile-text">「{{ item.text || '超開心的一天～😆' }}」</p>
                  <div class="smile-footer">
                    <span class="smile-name">— {{ item.name || '匿名夥伴' }}</span>
                    <span class="smile-date" v-if="item.time">{{ formatDate(item.time) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p v-else-if="!loading && !mergedStories.length" class="state-text">還沒有留言，歡迎到加入我們頁分享心得！</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getMessages } from '../api/message'
import { events } from '../data/events'
import { smileWallFallback } from '../data/smileWallFallback'
import { useSortedEvents } from '@/composables/useSortedEvents'
import logoPng from '@/../logo.png'

const activeTab = ref('all')
const loading = ref(true)
const fetchError = ref('')
const apiStories = ref([])
const usingFallback = ref(false)
const defaultAvatar = logoPng
let intervalId = null

const fetchData = async () => {
  loading.value = true
  fetchError.value = ''
  try {
    const data = await getMessages()
    apiStories.value = data
    usingFallback.value = false
  } catch {
    if (apiStories.value.length === 0) {
      usingFallback.value = true
      fetchError.value = ''
    } else {
      fetchError.value = '無法更新最新留言，仍顯示上次載入的內容。'
    }
  } finally {
    loading.value = false
  }
}

const sortedEvents = useSortedEvents(events)
const mergedStories = computed(() => {
  if (apiStories.value.length > 0) return apiStories.value
  if (usingFallback.value) return smileWallFallback
  return []
})

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const startPolling = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (document.visibilityState === 'visible') fetchData()
  }, 60000)
}

const handleVisibility = () => {
  if (document.visibilityState === 'visible') fetchData()
}

onMounted(() => {
  fetchData()
  startPolling()
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<style scoped>
.interaction-view { overflow-x: hidden; }

.interaction-hero {
  position: relative; background: #091321; padding: 100px 0; overflow: hidden; text-align: center;
}
.glow-1 { width: 400px; height: 400px; background: rgba(95, 135, 168, 0.4); top: -10%; left: -5%; }
.glow-2 { width: 350px; height: 350px; background: rgba(138, 99, 210, 0.3); bottom: -10%; right: -5%; }

.soft-mesh-bg {
  background: radial-gradient(at 0% 0%, #f0f4f8 0%, #ffffff 50%, #f7f9fc 100%);
  min-height: 80vh;
}
.filter-bar { display: flex; justify-content: center; gap: 12px; margin-bottom: 40px; }
.filter-btn {
  padding: 10px 24px; border-radius: 999px; border: 1px solid var(--border); background: white;
  font-weight: 700; cursor: pointer; transition: all 0.3s;
}
.filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); transform: scale(1.05); }

.event-card-glass {
  display: block; text-decoration: none; color: inherit; border-radius: 20px; overflow: hidden;
  background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid white;
  transition: all 0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.event-card-glass:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
.event-image { width: 100%; height: 200px; object-fit: cover; }
.event-body { padding: 20px; }

.masonry-container {
  column-count: 3;
  column-gap: 20px;
  width: 100%;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}

.smile-card-glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 10px 25px rgba(35, 77, 116, 0.05);
  transition: all 0.3s;
}
.smile-card-glass:hover { background: rgba(255, 255, 255, 0.9); transform: scale(1.02); }
.smile-img { width: 100%; border-radius: 14px; margin-bottom: 12px; }
.smile-text { font-size: 1rem; line-height: 1.6; color: var(--text); font-weight: 500; margin-bottom: 12px; }
.smile-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 10px; }
.smile-name { font-weight: 700; color: var(--primary-dark); font-size: 0.9rem; }
.smile-date { font-size: 0.8rem; color: var(--muted); }

.content-section { margin-bottom: 60px; }
.smile-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.title-sm { font-size: 1.5rem; margin-bottom: 0; color: var(--primary-dark); }
.state-text { text-align: center; color: var(--muted); padding: 40px; }
.state-hint {
  text-align: center;
  color: var(--accent);
  font-size: 0.9rem;
  margin-bottom: 16px;
}
.state-box {
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
}
.error-box {
  background: #fef2f2;
  color: #991b1b;
}

@media (max-width: 1000px) { .masonry-container { column-count: 2; } }
@media (max-width: 600px) { .masonry-container { column-count: 1; } }
</style>
