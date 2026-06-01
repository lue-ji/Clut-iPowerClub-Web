<script setup>
import { ref, onMounted } from 'vue'

const CONSENT_KEY = 'cookieConsent'
const isVisible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem(CONSENT_KEY)
  if (!consent) isVisible.value = true
})

const setConsent = (value) => {
  localStorage.setItem(CONSENT_KEY, value)
  isVisible.value = false
}

const acceptCookies = () => setConsent('accepted')
const declineCookies = () => setConsent('declined')
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="cookie-banner" role="dialog" aria-label="Cookie 同意">
      <div class="cookie-content">
        <span class="cookie-icon" aria-hidden="true">🍪</span>
        <p>
          我們可能使用 Cookie 與分析工具以改善瀏覽體驗。詳見
          <router-link to="/faq" class="cookie-link">常見問題</router-link>
          ，繼續使用即表示你了解此說明。
        </p>
      </div>
      <div class="cookie-actions">
        <button type="button" class="btn-decline" @click="declineCookies">僅必要</button>
        <button type="button" class="btn-accept" @click="acceptCookies">同意</button>
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
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.cookie-content {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  line-height: 1.6;
}

.cookie-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.cookie-link {
  color: #7dd3fc;
  text-decoration: underline;
}

.cookie-actions {
  display: flex;
  flex-shrink: 0;
  gap: 10px;
}

.btn-accept,
.btn-decline {
  border: none;
  padding: 12px 22px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: background-color 0.2s;
}

.btn-accept {
  background-color: #4caf50;
  color: white;
}

.btn-accept:hover {
  background-color: #45a049;
}

.btn-decline {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.btn-decline:hover {
  background: rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
  .cookie-banner {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  .cookie-actions {
    width: 100%;
    flex-direction: column;
  }
  .btn-accept,
  .btn-decline {
    width: 100%;
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
