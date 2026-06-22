<template>
  <div class="game-module-wrapper">
    <div v-if="gameState === 'start'" class="screen-content game-fade-in">
      <div class="badge">PHYSICS TEST</div>
      <h2 class="game-title">詞意彈射賽</h2>
      <p class="game-desc">滑動底部擋板反彈「解析球」，擊碎所有漂浮的「誤解方塊」。<br>漏接球將導致測試失敗！</p>
      <div class="btn-group">
        <button @click="startGame" class="action-btn"><i class="fa-solid fa-play"></i> START GAME</button>
        <button @click="$emit('back')" class="action-btn outline">🔙 返回大廳</button>
      </div>
    </div>

    <div 
      v-else-if="gameState === 'playing'" 
      class="game-area game-fade-in"
      ref="gameAreaRef"
      @mousemove="movePaddle"
      @touchmove.prevent="movePaddle"
    >
      <div class="game-header">
        <div class="score-display">
          <span>SCORE</span><strong>{{ score }}</strong>
        </div>
      </div>

      <div 
        v-for="block in blocks" 
        :key="block.id"
        class="block"
        v-show="block.active"
        :style="{ left: `${block.x}px`, top: `${block.y}px`, width: `${block.w}px`, height: `${block.h}px` }"
      >
        <div class="block-inner"></div>
      </div>

      <div class="ball" :style="{ left: `${ball.x}px`, top: `${ball.y}px` }"></div>

      <div class="paddle" :style="{ left: `${paddleX}px` }"></div>
    </div>

    <div v-else-if="gameState === 'end'" class="screen-content game-fade-in">
      <div class="badge">{{ isWin ? 'TEST COMPLETE' : 'SYSTEM FAILURE' }}</div>
      <h2 class="game-title">{{ isWin ? '精準打擊報告' : '漏洞分析報告' }}</h2>
      
      <div class="final-score">
        <p>最終得分</p>
        <div class="score-number">{{ score }}</div>
      </div>

      <div class="evaluation-box">
        <template v-if="isWin">
          <h3 style="color: #D9F99D;">🎯 預判大師</h3>
          <p class="game-desc">零失誤！你具備絕佳的策略預判與精準度。加入iPower企劃或技術組，每一次出擊都完美命中目標！</p>
        </template>
        <template v-else>
          <h3 style="color: #F87171;">📉 經驗值 +1</h3>
          <p class="game-desc">哎呀，漏接了！在實戰開發中難免遇到突發狀況。一起加入iPower，有最強的團隊當你的後盾，讓我們陪你一起成長！</p>
        </template>
      </div>

      <div class="btn-group recruitment-mode" style="margin-top: 20px;">
        <router-link to="/join" class="action-btn join-btn">
          🔥 點我解鎖入社表單
        </router-link>
        <button @click="startGame" class="action-btn outline">再挑戰一次</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'

defineEmits(['back'])

const gameState = ref('start')
const score = ref(0)
const isWin = ref(false)

const gameAreaRef = ref(null)
let animationFrameId = null

// 遊戲物件狀態
const paddleX = ref(0)
const paddleWidth = 100
const ball = ref({ x: 0, y: 0, vx: 4, vy: -4, size: 16 })
const blocks = ref([])

// 初始化遊戲
const startGame = () => {
  gameState.value = 'playing'
  score.value = 0
  isWin.value = false
  
  nextTick(() => {
    if (!gameAreaRef.value) {
      console.error('❌ gameAreaRef 未加載，重試中...')
      setTimeout(() => {
        if (gameAreaRef.value) {
          initializeGame()
          gameLoop()
        }
      }, 100)
      return
    }
    initializeGame()
    gameLoop()
  })
}

// ✅ 提取初始化邏輯為獨立方法
const initializeGame = () => {
  if (!gameAreaRef.value) return
  
  const areaWidth = gameAreaRef.value.clientWidth
  const areaHeight = gameAreaRef.value.clientHeight
  
  // 初始化擋板與球
  paddleX.value = areaWidth / 2 - paddleWidth / 2
  ball.value = { x: areaWidth / 2 - 8, y: areaHeight - 60, vx: 5, vy: -5, size: 16 }
  
  // 生成磚塊 (4行 x 6列)
  blocks.value = []
  const cols = 6
  const rows = 4
  const blockW = (areaWidth - 40) / cols - 10
  const blockH = 25
  let id = 0
  for(let r = 0; r < rows; r++) {
    for(let c = 0; c < cols; c++) {
      blocks.value.push({
        id: id++,
        x: 20 + c * (blockW + 10),
        y: 60 + r * (blockH + 10),
        w: blockW, h: blockH, active: true
      })
    }
  }
}

// 核心物理迴圈
const gameLoop = () => {
  if (gameState.value !== 'playing' || !gameAreaRef.value) return
  
  const areaWidth = gameAreaRef.value.clientWidth
  const areaHeight = gameAreaRef.value.clientHeight

  // 移動球
  ball.value.x += ball.value.vx
  ball.value.y += ball.value.vy

  // 牆壁碰撞 (左右上)
  if (ball.value.x <= 0 || ball.value.x + ball.value.size >= areaWidth) ball.value.vx *= -1
  if (ball.value.y <= 0) ball.value.vy *= -1

  // 擋板碰撞
  const paddleY = areaHeight - 30
  if (
    ball.value.y + ball.value.size >= paddleY &&
    ball.value.y + ball.value.size <= paddleY + 10 &&
    ball.value.x + ball.value.size >= paddleX.value &&
    ball.value.x <= paddleX.value + paddleWidth
  ) {
    ball.value.vy = -Math.abs(ball.value.vy) // 強制往上彈
    // 根據擊中擋板的位置改變 X 軸速度，增加可控性
    let hitPoint = (ball.value.x + ball.value.size / 2) - (paddleX.value + paddleWidth / 2)
    ball.value.vx = hitPoint * 0.15 
  }

  // 底部出界 (Game Over)
  if (ball.value.y > areaHeight) {
    gameState.value = 'end'
    isWin.value = false
    return
  }

  // 磚塊碰撞 (簡單 AABB)
  let activeBlocks = 0
  for (let block of blocks.value) {
    if (block.active) {
      activeBlocks++
      if (
        ball.value.x + ball.value.size > block.x &&
        ball.value.x < block.x + block.w &&
        ball.value.y + ball.value.size > block.y &&
        ball.value.y < block.y + block.h
      ) {
        block.active = false
        ball.value.vy *= -1 // 反彈
        score.value += 10
        break // 一次只撞一個
      }
    }
  }

  // 勝利判定
  if (activeBlocks === 0) {
    gameState.value = 'end'
    isWin.value = true
    return
  }

  animationFrameId = requestAnimationFrame(gameLoop)
}

// 擋板操控
const movePaddle = (e) => {
  if (gameState.value !== 'playing' || !gameAreaRef.value) return
  const rect = gameAreaRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  let x = clientX - rect.left - (paddleWidth / 2)
  if (x < 0) x = 0
  if (x > rect.width - paddleWidth) x = rect.width - paddleWidth
  paddleX.value = x
}

onUnmounted(() => { cancelAnimationFrame(animationFrameId) })
</script>

<style scoped>
/* 共用樣式與字體 */
.game-module-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; }
.game-fade-in { animation: gameFadeIn 0.5s ease forwards; }
@keyframes gameFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.screen-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }
.badge { background: rgba(34, 211, 238, 0.1); color: #22D3EE; border: 1px solid rgba(34, 211, 238, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px; }
.game-title { font-size: 3.5rem; margin: 0 0 16px 0; color: #fff; font-weight: 900; }
.game-desc { color: #cbd5e1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }
.btn-group { display: flex; gap: 16px; }

.action-btn { background: linear-gradient(90deg, #A855F7, #22D3EE); color: #fff; border: none; padding: 12px 32px; font-size: 1.1rem; font-weight: 700; border-radius: 999px; cursor: pointer; transition: all 0.3s; }
.action-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(34, 211, 238, 0.3); }
.action-btn.outline { background: transparent; border: 2px solid rgba(255, 255, 255, 0.2); }
.action-btn.outline:hover { background: rgba(255, 255, 255, 0.1); border-color: #fff; }

.final-score { margin: 20px 0 40px 0; }
.final-score p { color: #94a3b8; font-size: 1.2rem; margin-bottom: 10px; }
.score-number { font-size: 6rem; font-weight: 900; color: #22D3EE; line-height: 1; text-shadow: 0 0 40px rgba(34, 211, 238, 0.4); }

/* --- 遊戲進行中 UI --- */
.game-area { position: relative; width: 100%; height: 100%; overflow: hidden; touch-action: none; cursor: crosshair; }
.game-header { position: absolute; top: 0; left: 0; width: 100%; padding: 16px 24px; pointer-events: none; }
.score-display { color: #fff; display: flex; flex-direction: column; }
.score-display span { font-size: 0.8rem; color: #94a3b8; font-weight: 700; }
.score-display strong { font-size: 1.8rem; font-weight: 900; }

/* 方塊 (Blocks) */
.block { position: absolute; padding: 2px; }
.block-inner {
  width: 100%; height: 100%;
  background: rgba(168, 85, 247, 0.3);
  border: 1px solid rgba(168, 85, 247, 0.6);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
}

/* 彈珠 (Ball) */
.ball {
  position: absolute; width: 16px; height: 16px;
  background: #22D3EE; border-radius: 50%;
  box-shadow: 0 0 15px #22D3EE, 0 0 30px #22D3EE;
}

/* 擋板 (Paddle) */
.paddle {
  position: absolute; bottom: 30px; width: 100px; height: 12px;
  background: #fff; border-radius: 6px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}
.evaluation-box { margin-bottom: 10px; }
.join-btn {
  background: linear-gradient(90deg, #ff007a, #ff6a00);
  box-shadow: 0 0 20px rgba(255, 0, 122, 0.4);
  animation: pulseButton 2s infinite;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@keyframes pulseButton {
  0% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 0, 122, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(255, 0, 122, 0.6); }
  100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 0, 122, 0.4); }
}
</style>