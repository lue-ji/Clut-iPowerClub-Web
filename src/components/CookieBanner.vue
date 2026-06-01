<script setup>
import { ref, onMounted } from 'vue'

// 控制橫幅是否顯示
const isVisible = ref(false)

onMounted(() => {
  // 元件掛載時，檢查 localStorage 是否已經有同意紀錄
  const hasConsented = localStorage.getItem('cookieConsent')
  if (!hasConsented) {
    isVisible.value = true // 如果沒有紀錄，就顯示橫幅
  }
})

const acceptCookies = () => {
  // 使用者點擊同意後，將紀錄存入 localStorage
  localStorage.setItem('cookieConsent', 'true')
  isVisible.value = false
  
  // 💡 如果準備埋入 Google Analytics (GA4) 的追蹤碼，
  // 可以把啟動 GA 的函數寫在這裡，確保使用者同意後才開始追蹤。
  // initGoogleAnalytics() 
}
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="cookie-banner">
      <div class="cookie-content">
        <span class="cookie-icon">🍪</span>
        <p>
          我們使用 Cookie 與網站分析工具來提升您的瀏覽體驗。繼續使用本網站，即表示您同意我們的隱私權設定。
        </p>
      </div>
      <div class="cookie-actions">
        <button @click="acceptCookies" class="btn btn-primary accept-btn">
          Accept
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(30, 30, 30, 0.95);
  color: #fff;
  /* 1. 增加橫幅整體的上下與左右內距 (原本是 16px 24px) */
  padding: 24px 32px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2); /* 稍微加深陰影讓它更立體 */
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.cookie-content {
  display: flex;
  align-items: center;
  gap: 16px; /* 圖示與文字的距離拉開 */
  /* 2. 放大文字 (原本是 14px) */
  font-size: 16px; 
  line-height: 1.6;
}

.cookie-icon {
  /* 3. 放大餅乾圖示 (原本是 24px) */
  font-size: 32px; 
}

.cookie-actions {
  flex-shrink: 0;
  margin-left: 24px;
}

.accept-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  /* 4. 將按鈕撐大 (原本是 8px 16px) */
  padding: 12px 28px; 
  /* 5. 放大按鈕文字 */
  font-size: 16px; 
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  letter-spacing: 1px; /* 讓按鈕字距稍微拉開，更有質感 */
}

.accept-btn:hover {
  background-color: #45a049;
}

/* 手機版 RWD 維持直立排列，但也適配加大的尺寸 */
@media (max-width: 768px) {
  .cookie-banner {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    padding: 20px;
  }
  .cookie-actions {
    margin-left: 0;
    width: 100%;
  }
  .accept-btn {
    width: 100%;
    padding: 14px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>