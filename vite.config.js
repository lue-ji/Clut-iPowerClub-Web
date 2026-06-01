import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 使用 Vite 的 loadEnv 讀取 .env 檔案
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const scriptUrl = env.VITE_GOOGLE_APPS_SCRIPT_URL || ''
  const scriptPath = scriptUrl.replace('https://script.google.com', '')

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
      proxy: {
        '/api': {
          target: 'https://script.google.com',
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', scriptPath)
        }
      }
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
