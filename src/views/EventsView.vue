<template>
  <div class="events-view">
    <section class="hero events-hero">
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>
      <div class="page hero-inner relative-z">
        <span class="hero-badge fade-in">Our Events</span>
        <h1 class="hero-title fade-in">活動總覽</h1>
        <p class="hero-text fade-in">
          探索 iPower 舉辦過的各式活動，在這裡找尋屬於你們的精采回憶。
        </p>
      </div>
    </section>

    <section class="section ip-bg-soft">
      <div class="page">
        <div class="grid grid-3">
          <router-link 
            v-for="event in sortedEvents" 
            :key="event.id"
            :to="`/events/${event.slug}`"
            class="card ip-glass-card event-card fade-in"
          >
            <div class="event-img-wrap">
              <img :src="event.image" :alt="event.title" class="event-img" loading="lazy" />
              <div class="event-tag">{{ event.type }}</div>
            </div>
            <div class="event-content">
              <h3 class="event-title">{{ event.title }}</h3>
              <p class="event-desc">{{ event.summary }}</p>
            </div>
          </router-link>

          <router-link to="/minigame" class="secret-event-card fade-in">
            <div class="card-content">
              <div class="secret-badge">
                <span class="pulse-dot"></span>
                System Event
              </div>
              <h3 class="secret-title">SlangSnap 遊戲實驗室</h3>
              <p class="secret-desc">網頁正式上線前的特別企劃！點擊進入測試模塊，解鎖隱藏彩蛋 🎮</p>
            </div>
            <div class="hover-glow"></div>
          </router-link>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSortedEvents } from '@/composables/useSortedEvents'
import { events } from '@/data/events'

const sortedEvents = useSortedEvents(events)
</script>

<style scoped>
/* --- 原本的樣式 --- */
.events-hero { position: relative; background: #091321; padding: 100px 0; overflow: hidden; text-align: center; }
.glow-1 { width: 400px; height: 400px; background: rgba(95, 135, 168, 0.5); top: -10%; left: 0%; }
.glow-2 { width: 300px; height: 300px; background: rgba(45, 212, 191, 0.3); bottom: -10%; right: 10%; }
.event-card { padding: 0; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; color: inherit; }
.event-img-wrap { position: relative; height: 220px; overflow: hidden; }
.event-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.event-card:hover .event-img { transform: scale(1.08); }
.event-tag { position: absolute; top: 16px; left: 16px; background: rgba(9, 19, 33, 0.75); color: white; padding: 6px 12px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; backdrop-filter: blur(4px); }
.event-content { padding: 24px; display: flex; flex-direction: column; flex-grow: 1; }
.event-title { margin: 0 0 12px 0; color: var(--primary-dark); font-size: 1.3rem; }

/* 👇 已修復警告的代碼 */
.event-desc { 
  margin: 0; 
  color: var(--muted); 
  line-height: 1.7; 
  font-size: 0.95rem; 
  display: -webkit-box; 
  -webkit-line-clamp: 3; 
  line-clamp: 3; 
  -webkit-box-orient: vertical; 
  box-orient: vertical;
  overflow: hidden; 
}

/* --- 👇 新增的彩蛋卡片專屬樣式 --- */
.secret-event-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 350px; 
  text-decoration: none;
  background: linear-gradient(145deg, #0a1628 0%, #132a45 55%, #1a3a5c 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 20px;
  padding: 32px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  box-shadow: 0 12px 32px rgba(9, 19, 33, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.card-content { position: relative; z-index: 2; }

.secret-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(14, 116, 144, 0.35);
  border-radius: 30px;
  color: #7dd3fc;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 16px;
  border: 1px solid rgba(125, 211, 252, 0.45);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 8px #00f2fe;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
  100% { opacity: 1; transform: scale(1); }
}
.secret-title {
  color: #f8fafc;
  font-size: 1.5rem;
  margin: 0 0 12px 0;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  transition: color 0.3s, text-shadow 0.3s;
}

.secret-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
}
.hover-glow {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 0, 122, 0.5), transparent 70%);
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
}

.secret-event-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: rgba(255, 0, 122, 0.4);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 0, 122, 0.2);
}

.secret-event-card:hover .hover-glow { opacity: 1; }

.secret-event-card:hover .secret-title {
  color: #e0f2fe;
  text-shadow: 0 0 18px rgba(125, 211, 252, 0.55);
}
</style>