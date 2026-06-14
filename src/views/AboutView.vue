<template>
  <div class="about-page">
    <section class="hero about-hero">
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>
      <div class="page hero-inner relative-z">
        <span class="hero-badge fade-in">Our Story</span>
        <h1 class="hero-title fade-in">iPower 的故事</h1>
        <p class="hero-text fade-in">
          不只是一個社團，而是一群人決定一起發光的旅程。
        </p>
      </div>
    </section>

    <section class="section ip-bg-soft">
      <div class="page split-layout">
        <div class="card ip-glass-card fade-in">
          <span class="ip-badge">創立初衷</span>
          <h2 class="section-title">為什麼要有 iPower？</h2>
          <p class="desc">
            在大學這個充滿可能的階段，我們發現許多人擁有才華，卻缺少一個能夠安心嘗試、甚至允許失敗的舞台。
          </p>
          <p class="desc">
            iPower應運而生。我們希望打造一個「以人為本」的環境，將小寫的「i」縮小，象徵放下自傲與成見；將「Power」放大，象徵當我們彼此連結時，能產生無可限量的團隊能量，彼此成長扶持，走向更遠的路。
          </p>
          <p class="desc">
            每一次活動不是單純的節目，而是一個讓你看見「我可以比我想像中更有影響力」的練習場。從迎新、跨校協作、微笑營會到短劇展演，我們相信，真實的力量來自於「我」成為「我們」之後的增幅。
          </p>
        </div>
        
        <div class="image-wrapper fade-in">
          <img src="@/assets/pub/remind.jpg" alt="團隊合作" class="about-img" />
        </div>
      </div>
    </section>

    <section class="section about-core ip-bg-soft">
      <div class="page">
        <canvas ref="particleCanvas" class="particle-canvas"></canvas>
        <div class="story-highlight fade-in">
          <span class="eyebrow">核心真諦</span>
          <h2>若把i縮小，Power就會擴大</h2>
          <p>
            這是iPower社的靈魂：「把自我縮小」，我們不追求個人焦點，而是讓每一次傾聽、每一次協作、每一次回饋，成為整個團隊向前的力量。
            這裡的每個人都能把自己的「我」變成能夠連結他人的力量，讓校園、社區與夥伴的影響持續擴散。
          </p>
        </div>

        <div class="core-grid">
          <div v-for="(p, idx) in principles" :key="p.id" class="card principle-card fade-in" :class="{ 'is-active': activePrinciple === idx }" @click="triggerPrinciple(idx, $event)">
            <div class="principle-badge">{{ idx + 1 }}</div>
            <h3>{{ p.title }}</h3>
            <p class="desc">{{ p.short }}</p>
          </div>
        </div>

        <div v-if="activePrinciple !== null" class="principle-summary-panel fade-in">
          <div class="principle-summary-card">
            <div class="principle-summary-heading">
              <span class="principle-summary-icon">{{ principles[activePrinciple].icon }}</span>
              <div>
                <p class="principle-summary-label">已展開原則</p>
                <h3>{{ principles[activePrinciple].title }}</h3>
              </div>
            </div>
            <p class="principle-summary-text">{{ principles[activePrinciple].extended }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section ip-bg-blue">
      <div class="page">
        <div class="section-head-center">
          <h2 class="title">我們的願景與足跡</h2>
          <p class="subtitle">從校園出發，讓正向影響力持續擴散。</p>
        </div>

        <div class="grid grid-3">
          <div class="card ip-glass-card fade-in">
            <div class="vision-icon">🌱</div>
            <h3>扎根校園</h3>
            <p class="desc">透過例行社課與小型專案，為社員打下紮實的企劃與溝通基礎，建立像家一樣的歸屬感。</p>
          </div>
          
          <div class="card ip-glass-card fade-in">
            <div class="vision-icon">🤝</div>
            <h3>跨校連結</h3>
            <p class="desc">打破學校的藩籬，積極參與跨校聯合迎新與幹部訓練，擴展人脈與視野。</p>
          </div>

          <div class="card ip-glass-card fade-in">
            <div class="vision-icon">🌟</div>
            <h3>社會影響</h3>
            <p class="desc">走出舒適圈，將團隊能量轉化為實際的服務行動，用生命影響生命，用見證複製見證。</p>
          </div>
        </div>
        <div class="value-pill-row fade-in">
          <span class="value-pill">包容</span>
          <span class="value-pill">共好</span>
          <span class="value-pill">實作</span>
          <span class="value-pill">成長</span>
          <span class="value-pill">回饋</span>
        </div>
      </div>
    </section>

    <section class="section stories-section">
      <div class="page">
        <div class="section-head-center">
          <h2 class="title">社員之感恩的話</h2>
          <p class="subtitle">來自社員的小聲道謝與真誠分享&簡摘</p>
        </div>

        <div class="stories-grid">
          <div v-for="s in stories.slice(0,3)" :key="s.id" class="story-card fade-in card">
            <div class="story-media">
              <img :src="s.image" :alt="s.author" />
            </div>
            <div class="story-body">
              <h4 class="story-author">{{ s.author }}</h4>
              <p class="story-excerpt">{{ s.excerpt }}</p>
              <div class="story-meta"><small>{{ s.date }}</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-block">
      <div class="page cta-inner fade-in">
        <h2 class="title">想認識這群熱血的夥伴嗎？</h2>
        <p class="subtitle">來看看是誰在背後支撐著 iPower 的每一次活動！</p>
        <div class="cta-actions">
          <router-link to="/staff" class="btn hero-btn-primary">認識社團幹部</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import confetti from 'canvas-confetti'
import { stories } from '@/data/stories'

const principles = ref([
  {
    id: 1,
    icon: '🧏',
    title: '謙卑聆聽',
    short: '當我們把「自我」縮小，才有空間聽見他人的故事。',
    extended: '謙卑聆聽讓團隊成員有安全感，能勇於表達與嘗試。用傾聽建立信任，為合作創造無限可能。'
  },
  {
    id: 2,
    icon: '🤝',
    title: '共同承擔',
    short: '每一道任務都是大家一起做；不論歡樂或困難，我們都學著把責任與成果彼此分享。',
    extended: '共同承擔意味著分工與支持，當失敗來臨時我們不推諉，而是一起面對與學習，讓成長更穩固。'
  },
  {
    id: 3,
    icon: '🌍',
    title: '影響力循環',
    short: '從迎新、跨校解謎、溫馨營會到家庭短劇，iPower 的每一步都是在把內部能量轉化成外部溫度。',
    extended: '我們相信每一次付出都是種播種──把關懷、技巧與溫度帶到諸多校園與社區，讓影響力成為可被看見的改變。'
  }
])

const activePrinciple = ref(null)

const confettiColors = [
  ['#234d74', '#5f87a8', '#ffd700'],
  ['#38bdf8', '#7c3aed', '#f97316'],
  ['#16a34a', '#22c55e', '#14b8a6']
]

function triggerPrinciple(index, event) {
  const willActivate = activePrinciple.value === index ? null : index
  activePrinciple.value = willActivate

  if (willActivate !== null) {
    const rect = event.currentTarget.getBoundingClientRect()
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: confettiColors[index % confettiColors.length]
    })
  }
}

// -----------------------------
// Particle 背景（互動式）
// -----------------------------
  const particleCanvas = ref(null)
let ctx = null
let particles = []
let animationId = null
  let containerEl = null
const mouse = { x: -9999, y: -9999 }

function rand(min, max) { return Math.random() * (max - min) + min }

function initParticles(width, height) {
  particles = []
  const base = Math.round((width * height) / 40000)
  for (let i = 0; i < Math.max(30, base); i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: rand(-0.3, 0.3),
      vy: rand(-0.15, 0.15),
      size: rand(1, 3),
      life: Infinity,
      hue: rand(190, 220)
    })
  }
}

function resizeCanvas() {
  const c = particleCanvas.value
  if (!c) return
  const dpr = window.devicePixelRatio || 1
  const w = Math.max(1, Math.floor(window.innerWidth * dpr))
  const h = Math.max(1, Math.floor(window.innerHeight * dpr))
  c.width = w
  c.height = h
  c.style.width = window.innerWidth + 'px'
  c.style.height = window.innerHeight + 'px'
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function step() {
  const c = particleCanvas.value
  if (!c || !ctx) return
  const w = c.width / (window.devicePixelRatio || 1)
  const h = c.height / (window.devicePixelRatio || 1)
  ctx.clearRect(0, 0, w, h)

  // update and draw
  for (let p of particles) {
    // slight attraction to mouse
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) {
      const force = (1 - dist / 120) * 0.06
      p.vx += dx * force * 0.001
      p.vy += dy * force * 0.001
    }

    p.x += p.vx
    p.y += p.vy

    // wrap
    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10
    if (p.y < -10) p.y = h + 10
    if (p.y > h + 10) p.y = -10

    ctx.beginPath()
    ctx.fillStyle = `hsla(${p.hue},60%,60%,0.9)`
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }

  animationId = requestAnimationFrame(step)
}

function createBurst(x, y, count = 30) {
  const c = particleCanvas.value
  if (!c) return
  const w = c.width / (window.devicePixelRatio || 1)
  const h = c.height / (window.devicePixelRatio || 1)
  for (let i = 0; i < count; i++) {
    const speed = rand(1, 4)
    const angle = rand(0, Math.PI * 2)
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed * 0.6,
      vy: Math.sin(angle) * speed * 0.6,
      size: rand(1.5, 4),
      life: 80,
      hue: rand(20, 280)
    })
  }
}

onMounted(() => {
  const c = particleCanvas.value
  if (!c) return
  ctx = c.getContext('2d')
  // full-page background: use viewport size and window events
  containerEl = document.body

  resizeCanvas()
  initParticles(c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1))
  step()

  const onResize = () => {
    resizeCanvas()
    initParticles(c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1))
  }

  const onMove = (ev) => {
    mouse.x = ev.clientX
    mouse.y = ev.clientY
  }
  const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
  const onClick = (ev) => {
    createBurst(ev.clientX, ev.clientY, 40)
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseout', onLeave)
  window.addEventListener('click', onClick)

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseout', onLeave)
    window.removeEventListener('click', onClick)
  })
})
</script>

<style scoped>
/* ==========================================
   因為使用了main.css的共用樣式，
   只要寫About專屬的排版微調即可~~
   ========================================== */

/* Hero 區塊專屬設定 */
.about-hero {
  position: relative; background: #091321; padding: 120px 0 100px; overflow: hidden; text-align: center;
}
.glow-1 { width: 450px; height: 450px; background: rgba(35, 77, 116, 0.6); top: -10%; left: 10%; }
.glow-2 { width: 350px; height: 350px; background: rgba(138, 99, 210, 0.4); bottom: -10%; right: 10%; }

/* 左右圖文排版 */
.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.section-title {
  font-size: 2rem;
  color: var(--primary-dark);
  margin-bottom: 20px;
}

.desc {
  color: var(--muted);
  line-height: 1.8;
  font-size: 1.05rem;
  margin-bottom: 16px;
}

.image-wrapper {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 願景區塊專屬 */
.section-head-center { text-align: center; margin-bottom: 40px; }
.section-head-center .title { font-size: 2.2rem; margin-bottom: 12px; color: var(--primary-dark); }
.section-head-center .subtitle { color: var(--muted); font-size: 1.1rem; }

.vision-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

/* 關鍵原則區塊 */
.about-core { padding-top: 40px; padding-bottom: 40px; }
.story-highlight {
  max-width: 940px;
  margin: 0 auto 40px;
  padding: 32px 32px 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(35, 77, 116, 0.12);
  box-shadow: 0 24px 48px rgba(23, 50, 76, 0.08);
}
.story-highlight .eyebrow {
  display: inline-flex;
  margin-bottom: 16px;
  color: var(--primary);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.82rem;
}
.story-highlight h2 {
  font-size: clamp(2rem, 3.4vw, 2.6rem);
  margin-bottom: 18px;
  color: var(--primary-dark);
}
.story-highlight p {
  color: var(--muted);
  line-height: 1.9;
  font-size: 1rem;
}
.core-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
.principle-card {
  border-radius: 24px;
  padding: 28px 24px;
  background: #ffffff;
  border: 1px solid rgba(221, 228, 236, 0.75);
  box-shadow: 0 16px 34px rgba(23, 50, 76, 0.06);
}
.principle-badge {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(35, 77, 116, 0.12);
  color: var(--primary-dark);
  font-weight: 900;
  margin-bottom: 18px;
}
.principle-card {
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}
.principle-card.is-active {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(35,77,116,0.12);
  border-color: rgba(35,77,116,0.18);
}
.principle-summary-panel { margin-top: 28px; }
.principle-summary-card {
  padding: 24px 26px;
  border-radius: 20px;
  border: 1px solid rgba(221,228,236,0.75);
  background: #fff;
  box-shadow: 0 18px 36px rgba(23,50,76,0.06);
}
.principle-summary-heading { display:flex; align-items:center; gap:16px; margin-bottom:12px; }
.principle-summary-icon { width:56px; height:56px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:rgba(35,77,116,0.08); color:var(--primary-dark); font-size:1.6rem; }
.principle-summary-label { display:block; font-size:0.85rem; color:var(--accent); letter-spacing:0.06em; margin-bottom:4px; }
.principle-summary-text { color:var(--muted); line-height:1.8; }
.value-pill-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.value-pill {
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(35, 77, 116, 0.1);
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 0.95rem;
}

/* CTA 區塊 */
.cta-block { background: var(--primary-light); text-align: center; padding: 80px 0; }
.cta-inner .title { font-size: 2rem; color: var(--primary-dark); margin-bottom: 12px; }
.cta-inner .subtitle { color: var(--muted); margin-bottom: 24px; }
.hero-btn-primary { background: var(--primary-dark); color: white; padding: 14px 28px; border-radius: 999px; font-weight: 800; display: inline-block; text-decoration: none; transition: transform 0.2s;}
.hero-btn-primary:hover { transform: translateY(-3px); }

/* RWD */
@media (max-width: 900px) {
  .about-hero {
    padding: 92px 0 72px;
  }

  .split-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .image-wrapper {
    order: -1;
    border-radius: 18px;
  }

  .core-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .story-highlight {
    padding: 22px 18px;
    border-radius: 20px;
  }

  .story-highlight h2 {
    font-size: clamp(1.5rem, 8vw, 2rem);
  }

  .stories-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .story-card {
    flex-direction: column;
    align-items: stretch;
  }

  .story-media img {
    width: 100%;
    height: 140px;
  }

  .cta-inner {
    padding: 0 4px;
  }

  .cta-inner .title {
    font-size: 1.4rem;
  }
}

@media (max-width: 640px) {
  .about-hero {
    padding: 80px 0 60px;
  }

  .section-head-center .title {
    font-size: 1.5rem;
  }

  .section-head-center .subtitle,
  .story-highlight p,
  .desc {
    font-size: 0.98rem;
    line-height: 1.7;
  }

  .value-pill-row {
    gap: 8px;
  }

  .value-pill {
    width: 100%;
    text-align: center;
  }
}

/* Particle canvas: fixed full-page, non-interactive to DOM events */
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: block;
}

/* Ensure About content renders above the canvas */
.about-page {
  position: relative;
  z-index: 1;
}

/* Stories section */
.stories-section { padding: 60px 0; }
.stories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
.story-card { overflow: hidden; display:flex; gap:16px; align-items:flex-start; padding:16px; border-radius:12px; }
.story-media img { width:96px; height:96px; object-fit:cover; border-radius:12px; display:block; }
.story-body { flex:1 }
.story-author { margin:0 0 6px 0; font-size:1.05rem; color:var(--primary-dark); }
.story-excerpt { margin:0 0 8px 0; color:var(--muted); }
.story-meta { color:var(--muted); font-size:0.85rem }

@media (max-width: 900px) {
  .stories-grid { grid-template-columns: 1fr; }
  .story-media img { width:72px; height:72px }
}
</style>