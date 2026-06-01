<template>
  <div class="game-module-wrapper">
    <div v-if="gameState === 'start'" class="screen-content game-fade-in">
      <div class="badge">SYSTEM READY</div>
      <h2 class="game-title">流行語收割機</h2>
      <p class="game-desc">操作底部的收割器，接住「正向詞彙」獲得積分，<br>避開「系統 Bug」與「負面詞彙」！</p>
      <div class="btn-group">
        <button @click="startGame" class="action-btn">
          <i class="fa-solid fa-play"></i> START GAME
        </button>
        <button @click="$emit('back')" class="action-btn outline">🔙 返回大廳</button>
      </div>
    </div>

    <div 
      v-else-if="gameState === 'playing'" 
      class="game-area game-fade-in"
      ref="gameAreaRef"
      @mousemove="moveCatcher"
      @touchmove.prevent="moveCatcher"
    >
      <div class="game-header">
        <div class="score-display">
          <span>SCORE</span>
          <strong>{{ score }}</strong>
        </div>
        <div class="time-display" :class="{ 'time-low': timeLeft <= 5 }">
          <span>TIME</span>
          <strong>00:{{ timeLeft.toString().padStart(2, '0') }}</strong>
        </div>
      </div>

      <div 
        v-for="item in fallingItems" 
        :key="item.id"
        class="falling-word"
        :class="item.type"
        :style="{ left: `${item.x}px`, top: `${item.y}px` }"
      >
        {{ item.text }}
      </div>

      <div 
        class="catcher"
        :style="{ left: `${catcherX}px` }"
      >
        <div class="catcher-glow"></div>
        <div class="catcher-body">CATCHER</div>
      </div>
    </div>

      <div v-else-if="gameState === 'end'" class="screen-content game-fade-in" ref="resultCardRef" style="padding: 40px 20px;">
        <div class="badge">TEST COMPLETE</div>
        <h2 class="game-title">能力鑑定報告</h2>
        
        <div class="final-score">
          <p>你的系統得分</p>
          <div class="score-number">{{ score }}</div>
        </div>

        <div class="evaluation-box">
          <template v-if="score > 250">
            <h3 style="color: #D9F99D;">🏅 傳說級神手</h3>
            <p class="game-desc">你的反應力簡直封頂了!這種天賦不來辦活動太可惜了吧?iPower核心團隊需要你這種猛將!</p>
          </template>
          <template v-else-if="score > 150">
            <h3 style="color: #22D3EE;">✨ 潛力新星</h3>
            <p class="game-desc">表現很穩！你已經具備了極佳的基礎邏輯。加入iPower培訓計畫，讓我們幫你把技能樹點滿！</p>
          </template>
          <template v-else>
            <h3 style="color: #F87171;">🤖 系統當機中</h3>
            <p class="game-desc">被負能量擊垮了嗎？沒關係！加入iPower社，學長姐手把手帶你跨越各種雷區，進化成大神！</p>
          </template>
        </div>
        
        <div class="btn-group recruitment-mode" style="margin-top: 20px;">
          <router-link to="/join" class="action-btn join-btn" >
            🔥 點我解鎖入社表單
          </router-link>
          
          <button @click="startGame" class="action-btn outline" >再刷一次紀錄</button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'

// 註冊向父層(大廳)發送的事件
defineEmits(['back'])

const gameState = ref('start')
const score = ref(0)
const timeLeft = ref(30)

const gameAreaRef = ref(null)
const catcherX = ref(0)
const catcherWidth = 120
const fallingItems = ref([])
const resultCardRef = ref(null)
const isGeneratingImg = ref(false)

let animationFrameId = null
let timerId = null
let itemIdCounter = 0

const vocabularies = [
  { text: '有料', type: 'good', points: 10 },
  { text: '神級隊友', type: 'good', points: 15 },
  { text: 'U質', type: 'good', points: 10 },
  { text: '創新', type: 'good', points: 20 },
  { text: '關懷', type: 'good', points: 15 },
  { text: 'iPower', type: 'good', points: 40 },
  { text: "理財理心",type:'good', points: 25},
  { text: '芭比Q', type: 'bad', points: -15 },
  { text: '炎上', type: 'bad', points: -15 },
  { text: 'Bug', type: 'bad', points: -20 },
  { text: '水軍', type: 'bad', points: -15 },
  { text: '很秋喔', type: 'bad', points: -35 },
  { text: '關我啥事', type: 'bad', points: -30 },
]

const startGame = () => {
  gameState.value = 'playing'
  score.value = 0
  timeLeft.value = 30
  fallingItems.value = []
  
  nextTick(() => {
    if (gameAreaRef.value) {
      catcherX.value = gameAreaRef.value.clientWidth / 2 - catcherWidth / 2
    }
    gameLoop()
    startTimer()
  })
}

const endGame = () => {
  gameState.value = 'end'
  cancelAnimationFrame(animationFrameId)
  clearInterval(timerId)
}

const startTimer = () => {
  timerId = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) endGame()
  }, 1000)
}

const spawnItem = (areaWidth) => {
  const spawnRate = timeLeft.value > 10 ? 0.04 : 0.06
  if (Math.random() < spawnRate) {
    const vocab = vocabularies[Math.floor(Math.random() * vocabularies.length)]
    fallingItems.value.push({
      id: itemIdCounter++, text: vocab.text, type: vocab.type, points: vocab.points,
      x: Math.random() * (areaWidth - 80), y: -50, speed: 3 + Math.random() * 3
    })
  }
}

const gameLoop = () => {
  if (gameState.value !== 'playing' || !gameAreaRef.value) return
  const areaWidth = gameAreaRef.value.clientWidth
  const areaHeight = gameAreaRef.value.clientHeight

  spawnItem(areaWidth)

  for (let i = fallingItems.value.length - 1; i >= 0; i--) {
    const item = fallingItems.value[i]
    item.y += item.speed
    const catcherY = areaHeight - 40 
    const isXCollide = (item.x + 40 > catcherX.value) && (item.x < catcherX.value + catcherWidth)
    const isYCollide = (item.y + 40 > catcherY) && (item.y < catcherY + 20)

    if (isXCollide && isYCollide) {
      score.value += item.points
      fallingItems.value.splice(i, 1)
    } else if (item.y > areaHeight) {
      if (item.type === 'good') score.value -= 5
      fallingItems.value.splice(i, 1)
    }
  }
  animationFrameId = requestAnimationFrame(gameLoop)
}

const moveCatcher = (e) => {
  if (gameState.value !== 'playing' || !gameAreaRef.value) return
  const rect = gameAreaRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  let x = clientX - rect.left - (catcherWidth / 2)
  if (x < 0) x = 0
  if (x > rect.width - catcherWidth) x = rect.width - catcherWidth
  catcherX.value = x
}
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  clearInterval(timerId)
})
</script>

<style scoped>
.game-module-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; }
.game-fade-in { animation: gameFadeIn 0.5s ease forwards; }
@keyframes gameFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.screen-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }
.badge { background: rgba(34, 211, 238, 0.1); color: #22D3EE; border: 1px solid rgba(34, 211, 238, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px; }
.game-title { font-size: 3.5rem; margin: 0 0 16px 0; color: #fff; background: linear-gradient(135deg, #fff, #A855F7); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; }
.game-desc { color: #cbd5e1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }

.action-btn { background: linear-gradient(90deg, #A855F7, #22D3EE); color: #fff; border: none; padding: 16px 40px; font-size: 1.2rem; font-weight: 700; border-radius: 999px; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3); }
.action-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(34, 211, 238, 0.4); }
.action-btn.outline { background: transparent; border: 2px solid rgba(255, 255, 255, 0.2); box-shadow: none; }
.action-btn.outline:hover { background: rgba(255, 255, 255, 0.1); border-color: #fff; }
.btn-group { display: flex; gap: 16px; }

/* 遊戲進行中 */
.game-area { position: relative; width: 100%; height: 100%; overflow: hidden; touch-action: none; }
.game-header { position: absolute; top: 0; left: 0; width: 100%; padding: 24px 32px; display: flex; justify-content: space-between; z-index: 5; }
.score-display, .time-display { display: flex; flex-direction: column; color: #fff; }
.score-display span, .time-display span { font-size: 0.8rem; color: #94a3b8; letter-spacing: 1px; font-weight: 700; }
.score-display strong, .time-display strong { font-size: 2rem; font-weight: 900; font-variant-numeric: tabular-nums; }
.time-low strong { color: #ff007a; animation: pulseRed 1s infinite; }
@keyframes pulseRed { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

.falling-word { position: absolute; padding: 10px 20px; border-radius: 999px; font-weight: 700; color: #fff; white-space: nowrap; backdrop-filter: blur(8px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.falling-word.good { background: rgba(34, 211, 238, 0.2); border: 1px solid rgba(34, 211, 238, 0.5); text-shadow: 0 0 8px rgba(34, 211, 238, 0.8); }
.falling-word.bad { background: rgba(255, 0, 122, 0.2); border: 1px solid rgba(255, 0, 122, 0.5); text-shadow: 0 0 8px rgba(255, 0, 122, 0.8); }

.catcher { position: absolute; bottom: 20px; width: 120px; height: 20px; border-radius: 10px; pointer-events: none; }
.catcher-body { position: absolute; width: 100%; height: 100%; background: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 900; color: #000; letter-spacing: 2px; z-index: 2; }
.catcher-glow { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #22D3EE; filter: blur(15px); z-index: 1; }

.final-score { margin: 20px 0 40px 0; }
.final-score p { color: #94a3b8; font-size: 1.2rem; margin-bottom: 10px; }
.score-number { font-size: 6rem; font-weight: 900; color: #22D3EE; line-height: 1; text-shadow: 0 0 40px rgba(34, 211, 238, 0.4); }
.evaluation-box { margin-bottom: 10px; }
.join-btn {
  background: linear-gradient(90deg, #ff007a, #ff6a00);
  box-shadow: 0 0 20px rgba(255, 0, 122, 0.4);
  animation: pulseButton 2s infinite;
}
@keyframes pulseButton {
  0% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 0, 122, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(255, 0, 122, 0.6); }
  100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 0, 122, 0.4); }
}
</style>