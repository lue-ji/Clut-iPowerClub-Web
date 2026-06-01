<template>
  <div class="game-module-wrapper hacker-theme">
    <div v-if="gameState === 'start'" class="screen-content game-fade-in">
      <div class="badge danger">WARNING: THREAT DETECTED</div>
      <h2 class="game-title glitch">資安防火牆</h2>
      <p class="game-desc">
        系統底層發現惡意程式碼。<br>
        請找出所有隱藏的「病毒節點 (💣)」。<br>
        標記它們，並掃描所有安全的區塊。
      </p>
      <div class="btn-group">
        <button @click="startGame" class="action-btn hacker-btn">INITIATE SCAN</button>
        <button @click="$emit('back')" class="action-btn outline">🔙 ABORT</button>
      </div>
    </div>

    <div v-else-if="gameState === 'playing' || gameState === 'end'" class="game-area game-fade-in">
      <div class="game-header">
        <div class="status-panel">
          <div class="stat">
            <span>REMAINING</span>
            <strong>{{ minesCount - flagCount }}</strong>
          </div>
          <div class="stat">
            <span>TIME</span>
            <strong>{{ formatTime(elapsedTime) }}</strong>
          </div>
        </div>

        <div class="mode-toggle" v-if="gameState === 'playing'">
          <button :class="{ active: currentMode === 'scan' }" @click="currentMode = 'scan'">🔍 掃描</button>
          <button :class="{ active: currentMode === 'flag' }" @click="currentMode = 'flag'">🚩 標記</button>
        </div>
      </div>

      <div class="minefield-container">
        <div class="minefield" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
          <div 
            v-for="(cell, index) in grid" 
            :key="index"
            class="cell"
            :class="{
              'revealed': cell.isRevealed,
              'mine': cell.isRevealed && cell.isMine,
              'exploded': cell.isExploded,
              'flagged': cell.isFlagged,
              ['num-' + cell.neighborMines]: cell.isRevealed && !cell.isMine && cell.neighborMines > 0
            }"
            @click="handleCellClick(cell.r, cell.c)"
            @contextmenu.prevent="toggleFlag(cell.r, cell.c)"
          >
            <span v-if="cell.isFlagged && !cell.isRevealed">🚩</span>
            <span v-else-if="cell.isRevealed && cell.isMine">💣</span>
            <span v-else-if="cell.isRevealed && cell.neighborMines > 0">{{ cell.neighborMines }}</span>
          </div>
        </div>
      </div>

      <div v-if="gameState === 'end'" class="overlay-result game-fade-in">
        <div class="result-card">
          <h2 :class="isWin ? 'text-success' : 'text-danger'">
            {{ isWin ? 'THREAT NEUTRALIZED' : 'SYSTEM COMPROMISED' }}
          </h2>
          
          <div class="evaluation-box" style="margin: 20px 0;">
            <template v-if="isWin">
              <h3 style="color: #10b981; margin-bottom: 10px;">🛡️ 頂尖守護者</h3>
              <p style="color: #a7f3d0; font-size: 1.05rem;">驚人的邏輯演繹能力！你成功找出了所有隱藏的威脅。iPower 團隊極需像你這樣具備嚴謹思維的菁英！</p>
            </template>
            <template v-else>
              <h3 style="color: #ef4444; margin-bottom: 10px;">💥 觸發警報</h3>
              <p style="color: #fca5a5; font-size: 1.05rem;">百密一疏！解決問題是一場無止境的對抗。一起加入iPower，學習最硬核的技術，下次絕對不會再踩雷！</p>
            </template>
          </div>

          <div class="btn-group" style="justify-content: center; margin-top: 25px;">
            <router-link to="/join" class="action-btn hacker-join-btn">
              🔓 獲取入社權限
            </router-link>
            <button @click="startGame" class="action-btn outline">REBOOT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

defineEmits(['back'])

const gameState = ref('start')
const isWin = ref(false)
const elapsedTime = ref(0)
let timerId = null

const rows = 12
const cols = 12
const minesCount = 24

const grid = ref([])
const flagCount = ref(0)
const currentMode = ref('scan')

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const startGame = () => {
  gameState.value = 'playing'
  isWin.value = false
  elapsedTime.value = 0
  flagCount.value = 0
  currentMode.value = 'scan'
  
  clearInterval(timerId)
  timerId = setInterval(() => elapsedTime.value++, 1000)

  let tempGrid = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tempGrid.push({ r, c, isMine: false, isRevealed: false, isFlagged: false, isExploded: false, neighborMines: 0 })
    }
  }

  let placedMines = 0
  while (placedMines < minesCount) {
    const randomIndex = Math.floor(Math.random() * (rows * cols))
    if (!tempGrid[randomIndex].isMine) {
      tempGrid[randomIndex].isMine = true
      placedMines++
    }
  }

  const getCell = (r, c) => tempGrid.find(cell => cell.r === r && cell.c === c)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cell = getCell(r, c)
      if (cell.isMine) continue
      let count = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const neighbor = getCell(r + i, c + j)
          if (neighbor && neighbor.isMine) count++
        }
      }
      cell.neighborMines = count
    }
  }
  grid.value = tempGrid
}

const getCellRef = (r, c) => grid.value.find(cell => cell.r === r && cell.c === c)

const toggleFlag = (r, c) => {
  if (gameState.value !== 'playing') return
  const cell = getCellRef(r, c)
  if (cell.isRevealed) return
  if (cell.isFlagged) {
    cell.isFlagged = false
    flagCount.value--
  } else if (flagCount.value < minesCount) {
    cell.isFlagged = true
    flagCount.value++
  }
}

const handleCellClick = (r, c) => {
  if (gameState.value !== 'playing') return
  const cell = getCellRef(r, c)
  
  if (currentMode.value === 'flag') return toggleFlag(r, c)
  if (cell.isFlagged || cell.isRevealed) return

  if (cell.isMine) {
    cell.isExploded = true
    return gameOver(false)
  }

  revealCell(r, c)
  checkWin()
}

const revealCell = (startR, startC) => {
  const queue = [[startR, startC]]
  while (queue.length > 0) {
    const [r, c] = queue.shift()
    const cell = getCellRef(r, c)
    if (!cell || cell.isRevealed || cell.isFlagged) continue
    cell.isRevealed = true
    if (cell.neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue
          queue.push([r + i, c + j])
        }
      }
    }
  }
}

const checkWin = () => {
  const revealedCount = grid.value.filter(c => c.isRevealed).length
  if (revealedCount === (rows * cols) - minesCount) gameOver(true)
}

const gameOver = (win) => {
  gameState.value = 'end'
  isWin.value = win
  clearInterval(timerId)
  grid.value.forEach(cell => {
    if (cell.isMine) cell.isRevealed = true
    if (cell.isFlagged && !cell.isMine) cell.isFlagged = false
  })
}

onUnmounted(() => clearInterval(timerId))
</script>

<style scoped>
.game-module-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; }
.game-fade-in { animation: gameFadeIn 0.5s ease forwards; }
@keyframes gameFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.hacker-theme { color: #10b981; }
.hacker-theme .badge.danger { background: rgba(239, 68, 68, 0.2); color: #ef4444; border-color: rgba(239, 68, 68, 0.5); }
.text-danger { color: #ef4444; }
.text-success { color: #10b981; }

.screen-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }
.game-title { font-size: 3.5rem; margin: 0 0 16px 0; color: #10b981; font-weight: 900; letter-spacing: 4px; }
.game-desc { color: #a7f3d0; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }

.hacker-btn { background: #10b981; color: #064e3b; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); border-radius: 4px; }
.hacker-btn:hover { background: #34d399; box-shadow: 0 0 25px rgba(16, 185, 129, 0.6); }

.action-btn { border: none; padding: 12px 32px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.action-btn.outline { background: transparent; border: 2px solid rgba(255, 255, 255, 0.2); color: #fff; margin-left: 12px; border-radius: 4px; }
.action-btn.outline:hover { background: rgba(255, 255, 255, 0.1); }
.btn-group { display: flex; gap: 16px; }

.game-area { position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; padding: 24px; }
.game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.status-panel { display: flex; gap: 24px; }
.stat { display: flex; flex-direction: column; color: #10b981; }
.stat span { font-size: 0.8rem; font-weight: 700; opacity: 0.8; }
.stat strong { font-size: 1.8rem; font-family: monospace; font-weight: 900; }

.mode-toggle { display: flex; background: rgba(0,0,0,0.5); border-radius: 8px; overflow: hidden; border: 1px solid #10b981; }
.mode-toggle button { background: transparent; border: none; color: #6ee7b7; padding: 8px 16px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.mode-toggle button.active { background: #10b981; color: #000; }

.minefield-container { flex-grow: 1; display: flex; justify-content: center; align-items: center; }
.minefield { display: grid; gap: 4px; background: rgba(16, 185, 129, 0.1); padding: 8px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.3); max-width: 100%; }

.cell { width: 36px; height: 36px; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.5); border-radius: 4px; display: flex; justify-content: center; align-items: center; font-weight: 900; font-size: 1.2rem; cursor: pointer; transition: all 0.1s; font-family: monospace; }
@media (max-width: 600px) { .cell { width: 28px; height: 28px; font-size: 1rem; } }
.cell:hover { background: rgba(16, 185, 129, 0.4); }
.cell.revealed { background: rgba(0, 0, 0, 0.4); border-color: rgba(16, 185, 129, 0.2); cursor: default; }
.cell.flagged { background: rgba(239, 68, 68, 0.2); }
.cell.mine { background: rgba(239, 68, 68, 0.4); font-size: 1.5rem; }
.cell.exploded { background: #ef4444; animation: flashRed 0.5s infinite; }
.cell.num-1 { color: #3b82f6; } .cell.num-2 { color: #10b981; } .cell.num-3 { color: #ef4444; } .cell.num-4 { color: #8b5cf6; } .cell.num-5 { color: #f59e0b; } .cell.num-6 { color: #14b8a6; } .cell.num-7 { color: #000; } .cell.num-8 { color: #fff; }
@keyframes flashRed { 0%, 100% { background: #ef4444; } 50% { background: #7f1d1d; } }

.overlay-result { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 20; backdrop-filter: blur(4px); }
.result-card { background: #064e3b; border: 2px solid #10b981; padding: 40px; border-radius: 12px; text-align: center; box-shadow: 0 0 30px rgba(16, 185, 129, 0.3); }
.result-card h2 { font-size: 2.5rem; margin-top: 0; }
.result-card p { color: #a7f3d0; margin-bottom: 30px; font-size: 1.1rem; }
.evaluation-box { margin-bottom: 10px; }
.hacker-join-btn {
  background: linear-gradient(90deg, #10b981, #059669);
  color: #fff;
  border: none;
  text-decoration: none;
  animation: pulseHacker 2s infinite;
}

@keyframes pulseHacker {
  0% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(16, 185, 129, 0.8); }
  100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
}
</style>