#!/usr/bin/env node

/**
 * 事件歸檔腳本
 * 用途：掃描 src/data/events.js，找出所有已過期的事件，並：
 *   1. 將過期事件移至 public/events_archive.json
 *   2. 選項 A（推薦）：生成新的 events.generated.json，供前端使用（自動更新，無需手動改 events.js）
 *   3. 選項 B：在終端輸出需要從 events.js 移除的事件列表，讓使用者手動刪除
 *
 * 用法：
 *   npm run archive:events          # 執行歸檔，生成 events.generated.json
 *   npm run archive:events -- --dry # 只預覽，不執行更改
 */

const fs = require('fs')
const path = require('path')

// 配置檔路徑
const eventsPath = path.join(__dirname, '../src/data/events.js')
const archivePath = path.join(__dirname, '../public/events_archive.json')
const generatedPath = path.join(__dirname, '../src/data/events.generated.json')

// 檢查命令行參數
const isDryRun = process.argv.includes('--dry')

// 讀取 events.js 內容（簡單解析）
function readEventsFile() {
  try {
    const content = fs.readFileSync(eventsPath, 'utf-8')
    
    // 使用 require 的技巧：寫入臨時 JSON，讀取後刪除
    // 或直接用正則提取 export const events = [...]
    // 為了簡單，我們使用 eval 的安全替代方案
    
    // 提取 events 陣列部分
    const match = content.match(/export\s+const\s+events\s*=\s*(\[[\s\S]*\])\s*$/m)
    if (!match) {
      console.error('❌ 無法解析 events.js，確保格式為 export const events = [...]')
      process.exit(1)
    }

    // 透過 Function 建構子安全求值(避免直接eval)
    const eventsCode = match[1]
    const events = Function(`return ${eventsCode}`)()
    return events
  } catch (error) {
    console.error('❌ 讀取 events.js 失敗:', error.message)
    process.exit(1)
  }
}

// 判定事件是否已過期
function isExpired(event) {
  if (!event?.endDate) return false
  const end = new Date(event.endDate)
  const now = new Date()
  return now > end
}

// 執行歸檔邏輯
function archiveEvents() {
  console.log('🔍 掃描事件中...')
  
  const events = readEventsFile()
  const expired = events.filter(isExpired)
  const active = events.filter(e => !isExpired(e))

  if (expired.length === 0) {
    console.log('✅ 沒有過期的事件需要歸檔')
    return
  }

  console.log(`📦 發現 ${expired.length} 個過期事件`)

  if (isDryRun) {
    console.log('\n📋 過期事件列表（--dry 模式，未執行更改）：')
    expired.forEach(e => {
      console.log(`  • ${e.title} (${e.slug}) - 截至 ${e.endDate}`)
    })
    console.log('\n✨ 檢查完成（未更改任何檔案）')
    return
  }

  // 讀取現有的 archive JSON
  let archive = []
  if (fs.existsSync(archivePath)) {
    try {
      archive = JSON.parse(fs.readFileSync(archivePath, 'utf-8'))
    } catch (error) {
      console.warn('⚠️  events_archive.json 格式錯誤，將建立新檔案')
    }
  }

  // 合併過期事件到 archive（去重）
  const archivedSlugs = new Set(archive.map(e => e.slug))
  const newArchive = [
    ...archive,
    ...expired.filter(e => !archivedSlugs.has(e.slug))
  ]

  // 寫入 archive JSON
  const publicDir = path.join(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  try {
    fs.writeFileSync(archivePath, JSON.stringify(newArchive, null, 2), 'utf-8')
    console.log(`✅ 已歸檔 ${expired.length} 個事件至 public/events_archive.json`)
  } catch (error) {
    console.error('❌ 寫入 archive 失敗:', error.message)
    process.exit(1)
  }

  // 生成 events.generated.json（供前端使用）
  const srcDataDir = path.join(__dirname, '../src/data')
  if (!fs.existsSync(srcDataDir)) {
    fs.mkdirSync(srcDataDir, { recursive: true })
  }

  try {
    fs.writeFileSync(generatedPath, JSON.stringify(active, null, 2), 'utf-8')
    console.log(`✅ 已生成 src/data/events.generated.json（${active.length} 個活躍事件）`)
  } catch (error) {
    console.error('❌ 寫入 events.generated.json 失敗:', error.message)
    process.exit(1)
  }

  // 輸出建議
  console.log('\n📝 後續建議：')
  console.log('  1. 檢查 src/data/events.generated.json，確保內容正確')
  console.log('  2. 在 src/data/events.js 或 HomeView.vue 中，改為匯入 events.generated.json（可選）')
  console.log('  3. 若要自動化，可在 CI/CD 部署前執行此腳本')
  console.log(`\n🎉 歸檔完成！`)
}

// 執行
archiveEvents()
