<template>
  <div v-if="event">
    <section class="hero detail-hero" :style="heroStyle">
      <div class="page detail-hero-content">
        <span class="detail-badge">活動詳情</span>
        <h1 class="hero-title">{{ event.title }}</h1>
        <p class="hero-text">{{ event.summary }}</p>

        <div class="detail-tags">
          <span class="tag type-tag">{{ event.type }}</span>
          <span class="tag status-tag">{{ event.status }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="page split">
        <div class="card detail-main fade-in">
          <img :src="event.image" :alt="event.title" class="main-image" />

          <div class="detail-meta">
            <div class="meta-item">
              <strong>📅 日期</strong>
              <span>{{ event.date }}</span>
            </div>

            <div class="meta-item">
              <strong>📍 地點</strong>
              <span>{{ event.location }}</span>
            </div>

            <div class="meta-item">
              <strong>🏷 類型</strong>
              <span>{{ event.type }}</span>
            </div>

            <div class="meta-item">
              <strong>📌 狀態</strong>
              <span>{{ event.status }}</span>
            </div>
          </div>

          <div
            class="detail-highlights"
            v-if="event.highlights && event.highlights.length"
          >
            <h2>活動亮點</h2>
            <ul>
              <li v-for="(item, i) in event.highlights" :key="i">
                ✨ {{ item }}
              </li>
            </ul>
          </div>

          <div class="detail-desc">
            <h2>活動介紹</h2>
            <p class="desc">{{ event.desc || event.summary }}</p>
          </div>
        </div>

        <div class="card detail-side fade-in">
          <h2>活動照片</h2>

          <div v-if="!useCarousel" class="gallery">
            <img
              v-for="(img, index) in gallery"
              :key="index"
              :src="img"
              class="gallery-image"
              @click="selectedImage = img"
            />
          </div>

          <div v-else class="carousel">
            <button class="carousel-btn left" @click="prevImage">‹</button>

            <img
              :src="gallery[currentIndex]"
              class="carousel-image"
              @click="selectedImage = gallery[currentIndex]"
            />

            <button class="carousel-btn right" @click="nextImage">›</button>

            <div class="carousel-indicator">
              {{ currentIndex + 1 }} / {{ gallery.length }}
            </div>
          </div>

          <router-link to="/events" class="btn-outline back-btn">
            回活動列表
          </router-link>
        </div>
      </div>
    </section>

    <section class="section section-soft" v-if="relatedEvents.length">
      <div class="page">
        <div class="related-head">
          <h2 class="title">其他活動</h2>
          <p class="subtitle">繼續看看 iPower 的更多精彩內容</p>
        </div>

        <div class="grid related-grid">
          <router-link
            v-for="item in relatedEvents"
            :key="item.id"
            :to="`/events/${item.slug}`"
            class="card related-card"
          >
            <img :src="item.image" class="related-img" :alt="item.title" />

            <div class="related-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <div
      v-if="selectedImage"
      class="lightbox"
      @click.self="selectedImage = null"
    >
      <button class="lightbox-close" @click="selectedImage = null">✕</button>
      <img :src="selectedImage" class="lightbox-img" />
    </div>
  </div>

  <div v-else class="section">
    <div class="page not-found">
      <h1 class="title">找不到這個活動</h1>
      <p class="subtitle">這個活動可能不存在</p>
      <router-link to="/events" class="btn-outline">
        回活動列表
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { events } from '@/data/events'

const route = useRoute()

const selectedImage = ref(null)
const currentIndex = ref(0)

const event = computed(() => {
  return events.find(item => item.slug === route.params.slug)
})

const gallery = computed(() => {
  return (event.value?.gallery || []).filter(Boolean)
})

const useCarousel = computed(() => {
  return gallery.value.length > 3
})

const nextImage = () => {
  const total = gallery.value.length
  if (!total) return
  currentIndex.value = (currentIndex.value + 1) % total
}

const prevImage = () => {
  const total = gallery.value.length
  if (!total) return
  currentIndex.value = (currentIndex.value - 1 + total) % total
}

const heroStyle = computed(() => {
  if (!event.value) return {}
  return {
    backgroundImage: `linear-gradient(rgba(23,50,76,.82), rgba(95,135,168,.78)), url(${event.value.image})`
  }
})

const relatedEvents = computed(() => {
  if (!event.value) return []

  const sorted = [...events].sort((a, b) => a.order - b.order)
  const currentIndexInSorted = sorted.findIndex(item => item.id === event.value.id)

  if (currentIndexInSorted === -1) return []

  const others = sorted.filter(item => item.id !== event.value.id)

  if (others.length <= 4) return others

  const result = []
  let index = (currentIndexInSorted + 1) % sorted.length

  while (result.length < 4) {
    const candidate = sorted[index]

    if (candidate.id !== event.value.id) {
      result.push(candidate)
    }

    index = (index + 1) % sorted.length
  }

  return result
})

watch(event, () => {
  currentIndex.value = 0
  selectedImage.value = null
})
</script>

<style scoped>
.detail-hero {
  padding-top: 104px;
  padding-bottom: 104px;
  background-size: cover;
  background-position: center;
  color: white;
}

.detail-hero-content {
  text-align: center;
  max-width: 860px;
}

.detail-badge {
  display: inline-block;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 0.92rem;
  font-weight: 700;
}

.detail-tags {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.type-tag {
  background: rgba(255, 255, 255, 0.16);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.status-tag {
  background: rgba(255, 255, 255, 0.24);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.split {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 28px;
  align-items: start;
}

.detail-main,
.detail-side {
  text-align: left;
}

.main-image {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 18px;
  margin-bottom: 22px;
}

.detail-meta {
  display: grid;
  gap: 12px;
  margin-bottom: 28px;
}

.meta-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 13px 15px;
  border-radius: 14px;
  background: #f8fbff;
}

.meta-item strong {
  min-width: 78px;
  color: var(--primary-dark);
}

.meta-item span {
  color: var(--text);
  line-height: 1.8;
}

.detail-highlights {
  margin-bottom: 28px;
}

.detail-highlights h2,
.detail-desc h2,
.detail-side h2 {
  margin-bottom: 14px;
  color: var(--primary-dark);
}

.detail-highlights ul {
  display: grid;
  gap: 10px;
  padding-left: 0;
  list-style: none;
}

.detail-highlights li {
  background: #f8fbff;
  padding: 12px 14px;
  border-radius: 12px;
  line-height: 1.75;
  color: var(--text);
}

.detail-desc .desc {
  line-height: 2;
  color: var(--muted);
  white-space: pre-line;
}

.gallery {
  display: grid;
  gap: 14px;
}

.gallery-image {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 14px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.gallery-image:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.back-btn {
  margin-top: 22px;
}

.related-head {
  text-align: center;
  margin-bottom: 28px;
}

.related-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: stretch;
}

.related-card {
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.related-img {
  width: 100%;
  height: 210px;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
  border-radius: 16px;
}

.related-card:hover .related-img {
  transform: scale(1.04);
}

.related-body {
  padding: 18px 4px 0;
}

.related-body h3 {
  margin: 6px 0 10px;
  color: var(--primary-dark);
}

.related-body p {
  margin: 0;
  line-height: 1.8;
  color: var(--muted);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(8, 12, 36, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 24px;
}

.lightbox-img {
  max-width: 92%;
  max-height: 86%;
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
}

.lightbox-close {
  position: absolute;
  top: 22px;
  right: 26px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
}

.not-found {
  text-align: center;
}

.carousel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 14px;
  cursor: pointer;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: none;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
}

.carousel-btn.left {
  left: 10px;
}

.carousel-btn.right {
  right: 10px;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.65);
}

.carousel-indicator {
  position: absolute;
  bottom: 10px;
  right: 14px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 999px;
}

@media (max-width: 1100px) {
  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .detail-hero {
    padding-top: 82px;
    padding-bottom: 82px;
  }

  .split {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 280px;
  }

  .related-img {
    height: 190px;
  }
}

@media (max-width: 640px) {
  .meta-item {
    flex-direction: column;
    gap: 6px;
  }

  .meta-item strong {
    min-width: auto;
  }

  .gallery-image {
    height: 160px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>