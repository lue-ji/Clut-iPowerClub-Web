<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue'
import { useScrollThreshold } from '@/composables/useScrollPosition'

const showBackToTop = useScrollThreshold(300)
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>
<div class="app-container">
    <Navbar />
    <router-view v-slot="{ Component }"> <CookieBanner />
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <transition name="fade">
      <button v-show="showBackToTop" class="back-to-top" @click="scrollToTop">
        ↑
      </button>
    </transition>
    <Footer />
  </div>
</template>
<style>
/* 轉場動畫 CSS */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px); /* 從下方微微浮入 */
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* 向上方微微消失 */
}

/* 確保轉場時不會出現兩個捲軸 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* 捲軸背景軌道 */
::-webkit-scrollbar-track {
  background: #f1f5f9; 
}

/* 捲軸滑塊本身 */
::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 999px;
}

/* 滑鼠移上去時的滑塊顏色 */
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--primary-dark, #17324c);
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 99;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-5px);
  background: #234d74;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>