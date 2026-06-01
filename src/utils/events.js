/**
 * 事件管理工具模組
 * 封裝日期判定、篩選、排序等邏輯，供多個頁面重複使用
 */

/**
 * 取得當前時間
 * @returns {Date}
 */
export const getNow = () => new Date()

/**
 * 判定事件是否在進行中（startDate <= now <= endDate）
 * @param {Object} event - 事件物件
 * @returns {boolean}
 */
export const isActive = (event) => {
  if (!event?.startDate || !event?.endDate) return false
  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  const now = getNow()
  return now >= start && now <= end
}

/**
 * 判定事件是否已過期（endDate < now）
 * @param {Object} event - 事件物件
 * @returns {boolean}
 */
export const isExpired = (event) => {
  if (!event?.endDate) return false
  const end = new Date(event.endDate)
  const now = getNow()
  return now > end
}

/**
 * 判定事件是否即將到來（startDate > now）
 * @param {Object} event - 事件物件
 * @returns {boolean}
 */
export const isUpcoming = (event) => {
  if (!event?.startDate) return false
  const start = new Date(event.startDate)
  const now = getNow()
  return start > now
}

/**
 * 取得所有進行中的活動（依 order 排序）
 * @param {Array} events - 事件陣列
 * @returns {Array}
 */
export const getActiveEvents = (events) => {
  return events
    .filter(isActive)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

/**
 * 取得最新活動（優先進行中，再看即將到來）
 * 若無進行中的活動，返回最近的即將到來活動；若沒有，返回最後一個完成的活動
 * @param {Array} events - 事件陣列
 * @returns {Object|null}
 */
export const getLatestEvent = (events) => {
  // 1. 優先找進行中活動
  const active = getActiveEvents(events)
  if (active.length) return active[0]

  // 2. 再找最近的即將到來活動
  const upcoming = events
    .filter(isUpcoming)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  if (upcoming.length) return upcoming[0]

  // 3. 改顯示最近一場已結束的精選活動
  const completed = events
    .filter(isExpired)
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
  const featuredCompleted = completed.filter((e) => e.featured)
  if (featuredCompleted.length) return featuredCompleted[0]
  if (completed.length) return completed[0]

  return null
}

/**
 * 取得featured活動用於首頁輪播（依order排序）
 * @param {Array} events-事件陣列
 * @returns {Array}
 */
export const getFeaturedEvents = (events) => {
  return events
    .filter(e => e.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

/**
 * 取得已完成活動（按order倒序）
 * @param {Array} events-事件陣列
 * @returns {Array}
 */
export const getCompletedEvents = (events) => {
  return events
    .filter(isExpired)
    .sort((a, b) => (b.order ?? 999) - (a.order ?? 999))
}

/**
 * 取得所有非過期活動（進行中+即將到來）
 * @param {Array} events-事件陣列
 * @returns {Array}
 */
export const getOngoingEvents = (events) => {
  return events
    .filter(e => !isExpired(e))
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
}
