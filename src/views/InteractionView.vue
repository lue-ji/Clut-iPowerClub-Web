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
            <router-link :to="`/events/${event.slug}`" v-for="event in sortedEvents" :key="event.id" class="card event-card-glass fade-in">
              <img :src="event.image" class="event-image" :alt="event.title" />
              <div class="event-body">
                <span class="tag">{{ event.type }}</span>
                <h3>{{ event.title }}</h3>
                <p class="desc-sm">{{ event.summary }}</p>
              </div>
            </router-link>
          </div>
        </div>

        <div v-if="activeTab === 'all' || activeTab === 'stories'" class="content-section">
          <div class="section-head-mini">
            <h2 class="title-sm">😊 微笑牆</h2>
          </div>
          
          <p v-if="loading" class="state-text">笑容正在路途上...</p>
          
          <div v-else class="masonry-container">
            <div v-for="item in mergedStories" :key="item.time" class="card smile-card-glass masonry-item fade-in">
              <div class="smile-card-content">
                <img :src="item.image || defaultAvatar" class="smile-img" alt="微笑牆頭像" />
                <div class="smile-body">
                  <p class="smile-text">「{{ item.text || '超開心的一天～😆' }}」</p>
                  <div class="smile-footer">
                    <span class="smile-name">— {{ item.name }}</span>
                    <span class="smile-date" v-if="item.time">{{ formatDate(item.time) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getMessages } from '../api/message'
import { events } from '../data/events'
import { stories } from '../data/stories'
import { useSortedEvents } from '@/composables/useSortedEvents'

const activeTab = ref('all')
const loading = ref(true)
const apiStories = ref([])
const defaultAvatar = 'https://i.pravatar.cc/150'
let intervalId = null

const fetchData = async () => {
  try {
    const data = await getMessages()
    apiStories.value = data
  } catch (err) {
    // 失敗時使用本地備用數據，不在控制台輸出錯誤
    if (apiStories.value.length === 0) {
      console.warn('微笑牆連接失敗，使用本地備用數據')
    }
  } finally {
    loading.value = false
  }
}

const sortedEvents = useSortedEvents(events)
const mergedStories = computed(() => apiStories.value.length > 0 ? apiStories.value : stories)

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

onMounted(() => {
  fetchData()
  intervalId = setInterval(fetchData, 60000)
})
onUnmounted(() => clearInterval(intervalId))
</script>

<style scoped>
.interaction-view { overflow-x: hidden; }

/* Hero 背景光暈 */
.interaction-hero {
  position: relative; background: #091321; padding: 100px 0; overflow: hidden; text-align: center;
}
.glow-1 { width: 400px; height: 400px; background: rgba(95, 135, 168, 0.4); top: -10%; left: -5%; }
.glow-2 { width: 350px; height: 350px; background: rgba(138, 99, 210, 0.3); bottom: -10%; right: -5%; }

/* 分類按鈕與微漸層背景 [cite: 167-169] */
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

/* 活動卡片優化 [cite: 171] */
.event-card-glass {
  display: block; text-decoration: none; color: inherit; border-radius: 20px; overflow: hidden;
  background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid white;
  transition: all 0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.event-card-glass:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
.event-image { width: 100%; height: 200px; object-fit: cover; }
.event-body { padding: 20px; }

/* 🌟 核心：瀑布流佈局 [cite: 175] */
.masonry-container {
  column-count: 3;
  column-gap: 20px;
  width: 100%;
}
.masonry-item {
  break-inside: avoid; /* 防止卡片被切斷 */
  margin-bottom: 20px;
}

/* 微笑牆毛玻璃卡片 [cite: 190] */
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
.title-sm { font-size: 1.5rem; margin-bottom: 24px; color: var(--primary-dark); }
.state-text { text-align: center; color: var(--muted); padding: 40px; }

/* 響應式處理 */
@media (max-width: 1000px) { .masonry-container { column-count: 2; } }
@media (max-width: 600px) { .masonry-container { column-count: 1; } }
</style>