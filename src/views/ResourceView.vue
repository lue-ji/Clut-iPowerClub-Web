<template>
  <div class="resource-view section">
    <div class="page">
      <h1 class="title">社團知識庫</h1>
      <p class="subtitle">志工守則、培訓簡報與歷屆企劃書都在這裡</p>

      <div class="grid grid-3">
        <div class="card ip-glass-card file-card fade-in" v-for="(doc, index) in allDocuments" :key="index">
          <div class="file-icon">{{ getIcon(doc.type) }}</div>
          <h3>{{ doc.name }}</h3>
          <span class="file-type-tag">{{ doc.type.toUpperCase() }}</span>
          <button class="btn btn-outline mt-4" @click="openViewer(doc)">線上檢視</button>
        </div>
      </div>
    </div>

    <div v-if="currentDoc" class="viewer-overlay" @click.self="closeViewer">
      <div class="viewer-container">
        <button class="close-btn" @click="closeViewer" type="button" aria-label="關閉">✕</button>

        <iframe
          v-if="currentDoc.type === 'google-slide'"
          :src="currentDoc.url"
          frameborder="0"
          loading="lazy"
          allowfullscreen
          title="Google 簡報檢視器"
        ></iframe>

        <div v-else-if="currentDoc.type === 'docx'" class="docx-preview-panel">
          <p v-if="docxLoading" class="viewer-state">正在載入 Word 預覽…</p>
          <div v-else-if="docxError" class="download-only">
            <div class="file-icon" style="font-size: 4rem; margin-bottom: 20px">⚠️</div>
            <h3>無法線上預覽</h3>
            <p class="viewer-hint">{{ docxError }}</p>
            <a :href="resolvedDocUrl" :download="downloadFilename" class="btn">直接下載檔案</a>
          </div>
          <div v-else class="docx-html" v-html="docxHtml"></div>
        </div>

        <iframe
          v-else-if="isOfficeEmbedType"
          :src="officeEmbedUrl"
          frameborder="0"
          loading="lazy"
          title="Office 文件檢視器"
        ></iframe>

        <iframe
          v-else-if="currentDoc.type === 'pdf'"
          :src="resolvedDocUrl"
          frameborder="0"
          loading="lazy"
          title="PDF 檢視器"
        ></iframe>

        <div v-else class="download-only">
          <div class="file-icon" style="font-size: 4rem; margin-bottom: 20px">🔒</div>
          <h3>此環境無法預覽</h3>
          <p class="viewer-hint">
            微軟線上預覽需要正式網域的公開檔案網址。<br />
            請直接下載檔案，或於上線後再試一次線上檢視。
          </p>
          <a :href="resolvedDocUrl" :download="downloadFilename" class="btn">直接下載檔案</a>
        </div>

        <div v-if="showViewerToolbar" class="viewer-toolbar">
          <p class="viewer-toolbar-hint">若上方預覽失敗，請改為下載後以 Word 開啟。</p>
          <a :href="resolvedDocUrl" :download="downloadFilename" class="btn btn-outline btn-sm">下載檔案</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { fileload } from '@/utils/fileloader'

const localFilesMap = fileload()
const currentDoc = ref(null)
const docxHtml = ref('')
const docxLoading = ref(false)
const docxError = ref('')

const extractName = (filename) => {
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.slice(0, lastDot) : filename
}

const getExt = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  return ext === filename ? '' : ext
}

/** Vite 打包後常為 /assets/xxx.docx，Office 線上檢視必須用完整 https 網址 */
const resolvePublicUrl = (url) => {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  return new URL(url, window.location.origin).href
}

const localDocs = Object.values(localFilesMap).flat().map((file) => ({
  name: extractName(file.name),
  url: file.url,
  type: getExt(file.name),
}))

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

const cloudDocs = [
  {
    name: '114-2 iPower社0507志工訓練',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ69VGOvEkNmyCTDw2DZe9Q0hhxtiUe-uXPL1cYMitIlOb1tlcIwnm7g_qgD1zjSQ/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide',
  },
  {
    name: '114-2 iPower社0514志工訓練',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vTT7GM4fybH3ecHRZPi5j3LYqdvv073eTfYHEJNgWyNotHn9CIuLmvFrpkBPz7Ifw/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide',
  },
  {
    name: '114-2 iPower社0521志工訓練',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vSYOT39-_1lNSmpniOO30b1eR9uucQSKl9h8daPas539dH9xM8WRgrcW6Y5y7eu5w/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide',
  },
  {
    name: '114-2 iPower社0528慶功宴~~~~~~~',
    url: 'https://docs.google.com/presentation/d/e/2PACX-1vT76ipEvyWkoXxlGmKIyeWmmG3nuLRg0JKKPCT3azeBcd1g3-ULu8_vm6Hb81k_Aw/pubembed?start=false&loop=false&delayms=3000',
    type: 'google-slide',
  },
]

const allDocuments = computed(() => [...localDocs, ...cloudDocs])

const resolvedDocUrl = computed(() =>
  currentDoc.value ? resolvePublicUrl(currentDoc.value.url) : '',
)

const downloadFilename = computed(() => {
  if (!currentDoc.value) return ''
  const ext = currentDoc.value.type
  return ext ? `${currentDoc.value.name}.${ext}` : currentDoc.value.name
})

const isOfficeEmbedType = computed(() => {
  const doc = currentDoc.value
  if (!doc) return false
  return ['ppt', 'pptx', 'doc'].includes(doc.type) && !isLocalhost
})

const officeEmbedUrl = computed(() => {
  if (!isOfficeEmbedType.value) return ''
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(resolvedDocUrl.value)}`
})

const showViewerToolbar = computed(() => {
  const doc = currentDoc.value
  if (!doc) return false
  return ['docx', 'ppt', 'pptx', 'doc', 'pdf'].includes(doc.type)
})

const getIcon = (type) => {
  const icons = {
    ppt: '📊',
    pptx: '📊',
    pdf: '📕',
    doc: '📝',
    docx: '📝',
    zip: '📦',
    'google-slide': '📽️',
  }
  return icons[type] || '📄'
}

const resetDocxPreview = () => {
  docxHtml.value = ''
  docxError.value = ''
  docxLoading.value = false
}

const loadDocxPreview = async (doc) => {
  resetDocxPreview()
  docxLoading.value = true
  try {
    const url = resolvePublicUrl(doc.url)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`檔案讀取失敗 (${res.status})`)

    const arrayBuffer = await res.arrayBuffer()
    const mammoth = await import('mammoth')
    const result = await mammoth.convertToHtml({ arrayBuffer })
    docxHtml.value = result.value
  } catch (err) {
    console.warn('DOCX 預覽失敗:', err)
    docxError.value =
      err?.message || '無法轉換此 Word 檔，請使用下方按鈕下載後以 Microsoft Word 開啟。'
  } finally {
    docxLoading.value = false
  }
}

watch(currentDoc, (doc) => {
  if (doc?.type === 'docx') {
    loadDocxPreview(doc)
  } else {
    resetDocxPreview()
  }
})

const openViewer = (doc) => {
  currentDoc.value = doc
  document.body.style.overflow = 'hidden'
}

const closeViewer = () => {
  currentDoc.value = null
  resetDocxPreview()
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
.file-card {
  text-align: center;
  padding: 30px 20px;
}
.file-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}
.file-card h3 {
  color: var(--primary-dark);
  margin-bottom: 12px;
  font-size: 1.2rem;
}
.file-type-tag {
  display: inline-block;
  background: #eef3f8;
  color: var(--muted);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
}
.mt-4 {
  margin-top: 24px;
}

.viewer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.viewer-container {
  width: 100%;
  max-width: 1000px;
  height: 80vh;
  background: #fff;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.viewer-container iframe {
  flex: 1;
  width: 100%;
  min-height: 0;
  border: none;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e53e3e;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
}

.docx-preview-panel {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 48px 32px 24px;
}
.docx-html {
  max-width: 720px;
  margin: 0 auto;
  color: var(--text);
  line-height: 1.75;
  font-size: 1rem;
}
.docx-html :deep(p) {
  margin-bottom: 0.75em;
}
.docx-html :deep(h1),
.docx-html :deep(h2),
.docx-html :deep(h3) {
  color: var(--primary-dark);
  margin: 1em 0 0.5em;
}

.viewer-state,
.viewer-hint {
  color: var(--muted);
  line-height: 1.7;
  text-align: center;
}

.download-only {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
}

.viewer-toolbar {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 20px;
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  background: #f8fafc;
}
.viewer-toolbar-hint {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
}
.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}
</style>
