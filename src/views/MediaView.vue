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
          <a href="https://www.instagram.com/clut_ipower/" target="_blank" class="btn btn-outline btn-sm mt-3">
            追蹤社團 IG @clut_ipower
          </a>
        </div>

        <div class="grid grid-2 mb-4">
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe src="https://www.youtube.com/embed/_HbfiDjQdn0?autoplay=0&rel=0" title="iPower 大型活動回顧" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe src="https://www.youtube.com/embed/GHRdj-sCXZA?autoplay=0&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe src="https://www.youtube.com/embed/2B9d4S95mls?autoplay=0&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper yt-wrapper">
            <div class="video-container-16by9">
              <iframe src="https://www.youtube.com/embed/o4Hyv8y8Elw?autoplay=0&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <div class="video-gallery">
          <div class="ip-video-wrapper reels-wrapper" style="margin: 0 auto;">
            <div class="video-container-9by16">
              <iframe src="https://www.instagram.com/p/DPn4T-kjyzJ/embed" title="iPower 官方貼文" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="media-section mt-5 fade-in">
      <div class="page">
        <div class="section-title-wrap">
          <span class="section-emoji">🐺</span>
          <h2>特別企劃：歡樂狼窩</h2>
          <p>幸福小組火熱預備中！來看看狼窩裡的歡樂日常與感動故事</p>
          <a href="https://www.instagram.com/happywolves810/" target="_blank" class="btn btn-outline btn-sm mt-3">
            追蹤企劃 IG @happywolves810
          </a>
        </div>

        <div class="grid grid-2">
          <div class="ip-video-wrapper reels-wrapper">
            <div class="video-container-9by16">
              <iframe src="https://www.instagram.com/p/DXd_30uERD8/embed" title="歡樂狼窩宣傳" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
            </div>
          </div>
          <div class="ip-video-wrapper reels-wrapper">
            <div class="video-container-9by16">
              <iframe src="https://www.instagram.com/p/DXiKKLyktY1/embed" title="歡樂狼窩日常" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 頁面標題樣式 */
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

/* 分層區塊樣式 */
.media-section {
  padding: 60px 0 80px;
  border-radius: 32px;
}
.mt-5 {
  margin-top: 40px;
}
.mt-3 {
  margin-top: 16px;
}

/* 區塊標題 */
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

/* 按鈕微調 */
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

/* 官方影音第一層排版：左邊寬YT，右邊窄IG */
.video-gallery {
  display: grid;
  grid-template-columns: 1.8fr 1fr; 
  gap: 30px;
  align-items: start;
}

/* 控制單一IG貼文的最大寬度，確保不會被拉得太肥 */
.reels-wrapper {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}
.yt-wrapper {
  width: 100%;
}

/* RWD 適應 */
@media (max-width: 900px) {
  .video-gallery {
    grid-template-columns: 1fr;
  }
  .yt-wrapper {
    max-width: 100%;
  }
  .media-section {
    padding: 40px 0 60px;
    border-radius: 20px;
  }
}
</style>