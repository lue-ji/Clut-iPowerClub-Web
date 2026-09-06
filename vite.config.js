import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// 使用 Vite 的 loadEnv 讀取 .env 檔案
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const scriptUrl = env.GOOGLE_APPS_SCRIPT_URL || ''
  const gasApiToken = env.GAS_API_TOKEN || ''
  const scriptPath = scriptUrl.replace('https://script.google.com', '')
  const proxyTarget = scriptUrl && gasApiToken
    ? {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: () => `${scriptPath}${scriptPath.includes('?') ? '&' : '?'}token=${encodeURIComponent(gasApiToken)}`,
      }
    : undefined

  return {
    plugins: [
      vue(),
      //vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: proxyTarget ? { '/api/messages': proxyTarget } : {},
    },
    assetsInclude: [
      '**/*.pdf',
      '**/*.doc',
      '**/*.docx',
      '**/*.xls',
      '**/*.xlsx',
      '**/*.ppt',
      '**/*.pptx',
      '**/*.zip',
      '**/*.txt'
    ]
  }
})
