<script setup>
import igQrImg from '@/assets/social/ig-qrcode.png'

defineProps({
  variant: { type: String, default: 'default',},
  hint: { type: String, default: '',},
  showCaption: { type: Boolean, default: true,},
})

const IG_URL = 'https://www.instagram.com/clut_ipower/'
</script>

<template>
  <a
    :href="IG_URL"
    target="_blank"
    rel="noopener noreferrer"
    class="ig-qr-card"
    :class="[`ig-qr-card--${variant}`]"
  >
    <img
      :src="igQrImg"
      alt="掃描追蹤 iPower 社團 Instagram @clut_ipower"
      class="ig-qr-img"
      loading="lazy"
      decoding="async"
    />
    <p v-if="showCaption" class="ig-qr-caption">@clut_ipower</p>
    <p v-if="hint" class="ig-qr-hint">{{ hint }}</p>
  </a>
</template>

<style scoped>
.ig-qr-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.ig-qr-card:hover {
  transform: translateY(-4px);
}

.ig-qr-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  background: #fff;
}

.ig-qr-caption {
  margin-top: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ig-qr-hint {
  margin-top: 6px;
  font-size: 0.82rem;
  color: var(--muted);
  text-align: center;
  line-height: 1.5;
}

/* 首頁 Hero 右欄 */
.ig-qr-card--home {
  width: 100%;
  max-width: 220px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.ig-qr-card--home .ig-qr-hint {
  color: #64748b;
}

/* FAQ / 影音區 */
.ig-qr-card--panel {
  max-width: 160px;
  padding: 12px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

/* 頁尾小圖 */
.ig-qr-card--footer {
  max-width: 108px;
  padding: 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.ig-qr-card--footer .ig-qr-caption {
  font-size: 0.75rem;
  margin-top: 6px;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.9);
  background: none;
  color: rgba(255, 255, 255, 0.9);
}

/* 手機以連結為主，QR 在 md 以上顯示 */
.ig-qr-card--hide-mobile {
  display: none;
}

@media (min-width: 768px) {
  .ig-qr-card--hide-mobile {
    display: inline-flex;
  }
}
</style>
