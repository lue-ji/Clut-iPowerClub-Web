<script setup>
import { ref } from 'vue'
import { useScrollThreshold } from '@/composables/useScrollPosition'

const open = ref(false)
const closeMenu = () => {
  open.value = false
}
const toggleMenu = () => {
  open.value = !open.value
}
const isScrolled = useScrollThreshold(50)
</script>

<template>
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="page nav-inner">
      <div class="logo">iPower</div>

      <div class="hamburger" @click="toggleMenu">☰</div>

      <div class="links" :class="{ show: open }">
        <router-link to="/" @click="closeMenu">首頁</router-link>
        <router-link to="/events" @click="closeMenu">活動</router-link>
        <router-link to="/staff" @click="closeMenu">幹部</router-link>
        <router-link to="/about" class="nav-link">關於我們</router-link>
        <router-link to="/faq" @click="closeMenu">FAQ</router-link>
        <router-link to="/resources" @click="closeMenu">知識庫</router-link>
        <router-link to="/media" @click="closeMenu">影音牆</router-link>
        <router-link to="/interaction" @click="closeMenu">互動Bar</router-link>
        <router-link to="/join" class="join-btn" @click="closeMenu">
          加入我們
        </router-link>
      </div>
    </div>

    <div v-if="open" class="overlay" @click="closeMenu"></div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(23, 50, 76, 0.9); 
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.nav-inner {
  min-height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.navbar-scrolled {
  background: rgba(23, 50, 76, 0.98); 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.logo {
  font-weight: 900;
  font-size: 1.28rem;
  color: white;
  letter-spacing: 0.04em;
}

.links {
  display: flex;
  align-items: center;
  gap: 24px; /* 稍微拉開一點距離給底線空間 */
}

.links a {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  transition: color 0.25s ease;
  position: relative; /* 給底線定位用 */
  padding-bottom: 4px; /* 撐開一點空間 */
}

.links a:hover {
  color: white;
}

.links a.router-link-exact-active {
  color: white;
}

.links a:not(.join-btn).router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #ffd700;
  border-radius: 999px;
}

.join-btn {
  background: linear-gradient(135deg, var(--accent), var(--primary));
  color: white !important;
  padding: 9px 16px;
  border-radius: 999px;
  margin-left: 8px;
}

.hamburger { display: none; font-size: 24px; color: white; cursor: pointer; }
@media (max-width: 768px) {
  .hamburger { display: block; }
  .links { position: absolute; top: 72px; right: 16px; width: 230px; flex-direction: column; align-items: stretch; gap: 12px; padding: 20px; border-radius: 18px; background: #102235; box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2); transform: translateY(-8px); opacity: 0; pointer-events: none; transition: all 0.25s ease; }
  .links.show { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .links a { text-align: center; }
  .links a:not(.join-btn).router-link-exact-active::after { bottom: -6px; } 
}
.overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.35); }
</style>