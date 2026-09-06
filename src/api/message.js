// 所有瀏覽器請求都經由同網域 API；GAS URL 與驗證資訊只存在於伺服器端環境變數。
const BASE = '/api/messages'

const MAX_RETRIES = parseInt(import.meta.env.VITE_API_RETRY_COUNT || '3', 10)
const RETRY_DELAY = parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000', 10)
const TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10)

const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return res
  } catch (err) {
    if (retries > 0 && (err.name === 'AbortError' || err instanceof TypeError)) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw err
  }
}

const fetchOnce = async (url, options = {}) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

export const getMessages = async () => {
  try {
    const res = await fetchWithRetry(BASE)
    if (!res.ok) {
      throw new Error(`API 錯誤: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    if (!Array.isArray(data)) {
      throw new Error(data?.message || '伺服器回傳格式錯誤')
    }
    return data
  } catch (err) {
    console.error('取得訊息失敗:', err.message)
    throw new Error('無法連接到伺服器，請稍後重試', { cause: err })
  }
}

export const postMessage = async (data) => {
  try {
    const body = new URLSearchParams()
    Object.entries(data).forEach(([k, v]) => {
      body.append(k, v ?? '')
    })

    const res = await fetchOnce(BASE, {
      method: 'POST',
      body,
    })

    const result = await res.json()
    if (!res.ok || result.status !== 'success') {
      throw new Error(result.message || '送出失敗')
    }
    return result
  } catch (err) {
    console.error('送出訊息失敗:', err.message)
    throw new Error(err.message || '送出失敗，請稍後重試', { cause: err })
  }
}
