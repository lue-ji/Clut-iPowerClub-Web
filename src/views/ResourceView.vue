<template>
  <div class="resource-view section">
    <div class="page">
      <h1 class="title">社團知識庫</h1>
      <p class="subtitle">志工守則、培訓簡報與歷屆企劃書都在這裡</p>

      <div class="grid grid-3">
        <!-- 檔案卡片列表 -->
        <div class="card ip-glass-card file-card fade-in" v-for="(doc, index) in allDocuments" :key="index">
          <div class="file-icon">{{ getIcon(doc.type) }}</div>
          <h3>{{ doc.name }}</h3>
          <span class="file-type-tag">{{ doc.type.toUpperCase() }}</span>
          <button class="btn btn-outline mt-4" @click="openViewer(doc)">線上檢視</button>
        </div>
      </div>
    </div>

    <!-- 彈出式播放器 -->
    <div v-if="currentDoc" class="viewer-overlay" @click.self="closeViewer">
        <div class="viewer-container">
            <button class="close-btn" @click="closeViewer">✕</button>
            <!-- 1. Google 簡報專用 (直接讀取 embed 網址) -->
            <iframe 
                v-if="currentDoc.type === 'google-slide'"
                :src="currentDoc.url"
                frameborder="0"
                loading="lazy"
                allowfullscreen="true"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                title="Google 簡報檢視器"
            ></iframe>
            <!-- 2. 微軟 Office 檢視器 (未來上線後，給本地端的 docx, pptx 用) -->
            <iframe 
                v-else-if="['ppt', 'pptx', 'doc', 'docx'].includes(currentDoc.type) && !isLocalhost"
                :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(currentDoc.url)}`"
                frameborder="0"
                loading="lazy"
                title="Office 文件檢視器"
            ></iframe>
            <!-- 3. 一般瀏覽器檢視器 (給本地端的 PDF 用) -->
            <iframe 
                v-else-if="currentDoc.type === 'pdf'"
                :src="currentDoc.url"
                frameborder="0"
                loading="lazy"
                title="PDF 檢視器"
            ></iframe>
            <!-- 4. 開發中無法預覽的提示 (給現在本地開發看 docx 時用的防呆) -->
            <div v-else class="download-only">
                <div class="file-icon" style="font-size: 4rem; margin-bottom: 20px;">🔒</div>
                    <h3>本地開發模式</h3>
                    <p style="color: var(--muted); margin-bottom: 24px;">
                    微軟預覽器需要公開外網才能讀取檔案。<br/>
                    目前在 Localhost 環境下無法預覽，請直接下載測試，<br/>
                    網站正式上線後即會自動切換為線上預覽模式！
                    </p>
                    <a :href="currentDoc.url" download class="btn">直接下載檔案</a>
                </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
// 引入你寫好的 fileloaders
import { fileload } from '@/utils/fileloader'

const localFilesMap = fileload()
const currentDoc = ref(null)

const extractName = (filename) => {
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.slice(0, lastDot) : filename
}

const getExt = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  return ext === filename ? '' : ext
}

// 1. 將本地讀到的檔案轉成陣列
// 🌟將所有檔案攤平，不管放哪層資料夾都直接轉卡片格式
const localDocs = Object.values(localFilesMap).flat().map(file => ({
  name: extractName(file.name),
  url: file.url,
  type: getExt(file.name)
}))
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
// 2. 手動定義託管在雲端的中等檔案 (>20 && 100< MB--PPT)
const cloudDocs = [
  {
    name: '114-2 iPower社0507志工訓練',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ69VGOvEkNmyCTDw2DZe9Q0hhxtiUe-uXPL1cYMitIlOb1tlcIwnm7g_qgD1zjSQ/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide' 
  },
  {
    name: '114-2 iPower社0514志工訓練',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vTT7GM4fybH3ecHRZPi5j3LYqdvv073eTfYHEJNgWyNotHn9CIuLmvFrpkBPz7Ifw/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide' 
  },
  {
    name: '114-2 iPower社0521志工訓練',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vSYOT39-_1lNSmpniOO30b1eR9uucQSKl9h8daPas539dH9xM8WRgrcW6Y5y7eu5w/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide' 
  },
    {
    name: '114-2 iPower社0528慶功宴~~~~~~~',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vT76ipEvyWkoXxlGmKIyeWmmG3nuLRg0JKKPCT3azeBcd1g3-ULu8_vm6Hb81k_Aw/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide' 
  }
]

// 3. 合併兩者供畫面渲染
const allDocuments = computed(() => {
  return [...localDocs, ...cloudDocs]
})

// 根據副檔名給予Emoji
const getIcon = (type) => {
  const icons = {
    ppt: '📊',
    pptx: '📊',
    pdf: '📕',
    doc: '📝',
    docx: '📝',
    zip: '📦',
    'google-slide': '📽️'
  }
  return icons[type] || '📄'
}

const openViewer = (doc) => {
  currentDoc.value = doc
  document.body.style.overflow = 'hidden'
}

const closeViewer = () => {
  currentDoc.value = null
  document.body.style.overflow = ''
}

const handleEsc = (event) => {
  if (event.key === 'Escape' && currentDoc.value) {
    closeViewer()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})
</script>

<style scoped>
/* 基本卡片樣式 */
.file-card { text-align: center; padding: 30px 20px; }
.file-icon { font-size: 3rem; margin-bottom: 16px; }
.file-card h3 { color: var(--primary-dark); margin-bottom: 12px; font-size: 1.2rem; }
.file-type-tag { display: inline-block; background: #eef3f8; color: var(--muted); padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; }
.mt-4 { margin-top: 24px; }

/* 播放器疊加層 */
.viewer-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.viewer-container { width: 100%; max-width: 1000px; height: 80vh; background: #fff; border-radius: 12px; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;}
.viewer-container iframe { width: 100%; height: 100%; }
.close-btn { position: absolute; top: 10px; right: 10px; width: 40px; height: 40px; border-radius: 50%; background: #e53e3e; color: white; border: none; font-size: 1.2rem; cursor: pointer; z-index: 10; }
.download-only { text-align: center; }
.download-only p { margin-bottom: 16px; color: var(--muted); }
</style>