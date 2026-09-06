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
| `GOOGLE_APPS_SCRIPT_URL` | GAS Web App 完整 URL（結尾 `/exec`）。僅設定於 Vercel 或本機伺服器端環境 |
| `GAS_API_TOKEN` | GAS 端 API_TOKEN 的相同值。僅設定於 Vercel 或本機伺服器端環境 |
| `VITE_API_TIMEOUT` | 選用，預設 10000 ms |
| `VITE_API_RETRY_COUNT` | 選用，GET 重試次數，預設 3 |
| `VITE_API_RETRY_DELAY` | 選用，重試間隔 ms |

瀏覽器固定呼叫同網域 `/api/messages`，Vercel serverless function 會代轉至 GAS，因此敏感設定不會被打包到前端。

## 部署（Vercel）

1. Root Directory 設為 `ipower-web`（若 monorepo）
2. 在 Vercel → Settings → Environment Variables 設定上述 `VITE_*` 變數
3. 在 Vercel 設定 `GOOGLE_APPS_SCRIPT_URL`、`GAS_API_TOKEN` 與選用的 `VITE_API_*` 變數；前兩者不可使用 `VITE_` 前綴
4. Build Command：`npm run build`，Output：`dist`
5. push 後自動部署

## Google Apps Script 設定

在 Apps Script 專案的「專案設定 → 指令碼屬性」新增 `API_TOKEN`，並填入隨機產生的長字串。Vercel 的 `GAS_API_TOKEN` 必須填入相同值。請重新部署 GAS Web App 後再更新 Vercel 環境變數。

## 知識庫檔案

- Word `.docx`：站內以 mammoth 預覽
- 簡報：可放 `src/assets/files/` 或改用 Google Slides embed（見 `ResourceView.vue` 的 `cloudDocs`）

## 指令

```sh
npm run dev      # 開發
npm run build    # 正式建置
npm run preview  # 預覽 build
npm run lint     # ESLint + Oxlint
npm run lint:fix # 自動修正可修正的 lint 問題
npm test         # 執行基本邏輯測試
```
