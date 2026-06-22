<template>
  <div class="game-module-wrapper">
    <div v-if="gameState === 'start'" class="screen-content game-fade-in">
      <div class="badge">STRESS TEST</div>
      <h2 class="game-title">浮空碎片消除</h2>
      <p class="game-desc">點擊消除畫面上所有浮空碎片，<br>挑戰你的專注力與反應速度！</p>
      <div class="btn-group">
        <button @click="startGameSession" class="action-btn">
          <i class="fa-solid fa-play"></i> START GAME
        </button>
        <button @click="$emit('back')" class="action-btn outline">🔙 返回大廳</button>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="game-area game-fade-in">
      <div class="header-overlay">
        <h3>系統減壓模塊</h3>
        <p>點擊消除畫面上的浮空碎片 (剩餘: {{ shards.length }})</p>
        <button @click="$emit('back')" class="action-btn outline small">🔙 返回大廳</button>
      </div>

      <div 
        v-for="shard in shards" 
        :key="shard.id"
        class="glass-shard"
        :class="{ 'shattering': shard.isShattering }"
        :style="{
          left: `${shard.x}%`,
          top: `${shard.y}%`,
          width: `${shard.size}px`,
          height: `${shard.size}px`,
          animationDuration: `${shard.duration}s`,
          animationDelay: `${shard.delay}s`
        }"
        @mousedown="shatter(shard)"
        @touchstart.prevent="shatter(shard)"
      >
        <div class="shard-glow" :style="{ background: shard.color }"></div>
      </div>
    </div>

      <div v-else-if="gameState === 'end'" class="screen-content game-fade-in">
        <div class="badge">TEST COMPLETE</div>
        <h2 class="game-title">專注力鑑定報告</h2>
        
        <div class="evaluation-box">
          <h3 style="color: #D9F99D;">✨ 頂尖清道夫</h3>
          <p class="game-desc">
            完美的專注力與執行力！你擁有將混亂轉化為秩序的天賦。<br>
            iPower 的大型專案正需要你這種能迅速掃除障礙的高效人才！
          </p>
        </div>

        <div class="btn-group recruitment-mode" style="margin-top: 20px;">
          <router-link to="/join" class="action-btn join-btn">
            🔥 點我解鎖入社表單
          </router-link>
          <button @click="initShards" class="action-btn outline">再清一次</button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['back'])

const gameState = ref('start') // ✅ 改為 'start' 而不是 'playing'
const shards = ref([])

const colors = [
  'rgba(34, 211, 238, 0.4)', // 青
  'rgba(168, 85, 247, 0.4)', // 紫
  'rgba(255, 0, 122, 0.4)'   // 粉
]

// ✅ 啟動遊戲的方法
const startGameSession = () => {
  gameState.value = 'playing'
  initShards()
}

// 隨機生成碎片
const initShards = () => {
  gameState.value = 'playing'
  shards.value = Array.from({ length: 30 }).map((_, index) => ({
    id: index,
    x: Math.random() * 80 + 10, // 10% ~ 90%
    y: Math.random() * 80 + 10,
    size: Math.random() * 60 + 30, // 40px ~ 90px
    duration: Math.random() * 4 + 3, // 3s ~ 7s
    delay: Math.random() * -5, // 負數讓動畫一開始就有不同進度
    color: colors[Math.floor(Math.random() * colors.length)],
    isShattering: false
  }))
}

// 點擊破碎邏輯
const shatter = (shard) => {
  if (shard.isShattering) return
  shard.isShattering = true
  
  // 等待CSS破碎動畫結束後移除
  setTimeout(() => {
    shards.value = shards.value.filter(s => s.id !== shard.id)
    if (shards.value.length === 0) {
      gameState.value = 'end'
    }
  }, 300)
}

onMounted(() => {
  // ✅ 不自動初始化，等待用戶點擊 START GAME
})
</script>

<style scoped>
.game-module-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; }
.game-fade-in { animation: gameFadeIn 0.5s ease forwards; }
@keyframes gameFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.game-area { position: relative; width: 100%; height: 100%; overflow: hidden; }
.header-overlay { position: absolute; top: 0; left: 0; width: 100%; padding: 24px; text-align: center; z-index: 10; pointer-events: none; }
.header-overlay h3 { color: #fff; margin: 0 0 8px 0; font-size: 1.5rem; }
.header-overlay p { color: #cbd5e1; margin: 0 0 16px 0; font-size: 0.9rem; }
.header-overlay .action-btn { pointer-events: auto; } /* 讓按鈕可以點擊 */

/* 碎片樣式 */
.glass-shard {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  cursor: crosshair;
  transform-origin: center;
  animation: float linear infinite alternate;
  display: flex; justify-content: center; align-items: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.glass-shard:hover { transform: scale(1.1); border-color: rgba(255, 255, 255, 0.5); }
.shard-glow { width: 50%; height: 50%; filter: blur(15px); border-radius: 50%; }

/* 浮動動畫 */
@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-30px) rotate(15deg); }
}

/* 破碎動畫 */
.glass-shard.shattering {
  pointer-events: none;
  animation: shatterAnim 0.3s ease forwards;
}

@keyframes shatterAnim {
  0% { transform: scale(1.1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.8; filter: blur(5px); }
  100% { transform: scale(0); opacity: 0; filter: blur(20px); }
}

/* 結算 */
.screen-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }
.badge { background: rgba(168, 85, 247, 0.1); color: #A855F7; border: 1px solid rgba(168, 85, 247, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px; }
.game-title { font-size: 3.5rem; margin: 0 0 16px 0; color: #fff; background: linear-gradient(135deg, #fff, #A855F7); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; }
.game-desc { color: #cbd5e1; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }

.action-btn { background: linear-gradient(90deg, #A855F7, #22D3EE); color: #fff; border: none; padding: 12px 32px; font-size: 1.1rem; font-weight: 700; border-radius: 999px; cursor: pointer; transition: all 0.3s; }
.action-btn.small { padding: 8px 24px; font-size: 0.9rem; }
.action-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(34, 211, 238, 0.3); }
.action-btn.outline { background: transparent; border: 2px solid rgba(255, 255, 255, 0.2); margin-left: 12px; }
.action-btn.outline:hover { background: rgba(255, 255, 255, 0.1); border-color: #fff; }
.btn-group { display: flex; gap: 16px; }
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