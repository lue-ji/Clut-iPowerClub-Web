<script setup>
import IgQrCard from '@/components/IgQrCard.vue'
</script>

<template>
  <footer class="footer">
    <div class="page footer-container">
      <div class="footer-left">
        <h3>iPower 社</h3>
        <p>讓每個人發揮正向影響力 ✈</p>
      </div>

      <div class="footer-links">
        <router-link to="/">首頁</router-link>
        <router-link to="/events">活動</router-link>
        <router-link to="/staff">幹部</router-link>
        <router-link to="/faq">FAQ</router-link>
      </div>

      <div class="footer-contact">
        <IgQrCard variant="footer" :show-caption="true" class="footer-ig-qr" />
        <p>
          <a href="https://www.instagram.com/clut_ipower/" target="_blank" rel="noopener noreferrer">
            IG @clut_ipower
          </a>
        </p>
        <p>歡迎透過 IG 私訊與我們聯繫</p>
      </div>
    </div>

    <p class="copyright">© 2026 at iPower Club</p>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--dark);
  color: white;
  padding: 52px 0 26px;
  margin-top: 70px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
}

.footer-left h3 {
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.footer-left p,
.footer-contact p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
}

.footer-links a {
  display: block;
  margin: 6px 0;
  color: rgba(255, 255, 255, 0.78);
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-contact a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: underline;
}

.footer-contact a:hover {
  color: white;
}

.footer-ig-qr {
  display: none;
  margin-bottom: 12px;
}

@media (min-width: 768px) {
  .footer-ig-qr {
    display: inline-flex;
  }
}

.copyright {
  text-align: center;
  margin-top: 28px;
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.5);
}
</style>