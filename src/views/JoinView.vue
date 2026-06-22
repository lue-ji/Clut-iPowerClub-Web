<template>
  <div class="join-view">
    <section class="hero join-hero">
      <div class="ambient-glow glow-1"></div>
      <div class="ambient-glow glow-2"></div>
      <div class="page join-hero-inner relative-z">
        <span class="hero-badge tech-badge fade-in">ACCESS GRANTED</span>
        <h1 class="hero-title tech-title fade-in">SYSTEM.JOIN(iPower)</h1>
        <p class="hero-text fade-in">
          恭喜通過系統潛力測試。<br>未來的大神，請在此建立你的專屬檔案，我們將盡快為你開通權限。
        </p>
      </div>
    </section>

    <section class="section ip-bg-soft">
      <div class="page join-layout">
        
        <div class="card ip-glass-card benefit-card fade-in">
          <span class="ip-badge tech-highlight">UNLOCKED PRIVILEGES</span>
          <h2 class="tech-heading">已解鎖的核心權限</h2>

          <ul class="benefit-list tech-list">
            <li><span class="check-icon">✔️</span> 認識跨領域的頂尖神隊友</li>
            <li><span class="check-icon">✔️</span> 參與大型營隊與實戰活動</li>
            <li><span class="check-icon">✔️</span> 提升表達與溝通的高階技巧</li>
            <li><span class="check-icon">✔️</span> 培養領導力與團隊影響力</li>
            <li><span class="check-icon">✔️</span> 系統穩定供應：超多美食點心</li>
            <li><span class="check-icon">✔️</span> 隨機掉落裝備：手工特製甜點</li>
            <li><span class="check-icon">✔️</span> 核心氛圍：充滿卡娜赫拉 & 歡笑</li>
            <li><span class="check-icon">✔️</span> 無限桌遊，任君挑選</li>
          </ul>

          <div class="pricing-ticket relative-overflow">
            <div class="ticket-watermark">🎟️</div>
            <div class="ticket-watermark watermark-2">✨</div>

            <p class="pricing-label">當前系統開通費用</p>
            
            <div class="price-display">
              <div class="price-original">
                <span>原價</span>
                <span class="strike-through">$200</span>
              </div>
              <div class="price-early-bird">
                <span class="currency">$</span>
                <span class="amount">{{ currentFee }}</span>
              </div>
            </div>
           
            <div class="early-bird-tag" v-if="isEarlyBird">
              🔥 早鳥優惠熱烈開放中，先搶先贏！
            </div>
          </div>
        </div>

        <div class="card ip-glass-card form-card fade-in">
          <div class="form-head">
            <h2 class="tech-heading">建立成員檔案</h2>
            <p>資料加密傳輸中... 我們收到後會盡快與你聯繫。<br>也歡迎附上照片分享你通過測試的喜悅！</p>
          </div>

          <form @submit.prevent="submitForm" class="join-form">
            <div class="field">
              <label>怎麼稱呼你？ (代號/暱稱)</label>
              <input class="text-input" v-model="form.name" placeholder="例如：小杰" required />
            </div>

            <div class="field">
              <label>所屬系級</label>
              <input class="text-input" v-model="form.department" placeholder="例如：資管二A" />
            </div>

            <div class="field">
              <label>通訊協定 (聯絡方式)</label>
              <input class="text-input" v-model="form.contact" placeholder="@IG/LineID/電話" required />
            </div>

            <div class="field">
              <label>想對核心團隊說的話 (選填)</label>
              <textarea class="text-input" v-model="form.text" placeholder="分享一下剛才玩小遊戲的心得，或是對社團的期待吧！" rows="3"></textarea>
            </div>

            <div class="field">
              <label>上傳個人識別影像 (選填)</label>
              <div class="image-upload-wrap">
                <input type="file" accept="image/* "@change="handleFileChange" id="file-input" class="file-input" />
                <div v-if="imagePreview" class="preview-box">
                  <img :src="imagePreview" class="img-preview" />
                  <button type="button" @click="removeImage" class="remove-btn">✕</button>
                </div>
                <label v-else for="file-input" class="upload-placeholder">
                  <span>📸 點擊拍照或選擇照片</span>
                </label>
              </div>
            </div>

            <button class="btn submit-btn tech-submit" type="submit" :disabled="loading">
              {{ loading ? '資料傳輸中...' : '📡 確認送出檔案' }}
            </button>

            <p v-if="error" class="error">{{ error }}</p>
          </form>

          <p v-if="submitted" class="success">
            🎉 已成功寫入系統！我們會盡快私訊你～
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { postMessage } from '../api/message'
import Swal from 'sweetalert2' 

const form = ref({ name: '', department: '', contact: '', text: '', image: '' })
const imagePreview = ref(null)
const submitted = ref(false)
const loading = ref(false)
const error = ref(null)

const DEADLINE = new Date('2026-09-28T23:00:00')
const EARLY_EARLY_DATE = new Date('2026-09-25T19:30:00')

const now = ref(new Date())
let timerId = null

const isEarlyBird = computed(() => now.value < DEADLINE)
const currentFee = computed(() => {
  if (now.value < EARLY_EARLY_DATE) return 100
  if (now.value < DEADLINE) return 150
  return 200
})

onMounted(() => {
  timerId = setInterval(() => {
    now.value = new Date()
  }, 60000)
})
onUnmounted(() => clearInterval(timerId))

const MAX_IMAGE_BYTES = 2 * 1024 * 1024

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > MAX_IMAGE_BYTES) {
    error.value = '圖片請小於 2MB，請換一張再試。'
    e.target.value = ''
    return
  }
  error.value = null
  imagePreview.value = URL.createObjectURL(file)
  const reader = new FileReader()
  reader.onload = (res) => { form.value.image = res.target.result }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  imagePreview.value = null
  form.value.image = ''
  document.getElementById('file-input').value = ''
}

const submitForm = async () => {
  try {
    loading.value = true
    error.value = null
    const token = import.meta.env.VITE_JOIN_FORM_TOKEN
    if (!token) {
      throw new Error('系統尚未設定報名驗證，請稍後再試或聯繫幹部。')
    }

    const result = await postMessage({
      ...form.value,
      token,
      type: form.value.text || form.value.image ? 'story' : 'join',
    })

    if (result.status === 'success') {
      submitted.value = true
      Swal.fire({
        title: '🎉 權限開通申請成功！',
        text: '已收到您的檔案，近期會再透過IG或Line與你聯繫~~~',
        icon: 'success',
        confirmButtonColor: '#234d74', 
        confirmButtonText: 'Fantastic!',
        background: 'rgba(255, 255, 255, 0.9)',
        backdrop: `rgba(9, 19, 33, 0.6)` 
      })

      form.value = { name: '', department: '', contact: '', text: '', image: '' }
      imagePreview.value = null
      document.getElementById('file-input').value = ''
    }
  } catch (err) {
    error.value = err.message || '送出失敗，請稍後再試。'
    Swal.fire({
      title: '哎呀！傳輸中斷啦~',
      text: error.value,
      icon: 'error',
      confirmButtonColor: '#c0392b'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 載入與 Minigame 相同的科技字體 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Share+Tech+Mono&family=Space+Grotesk:wght@500;700&display=swap');

/* --- 新增的科技感樣式 --- */
.tech-badge {
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 3px;
  color: #22D3EE;
  background: rgba(34, 211, 238, 0.1) !important;
  border: 1px solid rgba(34, 211, 238, 0.4) !important;
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
}

.tech-title {
  font-family: 'Space Grotesk', 'Noto Sans TC', sans-serif;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #fff, #22D3EE);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
}

.tech-heading {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 900 !important;
  letter-spacing: 1px;
}

.tech-highlight {
  background: linear-gradient(90deg, #A855F7, #22D3EE);
  color: white !important;
  padding: 4px 12px;
  border-radius: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.tech-list li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.check-icon {
  color: #10b981;
  font-size: 1.1rem;
}

/* 脈衝發光按鈕 (呼應招募漏斗) */
.tech-submit {
  background: linear-gradient(90deg, #234d74, #1a365d) !important;
  box-shadow: 0 0 15px rgba(35, 77, 116, 0.4);
  font-family: 'Noto Sans TC', sans-serif;
  letter-spacing: 1px;
  font-size: 1.1rem;
  animation: pulseTech 2s infinite;
}

@keyframes pulseTech {
  0% { box-shadow: 0 0 15px rgba(35, 77, 116, 0.4); }
  50% { box-shadow: 0 0 25px rgba(34, 211, 238, 0.6); transform: scale(1.02); }
  100% { box-shadow: 0 0 15px rgba(35, 77, 116, 0.4); }
}

/* 數字顯示強化 */
.price-early-bird .amount, .price-early-bird .currency, .strike-through {
  font-family: 'Share Tech Mono', monospace;
}

/* --- 原本的樣式 (保留你原有的設定) --- */
.join-hero { position: relative; background: #091321; color: white; padding: 100px 0; overflow: hidden; text-align: center; }
.ambient-glow { position: absolute; border-radius: 50%; filter: blur(100px); z-index: 1; opacity: 0.5; }
.glow-1 { width: 400px; height: 400px; background: rgba(45, 212, 191, 0.3); top: -10%; left: -5%; }
.glow-2 { width: 350px; height: 350px; background: rgba(35, 77, 116, 0.6); bottom: -10%; right: -5%; }
.relative-z { position: relative; z-index: 2; }
.hero-badge { display: inline-block; padding: 8px 16px; border-radius: 999px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); font-size: 0.9rem; font-weight: 700; margin-bottom: 16px;}
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; margin-bottom: 20px; }
.hero-text { font-size: 1.15rem; color: rgba(255, 255, 255, 0.85); line-height: 1.6; }

.join-layout { display: grid; grid-template-columns: 1fr 1.1fr; gap: 40px; align-items: start; }
.benefit-card h2, .form-head h2 { margin: 16px 0 14px; color: var(--primary-dark); font-size: 1.7rem; }
.benefit-list { margin: 20px 0; padding-left: 0; list-style: none; display: grid; gap: 12px; line-height: 1.9; color: var(--muted); }

.form-head p { color: var(--muted); line-height: 1.8; }
.join-form { margin-top: 18px; }
.field { margin-bottom: 14px; }
.field label { display: block; margin-bottom: 8px; color: var(--primary-dark); font-weight: 700; font-size: 0.95rem; }
.text-input { width: 100%; padding: 13px 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.8); color: var(--text); outline: none; transition: all 0.2s; font-family: inherit; }
.text-input:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 4px rgba(35, 77, 116, 0.08); }
textarea.text-input { resize: vertical; min-height: 80px; }
.file-input { display: none; }
.upload-placeholder { display: flex; min-height: 110px; border: 2px dashed rgba(0,0,0,0.15); border-radius: 12px; align-items: center; justify-content: center; cursor: pointer; color: var(--muted); background: rgba(255,255,255,0.6); transition: all 0.2s; }
.upload-placeholder:hover { border-color: var(--primary); color: var(--primary); }
.preview-box { position: relative; width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
.img-preview { width: 100%; height: auto; display: block; max-height: 250px; object-fit: cover; }
.remove-btn { position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.6); color: white; border: none; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.submit-btn { width: 100%; margin-top: 10px; color: white; padding: 14px; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; transition: 0.2s;}
.error { color: #c0392b; margin-top: 12px; font-size: 0.95rem; }
.success { margin-top: 20px; color: #1f7a43; font-weight: 700; text-align: center; }

.pricing-ticket { margin-top: 30px; padding: 24px; background: linear-gradient(135deg, #f8fbff 0%, #e2eef9 100%); border: 1px solid #cce0f5; border-radius: 20px; position: relative; box-shadow: 0 8px 24px rgba(23, 50, 76, 0.06); }
.relative-overflow { position: relative; overflow: hidden; }
.ticket-watermark { position: absolute; font-size: 6rem; opacity: 0.04; right: -10px; bottom: -20px; transform: rotate(-15deg); pointer-events: none; }
.watermark-2 { font-size: 3rem; top: 10px; left: 10px; opacity: 0.05; transform: rotate(20deg); }
.pricing-label { color: var(--muted); font-size: 0.95rem; font-weight: 700; margin-bottom: 12px; position: relative; z-index: 2; }
.price-display { display: flex; align-items: baseline; gap: 16px; position: relative; z-index: 2; }
.price-original { display: flex; flex-direction: column; color: #94a3b8; font-size: 0.9rem; font-weight: 600; }
.strike-through { text-decoration: line-through; font-size: 1.1rem; }
.price-early-bird { color: #e53e3e; font-weight: 900; }
.price-early-bird .currency { font-size: 1.5rem; margin-right: 2px; }
.price-early-bird .amount { font-size: 3.5rem; line-height: 1; }
.early-bird-tag { display: inline-block; margin-top: 16px; padding: 6px 12px; background: #fff0f0; color: #e53e3e; font-size: 0.85rem; font-weight: 800; border-radius: 999px; position: relative; z-index: 2; animation: pulse-soft 2s infinite; }
@keyframes pulse-soft { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }

@media (max-width: 900px) {
  .join-hero {
    padding: 92px 0 72px;
  }

  .join-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .benefit-card,
  .form-card {
    padding: 18px;
  }

  .pricing-ticket {
    padding: 18px;
    border-radius: 18px;
  }

  .price-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .price-early-bird .amount {
    font-size: 2.6rem;
  }

  .submit-btn {
    padding: 13px;
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .join-hero {
    padding: 80px 0 60px;
  }

  .hero-title {
    font-size: clamp(1.9rem, 10vw, 2.5rem);
  }

  .hero-text {
    font-size: 1rem;
    line-height: 1.6;
  }

  .benefit-list {
    gap: 10px;
  }

  .tech-list li {
    align-items: flex-start;
  }

  .upload-placeholder {
    min-height: 96px;
    padding: 12px;
    text-align: center;
  }

  .img-preview {
    max-height: 200px;
  }
}
</style>