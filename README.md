# iPower 社團官網 (ipower-web)

致理 iPower 社團官方網站，使用 Vue 3 + Vite 建置，部署於 [Vercel](https://clutipower.vercel.app)。

## 環境需求

- Node.js `^20.19` 或 `>=22.12`

## 本地開發

```sh
cd ipower-web
npm install
cp .env.example .env
# 編輯 .env，填入 Google Apps Script URL 與 JOIN token
npm run dev
```

## 環境變數

| 變數 | 說明 |
|------|------|
| `VITE_GOOGLE_APPS_SCRIPT_URL` | GAS Web App 完整 URL（結尾 `/exec`）。**Vercel 正式環境必填** |
| `VITE_JOIN_FORM_TOKEN` | 報名 API token，需與 GAS 後端一致 |
| `VITE_API_TIMEOUT` | 選用，預設 10000 ms |
| `VITE_API_RETRY_COUNT` | 選用，GET 重試次數，預設 3 |
| `VITE_API_RETRY_DELAY` | 選用，重試間隔 ms |

本地開發若未設定 `VITE_GOOGLE_APPS_SCRIPT_URL`，API 會走 Vite proxy `/api`（見 `vite.config.js`）。

## 部署（Vercel）

1. Root Directory 設為 `ipower-web`（若 monorepo）
2. 在 Vercel → Settings → Environment Variables 設定上述 `VITE_*` 變數
3. Build Command：`npm run build`，Output：`dist`
4. push 後自動部署

## 知識庫檔案

- Word `.docx`：站內以 mammoth 預覽
- 簡報：可放 `src/assets/files/` 或改用 Google Slides embed（見 `ResourceView.vue` 的 `cloudDocs`）

## 指令

```sh
npm run dev      # 開發
npm run build    # 正式建置
npm run preview  # 預覽 build
npm run lint     # ESLint + Oxlint
```
