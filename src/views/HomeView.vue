<template>
  <div class="home-view">
    <!-- 1. Hero 區塊 -->
    <section class="hero">
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>
      <div class="ambient-glow glow-3"></div>

      <div class="page hero-layout relative-z">
        <div class="hero-content">
          <span class="hero-badge fade-in">iPower 社團招募中</span>
          <h1 class="hero-title fade-in">加入 iPower，<br />發揮你的影響力</h1>
          <p class="hero-text fade-in">
            在這裡，你不只是參加活動。你會認識夥伴、參與企劃、培養能力，並在一次次挑戰中成長。
          </p>
          <div class="hero-actions fade-in">
            <router-link to="/join" class="btn hero-btn-primary">立即加入</router-link>
            <router-link to="/events" class="btn hero-btn-secondary">看看活動</router-link>
          </div>
          <div class="hero-points fade-in">
            <span class="hero-point">🤝 團隊合作</span>
            <span class="hero-point">🌱 持續成長</span>
            <span class="hero-point">🚀 發揮影響力</span>
          </div>
        </div>
        <div class="hero-visual fade-in">
          <div class="hero-visual-card glass-morphism">
            <div class="hero-emoji">🚀</div>
            <h3>從參與者，成為帶來改變的人</h3>
            <p>透過活動、合作與挑戰，一步步看見自己的價值。</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 👇*最新活動區塊 (只有當 latestEvent 存在時才顯示) -->
    <section class="section latest-event-block" v-if="latestEvent">
          <div class="page">
            <div class="latest-card fade-in">
              <div class="latest-visual">
                <img :src="latestEvent.image || logoPng" :alt="latestEvent.title" class="latest-img" />
              </div>
              <div class="latest-content">
                <span class="latest-badge">🔥 最新活動</span>
                <h2 class="latest-title">{{ latestEvent.title }}</h2>
                <p class="latest-summary">{{ latestEvent.summary }}</p>
                <div class="latest-meta">
                  <span>📅 {{ latestEvent.date }}</span>
                  <span>📍 {{ latestEvent.location }}</span>
                </div>
                <div class="latest-action">
                  <router-link :to="`/events/${latestEvent.slug}`" class="btn btn-primary-pulse">
                    查看活動詳情 👉
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>

    <!-- 2. 介紹區塊 -->
    <section class="section section-intro ip-bg-soft">
      <div class="page">
        <h2 class="title">我們在做什麼？</h2>
        <p class="subtitle intro-subtitle">當自我縮小，團隊的力量就會被放大。我們透過服務與互動，讓每個人在參與中成長。</p>
        <div class="grid grid-3">
          <div class="card info-card ip-glass-card fade-in">
            <div class="intro-icon-wrap">🤝</div>
            <span class="ip-badge">看重團隊</span>
            <h3>凝聚力量的所在</h3>
            <p class="desc">一個人走得快，一群人走得遠。在 iPower，我們學習彼此補位、共同承擔，讓團隊成為最堅實的後盾。</p>
          </div>
          <div class="card info-card ip-glass-card fade-in">
            <div class="intro-icon-wrap">🌱</div>
            <span class="ip-badge">持續成長</span>
            <h3>跨出舒適圈的勇氣</h3>
            <p class="desc">透過跨校交流、營隊籌備與專案挑戰，我們陪你一起面對挫折。在這裡容許試錯，蛻變成更好的自己。</p>
          </div>
          <div class="card info-card ip-glass-card fade-in">
            <div class="intro-icon-wrap">👑</div>
            <span class="ip-badge">玩出領導力</span>
            <h3>發揮正向影響力</h3>
            <p class="desc">從主動關心夥伴、負責小任務開始。在實作中培養換位思考，慢慢將團隊的能量釋放出來。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 加入流程區塊 -->
    <section class="section section-join-process ip-bg-soft">
      <div class="page">
        <h2 class="title">加入 iPower 的三步驟</h2>
        <p class="subtitle">新生也能快速看懂流程，從認識到加入一步到位。</p>
        <div class="grid grid-3 join-grid">
          <div v-for="(step, index) in joinSteps" :key="index" class="card join-step-card fade-in">
            <div class="step-badge">{{ step.step }}</div>
            <h3>{{ step.title }}</h3>
            <p class="desc">{{ step.text }}</p>
          </div>
        </div>
        <div class="join-cta fade-in">
          <router-link to="/join" class="btn hero-btn-primary">查看加入詳情</router-link>
        </div>
      </div>
    </section>

    <!-- 4. 5 大能力區塊 -->
    <section class="section ip-bg-blue">
      <div class="page">
        <h2 class="title">5 大核心能力，iPower 陪你一起練</h2>
        <p class="subtitle">在參與中培養能力，在團隊中看見影響力。<br /><span class="hint-text">💡 點擊圖示，探索你的超能力！</span></p>
        <div class="power-grid">
          <div v-for="(power, index) in powers" :key="index" class="card power-card" :class="{ 'is-active': power.active }" @click="triggerFirework(index, $event)">
            <div class="power-icon-wrap"><span class="power-icon">{{ power.icon }}</span></div>
            <span class="power-name">{{ power.name }}</span>
            <div class="power-detail" :class="{ 'show': power.active }"><p>{{ power.desc }}</p></div>
          </div>
        </div>
        <div v-if="activePower" class="power-summary-panel fade-in">
          <div class="power-summary-card">
            <div class="power-summary-heading">
              <span class="power-summary-icon">{{ activePower.icon }}</span>
              <div>
                <p class="power-summary-label">已展開能力</p>
                <h3>{{ activePower.name }}</h3>
              </div>
            </div>
            <p class="power-summary-text">{{ activePower.extended }}</p>
            <div class="power-summary-tags">
              <span v-for="tip in activePower.tips" :key="tip" class="power-tag">{{ tip }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 精彩活動回顧 -->
    <section class="section">
      <div class="page">
        <div class="section-head">
          <div class="head-titles">
            <h2 class="title">精彩活動回顧</h2>
            <p class="subtitle">透過服務、活動與交流，留下屬於 iPower 的回憶。</p>
          </div>
          <router-link to="/events" class="btn-outline desktop-only">更多活動</router-link>
        </div>
        <div v-if="featuredEventsData.length" class="carousel">
          <router-link :to="`/events/${currentFeatured?.slug}`" class="card home-image-card fade-in">
            <img :src="currentFeatured?.src" :alt="currentFeatured?.title" class="home-image" loading="lazy" />
            <div class="image-overlay">
              <h3>{{ currentFeatured?.title }}</h3>
              <p>{{ currentFeatured?.text }}</p>
            </div>
          </router-link>
          <div class="carousel-controls">
            <button class="btn" @click.prevent="prevFeatured">‹</button>
            <button class="btn" @click.prevent="nextFeatured">›</button>
          </div>
        </div>
        <div v-else class="grid grid-3">
          <!-- fallback: 沒有 featured 時顯示空格或連到活動清單 -->
          <router-link to="/events" class="card home-image-card fade-in">
            <img :src="logoPng" alt="更多活動" class="home-image" loading="lazy" />
            <div class="image-overlay">
              <h3>更多活動</h3>
              <p>前往活動列表瀏覽所有近期活動</p>
            </div>
          </router-link>
        </div>
        <div class="home-action mobile-only">
          <router-link to="/events" class="btn-outline">更多活動</router-link>
        </div>
      </div>
    </section>
    <!-- 5. CTA 區塊 -->
    <section class="section cta-block mesh-gradient-warm relative-overflow">
      <div class="cta-watermark">✈️</div>
      <div class="cta-watermark cta-watermark-2">✨</div>
      <div class="page cta-inner fade-in relative-z">
        <span class="ip-badge cta-badge">Ready to join?</span>
        <h2 class="title cta-title">準備好開啟你的 iPower 旅程了嗎？</h2>
        <p class="subtitle cta-subtitle">現在就行動，一起創造影響力！</p>
        <div class="cta-actions">
          <router-link to="/interaction" class="btn hero-btn-secondary cta-btn-outline">前往互動牆</router-link>
          <router-link to="/join" class="btn hero-btn-primary">立即加入我們</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import confetti from 'canvas-confetti'
import { events } from '@/data/events'
import { getLatestEvent, getFeaturedEvents } from '@/utils/events'
import logoPng from '@/../logo.png'

const latestEvent = computed(() => {
  return getLatestEvent(events)
})

const featuredEventsData = computed(() => {
  return getFeaturedEvents(events).map(e => ({
    src: e.image || logoPng,
    title: e.title,
    text: e.summary,
    slug: e.slug
  }))
})

// 輪播邏輯
const currentIndex = ref(0)
const currentFeatured = computed(() => featuredEventsData.value[currentIndex.value] || null)
let rotateTimer = null

const startRotate = () => {
  if (rotateTimer) return
  rotateTimer = setInterval(() => {
    if (featuredEventsData.value.length <= 1) return
    currentIndex.value = (currentIndex.value + 1) % featuredEventsData.value.length
  }, 5000)
}

const stopRotate = () => {
  if (rotateTimer) {
    clearInterval(rotateTimer)
    rotateTimer = null
  }
}

const prevFeatured = () => {
  if (!featuredEventsData.value.length) return
  currentIndex.value = (currentIndex.value - 1 + featuredEventsData.value.length) % featuredEventsData.value.length
}

const nextFeatured = () => {
  if (!featuredEventsData.value.length) return
  currentIndex.value = (currentIndex.value + 1) % featuredEventsData.value.length
}

onMounted(() => startRotate())
onUnmounted(() => stopRotate())

const joinSteps = [
  { step: 'STEP 1', title: '填寫報名表', text: '快速告訴我們你的專長與興趣，讓團隊先認識你。'},
  { step: 'STEP 2', title: '參與體驗', text: '透過線上說明或活動，了解社團氛圍與合作模式。'},
  { step: 'STEP 3', title: '正式加入', text: '確認意向後，即可成為 iPower 成員，一起參與企劃與實作。'}
]

const powers = ref([
  {
    icon: '🧭',
    name: '領導力',
    desc: '從小小行動開始，成為能帶來改變的人。',
    extended: '在 iPower 你將學習如何帶領專案、協調資源、並讓每一個成員的聲音被聽見。',
    tips: ['主動提出想法', '協調合作流程', '帶隊執行專案'],
    active: false
  },
  {
    icon: '🗣️',
    name: '溝通力',
    desc: '學習傾聽與表達，建立深刻的連結。',
    extended: '這裡的練習不只是講話，而是讓你在不同立場中找到共識，成為團隊中的橋樑。',
    tips: ['說明自己的想法', '接納他人觀點', '善用回饋機制'],
    active: false
  },
  {
    icon: '🤝',
    name: '團隊力',
    desc: '在互助中成長，一群人走得更遠。',
    extended: '我們重視團隊默契與共好，透過合作任務建立彼此信任，讓目標更容易達成。',
    tips: ['分工協作', '分享資源', '信任團隊成員'],
    active: false
  },
  {
    icon: '💞',
    name: '關係力',
    desc: '在愛中建立有溫度的人際網路。',
    extended: '這不只是社交，而是用真誠與支持打造長久的夥伴關係，讓你在社團裡找到歸屬。',
    tips: ['主動打招呼', '建立信任', '關心夥伴狀態'],
    active: false
  },
  {
    icon: '✨',
    name: '影響力',
    desc: '縮小自我 (i)，釋放團隊能量 (Power)。',
    extended: '這裡你會學習如何把理念轉化為行動，讓你的每一份努力都成為團隊前進的力量。',
    tips: ['用行動說話', '帶動正向氛圍', '讓成果被看見'],
    active: false
  }
])

const activePower = computed(() => powers.value.find(item => item.active) || null)

const confettiColors = [
  ['#234d74', '#5f87a8', '#ffd700'],
  ['#38bdf8', '#7c3aed', '#f97316'],
  ['#16a34a', '#22c55e', '#14b8a6'],
  ['#f97316', '#fb7185', '#facc15'],
  ['#0f766e', '#22d3ee', '#a5f3fc']
]

const triggerFirework = (index, event) => {
  const target = powers.value[index]
  const willActivate = !target.active
  powers.value.forEach((item, currentIndex) => {
    item.active = willActivate && currentIndex === index
  })

  if (willActivate) {
    const rect = event.currentTarget.getBoundingClientRect()
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: confettiColors[index]
    })
  }
}
</script>

<style scoped>
/* ==========================================
   1. 基礎佈局與 Hero 區塊
   ========================================== */
.home-view { background: #ffffff; overflow-x: hidden; }
.hero { position: relative; background: #091321; padding: 120px 0 140px; overflow: hidden; }
.glow-1 { width: 550px; height: 550px; background: rgba(35, 77, 116, 0.7); top: -15%; left: -10%; }
.glow-2 { width: 450px; height: 450px; background: rgba(138, 99, 210, 0.45); bottom: 5%; right: -5%; animation-delay: -5s; }
.glow-3 { width: 350px; height: 350px; background: rgba(45, 212, 191, 0.4); top: 25%; left: 35%; animation-delay: -10s; }
@keyframes floatGlow { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, -60px) scale(1.1); } }
.relative-z { position: relative; z-index: 10; }
.hero-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; }
.hero-visual { display: flex; justify-content: center; align-items: center; width: 100%; }
.glass-morphism { width: 100%; max-width: 360px; padding: 40px 28px; border-radius: 28px; text-align: center; background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.25); border-top: 1px solid rgba(255, 255, 255, 0.45); border-left: 1px solid rgba(255, 255, 255, 0.45); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3); }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 24px; }
.hero-btn-primary { background: white; color: #0b1727; font-weight: 800; padding: 14px 28px; border-radius: 999px; }
.hero-btn-secondary { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 14px 28px; border-radius: 999px; }
.hero-points { display: flex; flex-wrap: wrap; gap: 10px; }
.hero-point { background: rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 999px; font-size: 0.9rem; margin-right: 10px;}
.hero-emoji { font-size: 4.2rem; margin-bottom: 14px; }

/* ==========================================
   2. 最新活動區塊
   ========================================== */
.latest-event-block { padding: 40px 0 80px; position: relative; z-index: 20; }
.latest-card { display: grid; grid-template-columns: 1fr 1fr; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(23, 50, 76, 0.12); border: 1px solid rgba(221, 228, 236, 0.8); align-items: center; }
.latest-visual { width: 100%; height: 100%; display: flex; background: #f1f5f9; }
.latest-img { width: 100%; height: 100%; max-height: 600px; object-fit: contain; object-position: center; }
.latest-content { padding: 60px 50px; }
.latest-badge { display: inline-flex; align-items: center; gap: 10px; background: #fff0f0; color: #e53e3e; padding: 8px 18px; border-radius: 999px; font-weight: 800; font-size: 0.95rem; margin-bottom: 24px; }
.pulse-dot { width: 8px; height: 8px; background: #e53e3e; border-radius: 50%; animation: pulse-dot 1.5s infinite; }
.latest-title { font-size: clamp(2.2rem, 4vw, 3.2rem); color: var(--primary-dark); font-weight: 900; margin-bottom: 16px; line-height: 1.2; }
.latest-summary { font-size: 1.15rem; color: var(--muted); line-height: 1.8; margin-bottom: 32px; }
.latest-meta, .latest-meta-box { display: flex; flex-direction: column; gap: 14px; margin-bottom: 40px; font-size: 1.05rem; color: var(--primary-dark); font-weight: 600; background: #f8fbff; padding: 24px; border-radius: 16px; border: 1px solid #e2eef9; }
.meta-row { display: flex; align-items: flex-start; gap: 12px; line-height: 1.5; }
.latest-btn { display: inline-flex; align-items: center; gap: 10px; background: var(--primary-dark); color: white; padding: 16px 36px; border-radius: 999px; font-size: 1.1rem; font-weight: 800; transition: all 0.3s ease; }
.latest-btn:hover { background: var(--primary); transform: translateY(-4px); box-shadow: 0 12px 24px rgba(23, 50, 76, 0.2); }
@keyframes pulse-dot { 0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.5); } 70% { box-shadow: 0 0 0 8px rgba(229, 62, 62, 0); } 100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); } }

/* ==========================================
   3. 我們在做什麼 & 五大能力
   ========================================== */
.info-card { padding: 32px 24px; }
.intro-icon-wrap { width: 56px; height: 56px; background: linear-gradient(135deg, #eef3f8, #dce8f5); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(35, 77, 116, 0.05); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.info-card:hover .intro-icon-wrap { transform: translateY(-6px) rotate(-8deg) scale(1.1); background: var(--primary-light); box-shadow: 0 8px 20px rgba(35, 77, 116, 0.12); }
.info-card h3 { margin: 12px 0 12px; color: var(--primary-dark); font-size: 1.35rem; }
.desc { color: var(--muted); line-height: 1.85; font-size: 0.98rem; }
.section-join-process { padding: 80px 0; }
.join-grid { margin-top: 32px; }
.join-step-card { text-align: left; border-radius: 24px; padding: 32px 28px; background: #ffffff; border: 1px solid rgba(221, 228, 236, 0.7); }
.step-badge { display: inline-flex; align-items: center; justify-content: center; width: 92px; height: 34px; border-radius: 999px; background: rgba(35, 77, 116, 0.08); color: var(--primary-dark); font-weight: 700; margin-bottom: 18px; }
.join-step-card h3 { margin-bottom: 16px; font-size: 1.18rem; }
.join-cta { margin-top: 32px; text-align: center; }
.power-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-top: 40px; }
.power-card { text-align: center; border-radius: 24px; cursor: pointer; padding: 32px 20px; background: #ffffff; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05); border: 1px solid rgba(221, 228, 236, 0.7); transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease; position: relative; overflow: hidden; }
.power-card::before { content: ''; position: absolute; inset: 0; border-radius: 24px; opacity: 0; pointer-events: none; transition: opacity 0.35s ease; box-shadow: inset 0 0 0 2px rgba(35, 77, 116, 0.08); }
.power-card:hover { transform: translateY(-6px); box-shadow: 0 18px 32px rgba(0, 0, 0, 0.12); }
.power-card.is-active { transform: translateY(-8px); border-color: rgba(35, 77, 116, 0.22); box-shadow: 0 22px 38px rgba(35, 77, 116, 0.14); }
.power-card.is-active::before { opacity: 1; }
.power-icon-wrap { width: 70px; height: 70px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.06); transition: transform 0.25s ease, box-shadow 0.25s ease; }
.power-card:hover .power-icon-wrap,
.power-card.is-active .power-icon-wrap { transform: scale(1.05); box-shadow: 0 10px 24px rgba(0,0,0,0.09); }
.power-icon { font-size: 1.9rem; }
.power-name { font-weight: 800; color: #17324c; margin-bottom: 10px; display: block; }
.power-detail { max-height: 0; opacity: 0; overflow: hidden; transition: all 0.35s ease; }
.power-detail.show { max-height: 160px; opacity: 1; margin-top: 18px; border-top: 1px dashed #eee; padding-top: 16px; }
.power-summary-panel { margin-top: 32px; }
.power-summary-card { padding: 28px 30px; border-radius: 24px; border: 1px solid rgba(221, 228, 236, 0.75); background: #ffffff; box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06); }
.power-summary-heading { display: flex; align-items: center; gap: 18px; margin-bottom: 20px; }
.power-summary-icon { width: 56px; height: 56px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(35, 77, 116, 0.08); color: #17324c; font-size: 1.7rem; }
.power-summary-label { display: block; font-size: 0.85rem; color: var(--accent); letter-spacing: 0.08em; margin-bottom: 4px; }
.power-summary-card h3 { margin: 0; font-size: 1.65rem; color: var(--primary-dark); }
.power-summary-text { margin: 16px 0 0; line-height: 1.85; color: var(--muted); }
.power-summary-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
.power-tag { padding: 10px 14px; border-radius: 999px; background: rgba(35, 77, 116, 0.08); color: var(--primary-dark); font-size: 0.92rem; font-weight: 700; }
.hint-text { font-size: 0.85rem; color: var(--accent); animation: bounce 2s infinite; display: inline-block; margin-top: 10px; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

/* ==========================================
   4. 精彩活動回顧 & CTA 區塊
   ========================================== */
.section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; }
.head-titles { text-align: left; }
.head-titles .title { margin-bottom: 8px; }
.head-titles .subtitle { margin-bottom: 0; color: var(--muted); }
.home-image-card { border-radius: 24px; overflow: hidden; position: relative; display: block; text-decoration: none;}
.home-image { width: 100%; height: 260px; object-fit: cover; transition: transform 0.5s ease; }
.home-image-card:hover .home-image { transform: scale(1.08); }
.image-overlay { position: absolute; bottom: 0; width: 100%; padding: 50px 20px 24px; background: linear-gradient(to top, rgba(9, 19, 33, 0.95) 0%, rgba(9, 19, 33, 0.5) 60%, transparent 100%); color: white; }
.image-overlay h3 { margin: 0 0 6px; font-size: 1.15rem; color: white; font-weight: 800; }
.image-overlay p { margin: 0; font-size: 0.92rem; line-height: 1.6; color: rgba(255, 255, 255, 0.85); display: -webkit-box; -line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* 輪播樣式 */
.carousel { position: relative; border-radius: 24px; overflow: hidden; }
.carousel-controls { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; z-index: 10; }
.carousel-controls .btn { width: 40px; height: 40px; padding: 0; border-radius: 50%; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.3); color: white; font-size: 1.4rem; cursor: pointer; transition: all 0.3s ease; }
.carousel-controls .btn:hover { background: rgba(0, 0, 0, 0.8); border-color: rgba(255, 255, 255, 0.6); transform: scale(1.1); }

.mesh-gradient-warm { background: radial-gradient(at 50% 100%, #e8edf3 0%, transparent 50%), #fcfdfd; }
.relative-overflow { position: relative; overflow: hidden; }
.cta-watermark { position: absolute; font-size: 15rem; opacity: 0.03; z-index: 1; top: -20px; left: 5%; transform: rotate(-15deg); pointer-events: none; }
.cta-watermark-2 { font-size: 10rem; top: auto; bottom: 20px; left: auto; right: 10%; transform: rotate(10deg); }
.cta-inner { text-align: center; max-width: 780px; margin: 0 auto; padding: 80px 0; }
.cta-badge { background: var(--primary-light) !important; color: var(--primary-dark) !important; }
.cta-title { font-size: clamp(2.2rem, 4vw, 3rem); margin-bottom: 16px; }
.cta-subtitle { font-size: 1.1rem; color: var(--muted); margin-bottom: 0; }
.cta-actions { display: flex; justify-content: center; gap: 16px; margin-top: 32px; }
.cta-btn-outline { background: transparent; border: 2px solid var(--primary-dark); color: var(--primary-dark); }
.cta-btn-outline:hover { background: var(--primary-light); }

.desktop-only { display: inline-flex; }
.mobile-only { display: none; }
.home-action { text-align: center; margin-top: 28px; }

/* ==========================================
   5. RWD 響應式設定
   ========================================== */
@media (max-width: 1000px) {
  .hero-layout { grid-template-columns: 1fr; text-align: center; }
  .hero-text { margin: 0 auto 30px; }
  .hero-actions, .hero-points { justify-content: center; }
  .hero-visual { margin-top: 40px; }
  .power-grid { grid-template-columns: repeat(2, 1fr); }
  .section-head { flex-direction: column; align-items: flex-start; gap: 16px;}
  .desktop-only { display: none; }
  .mobile-only { display: inline-flex; }
}
@media (max-width: 960px) {
  .latest-card { grid-template-columns: 1fr; }
  .latest-img { max-height: 400px; }
  .latest-content { padding: 40px 30px; }
  .latest-event-block { margin-top: -20px; }
}
@media (max-width: 700px) {
  .power-grid { grid-template-columns: 1fr; }
}
</style>