<template>
  <div class="faq-view">
    <section class="hero faq-hero">
      <div class="ambient-glow glow-1"></div>
      <div class="page hero-inner relative-z">
        <span class="hero-badge fade-in">FAQ</span>
        <h1 class="hero-title fade-in">常見問題</h1>
        <p class="hero-text fade-in">
          還有什麼好奇的嗎？看看大家常問的問題，或是直接私訊我們！
        </p>
      </div>
    </section>

    <section class="section ip-bg-blue">
      <div class="page faq-layout">
        <div class="card ip-glass-card faq-card fade-in">
          <div class="faq-list">
            <div 
              v-for="(item, index) in faqs" 
              :key="index" 
              class="faq-item"
              :class="{ 'is-open': item.isOpen }"
            >
              <button class="faq-question" @click="toggleFaq(index)">
                <span>{{ item.q }}</span>
                <span class="faq-icon">{{ item.isOpen ? '−' : '+' }}</span>
              </button>
              <div class="faq-answer">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-contact fade-in">
          <p>沒找到你想問的嗎？</p>
          <a href="https://instagram.com" target="_blank" class="btn hero-btn-secondary faq-btn">
            直接私訊 IG 小編
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  { 
    q: '需要有經驗才能加入嗎？',
    a: '不需要！我們歡迎任何想學習與成長的人。',
    isOpen: false 
  },
  { 
    q: '活動會很頻繁嗎？',
    a: '平均一到兩週會有活動，彈性參加即可。',
    isOpen: false 
  },
  { 
    q: '參加活動需要繳費嗎？',
    a: '視活動而定，但絕大多數活動費用不高甚至免費~。',
    isOpen: false 
  },
  { 
    q: '大一新生可以加入嗎？',
    a: '當然可以！我們非常歡迎新生加入。',
    isOpen: false 
  },
  { 
    q: '互動牆裡有什麼內容？',
    a: '你可以在互動牆看到 iPower 的活動精選、微笑牆分享與社員的心得內容。',
    isOpen: false 
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
/* Hero 專屬樣式 */
.faq-hero {
  position: relative; background: #091321; padding: 100px 0; overflow: hidden; text-align: center;
}
.glow-1 { width: 400px; height: 400px; background: rgba(138, 99, 210, 0.4); top: -10%; left: 30%; }

/* FAQ 區塊佈局 */
.faq-layout {
  max-width: 800px;
  margin: 0 auto;
}

.faq-card {
  padding: 10px 30px;
}

/* 摺疊面板互動設計 */
.faq-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  background: none;
  border: none;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary-dark);
  cursor: pointer;
  text-align: left;
  transition: color 0.3s;
  font-family: inherit;
}
.faq-question:hover {
  color: var(--primary);
}

.faq-icon {
  font-size: 1.5rem;
  color: var(--primary);
  font-weight: 300;
  transition: transform 0.3s;
}

/* 答案區塊動畫隱藏/顯示 */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
  opacity: 0;
}
.faq-answer p {
  padding-bottom: 24px;
  margin: 0;
  line-height: 1.8;
  color: var(--muted);
  font-size: 1rem;
}

.faq-item.is-open .faq-answer {
  max-height: 300px; /* 給一個足夠的高度讓它展開 */
  opacity: 1;
}
.faq-item.is-open .faq-icon {
  transform: rotate(180deg);
}

/* 底部 CTA */
.faq-contact {
  text-align: center;
  margin-top: 40px;
  color: var(--muted);
}
.faq-btn {
  display: inline-block;
  background: white;
  color: var(--primary-dark);
  border: 2px solid var(--primary-dark);
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  margin-top: 12px;
  transition: all 0.2s;
}
.faq-btn:hover {
  background: var(--primary-dark);
  color: white;
  transform: translateY(-2px);
}
</style>