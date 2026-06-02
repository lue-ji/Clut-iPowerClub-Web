<script setup>
import IgQrCard from '@/components/IgQrCard.vue'
</script>

<template>
  <div class="media-view section">
    <div class="page page-header text-center fade-in">
      <span class="ip-badge">Media Gallery</span>
      <h1 class="hero-title">影音專區與精選企劃</h1>
      <p class="subtitle">用動態的影像與文字，記錄 iPower 每一個感動與歡笑的瞬間。</p>
    </div>

    <section class="media-section ip-bg-soft fade-in">
      <div class="page">
        <div class="section-title-wrap">
          <span class="section-emoji">🎬</span>
          <h2>iPower 官方影音回顧</h2>
          <p>揮灑汗水的大型企劃、溫馨的志工服務與日常點滴</p>
          <a
            href="https://www.instagram.com/clut_ipower/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-sm mt-3"
          >
            追蹤社團 IG @clut_ipower
          </a>
        </div>

        <div class="grid grid-2 yt-grid">
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe
                src="https://www.youtube.com/embed/_HbfiDjQdn0?autoplay=0&rel=0"
                title="iPower 大型活動回顧"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe
                src="https://www.youtube.com/embed/GHRdj-sCXZA?autoplay=0&rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe
                src="https://www.youtube.com/embed/2B9d4S95mls?autoplay=0&rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe
                src="https://www.youtube.com/embed/o4Hyv8y8Elw?autoplay=0&rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        <div class="ig-showcase">
          <div class="ig-showcase-header">
            <div class="ig-showcase-intro">
              <span class="ig-showcase-emoji">📱</span>
              <div>
                <h3 class="ig-showcase-title">Instagram 精選動態</h3>
                <p class="ig-showcase-desc">追蹤我們的 Reels 與貼文，掌握社團最新花絮</p>
              </div>
            </div>
            <IgQrCard variant="panel" hint="掃碼追蹤 @clut_ipower" class="media-ig-qr" />
          </div>
          <div class="ig-embed-panel">
            <div class="ip-video-wrapper ig-embed-card">
              <div class="video-container-9by16">
                <iframe
                  src="https://www.instagram.com/p/DPn4T-kjyzJ/embed"
                  title="iPower 官方貼文"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                ></iframe>
                <iframe
                  src="https://www.instagram.com/p/DY7IFmpPo9E/embed"
                  title="致理iPower最新活動"
                  frameborder="0"
                  scrolling="no"
                  allowtransparency="true"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="media-section wolves-section fade-in">
      <div class="page">
        <div class="section-title-wrap">
          <span class="section-emoji">🐺</span>
          <h2>特別企劃：歡樂狼窩</h2>
          <p>幸福小組火熱預備中！來看看狼窩裡的歡樂日常與感動故事</p>
          <a
            href="https://www.instagram.com/happywolves810/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-sm mt-3"
          >
            追蹤企劃 IG @happywolves810
          </a>
        </div>

        <div class="grid grid-2 ig-grid-balanced">
          <div class="ip-video-wrapper ig-embed-card">
            <div class="video-container-9by16">
              <iframe
                src="https://www.instagram.com/p/DXd_30uERD8/embed"
                title="歡樂狼窩宣傳"
                frameborder="0"
                scrolling="no"
                allowtransparency="true"
              ></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper ig-embed-card">
            <div class="video-container-9by16">
              <iframe
                src="https://www.instagram.com/p/DXiKKLyktY1/embed"
                title="歡樂狼窩日常"
                frameborder="0"
                scrolling="no"
                allowtransparency="true"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  padding-top: 40px;
  margin-bottom: 60px;
}
.hero-title {
  color: var(--primary-dark);
  font-weight: 900;
  margin-bottom: 16px;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
}
.text-center {
  text-align: center;
}

.media-section {
  padding: 60px 0 80px;
  border-radius: 32px;
}

.wolves-section {
  margin-top: 16px;
  padding-top: 48px;
}

.mt-3 {
  margin-top: 16px;
}

.section-title-wrap {
  text-align: center;
  margin-bottom: 48px;
}
.section-emoji {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 10px;
}
.section-title-wrap h2 {
  color: var(--primary-dark);
  font-weight: 800;
  font-size: 2.2rem;
  margin-bottom: 12px;
}
.section-title-wrap p {
  color: var(--muted);
  font-size: 1.1rem;
}

.btn-sm {
  padding: 10px 20px;
  font-size: 0.95rem;
  border-color: #cbd5e1;
  color: var(--muted);
  display: inline-flex;
}
.btn-sm:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.yt-grid {
  margin-bottom: 0;
}

.yt-wrapper {
  width: 100%;
}

.ig-showcase {
  margin-top: 56px;
  padding: 32px 28px 36px;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(237, 243, 248, 0.85) 100%);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.ig-showcase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.ig-showcase-intro {
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  flex: 1;
  min-width: 200px;
}

.media-ig-qr {
  display: none;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .media-ig-qr {
    display: inline-flex;
  }
}

.ig-showcase-emoji {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.ig-showcase-title {
  color: var(--primary-dark);
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 6px;
}

.ig-showcase-desc {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.ig-embed-panel {
  display: flex;
  justify-content: center;
}

.ig-embed-card {
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(16, 34, 53, 0.06);
}

.ig-grid-balanced {
  align-items: start;
}

.ig-grid-balanced .ig-embed-card {
  max-width: 100%;
}

@media (max-width: 900px) {
  .ig-showcase-header {
    flex-direction: column;
    align-items: center;
  }

  .ig-showcase-intro {
    flex-direction: column;
    text-align: center;
  }

  .media-section {
    padding: 40px 0 60px;
    border-radius: 20px;
  }

  .ig-showcase {
    margin-top: 40px;
    padding: 24px 20px 28px;
  }
}
</style>
