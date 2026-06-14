<template>
  <div class="slangsnap-game-layout">
    <div class="neon-orb orb-1"></div>
    <div class="neon-orb orb-2"></div>
    <div class="neon-orb orb-3"></div>

    <main class="glass-board">
      
      <div v-if="activeGame === 'menu'" class="hub-menu game-fade-in">
        <div class="badge">MINIGAME LAB</div>
        <h1 class="hub-title">選擇測試模塊</h1>
        <p class="hub-desc">請選擇您要進行互動測試的系統模塊。</p>
        
        <div class="game-cards-container">
          <div class="game-card active" @click="activeGame = 'floatingShards'">
            <div class="icon">✨</div>
            <h3>浮空碎片消除</h3>
            <p>純視覺減壓測試</p>
            <div class="status highlight">可遊玩</div>
          </div>

          <div class="game-card active" @click="activeGame = 'slangCatcher'">
            <div class="icon">🎮</div>
            <h3>流行語收割機</h3>
            <p>反應力與詞彙測試</p>
            <div class="status highlight">可遊玩</div>
          </div>

          <div class="game-card active" @click="activeGame = 'contextRicochet'">
            <div class="icon">🧱</div>
            <h3>詞意彈射賽</h3>
            <p>物理碰撞運算測試</p>
            <div class="status highlight">可遊玩</div>
          </div>
          <div class="game-card active hacker-style" @click="activeGame = 'FirewallBreach'">
            <div class="icon">💣</div>
            <h3>資安防火牆</h3>
            <p>邏輯與掃雷測試</p>
            <div class="status highlight">可遊玩</div>
          </div>
        </div>
        
        <router-link to="/events" class="back-link">🔙 返回活動總覽</router-link>
      </div>

      <div v-else class="active-game-container game-fade-in">
        <FloatingShards v-if="activeGame === 'floatingShards'" @back="activeGame = 'menu'" />
        <SlangCatcher v-if="activeGame === 'slangCatcher'" @back="activeGame = 'menu'" />
        <ContextRicochet v-if="activeGame === 'contextRicochet'" @back="activeGame = 'menu'" />
        <FirewallBreach v-if="activeGame === 'FirewallBreach'" @back="activeGame = 'menu'" />
      </div>

    </main>
  </div>
</template>

<script setup>
// 👇 確保import都只寫一次
import { ref } from 'vue'
import FloatingShards from '@/components/Minigame/FloatingShards.vue'
import SlangCatcher from '@/components/Minigame/SlangCatcher.vue'
import ContextRicochet from '@/components/Minigame/ContextRicochet.vue'
import FirewallBreach from '@/components/Minigame/FirewallBreach.vue'

// 預設狀態為大廳菜單 ('menu')
const activeGame = ref('menu')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Share+Tech+Mono&family=Space+Grotesk:wght@700&display=swap');
/* 共用佈局保留 */
.slangsnap-game-layout { position: relative; width: 100%; min-height: 100vh; background-color: #05070a; overflow: hidden; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; user-select: none; font-family: 'Space Grotesk', 'Noto Sans TC', sans-serif;}
.neon-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; z-index: 1; animation: neonPulse 12s infinite alternate ease-in-out; }
.orb-1 { width: 45vw; height: 45vw; background: radial-gradient(circle, #ff007a, #7928ca); top: -10%; left: -15%; animation-duration: 14s; }
.orb-2 { width: 40vw; height: 40vw; background: radial-gradient(circle, #00f2fe, #4facfe); bottom: -15%; right: -10%; animation-duration: 18s; animation-delay: 2s; }
.orb-3 { width: 30vw; height: 30vw; background: radial-gradient(circle, #ff0844, transparent); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-duration: 10s; opacity: 0.3; }

@keyframes neonPulse { 0% { transform: scale(1) translate(0, 0); opacity: 0.3; } 50% { transform: scale(1.1) translate(30px, -30px); opacity: 0.6; } 100% { transform: scale(0.9) translate(-20px, 40px); opacity: 0.4; } }

.glass-board {
  position: relative; z-index: 10; width: min(92vw, 900px); max-width: 900px; min-height: 600px; max-height: 86vh;
  background: rgba(20, 25, 35, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 32px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex; flex-direction: column; overflow: hidden;
}

.game-fade-in { animation: gameFadeIn 0.5s ease forwards; }
@keyframes gameFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.hub-menu { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; }
.badge { background: rgba(168, 85, 247, 0.1); color: #A855F7; border: 1px solid rgba(168, 85, 247, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 20px; }
.hub-title { font-size: 3.5rem; margin: 0 0 16px 0; color: #ffffff; font-weight: 900; letter-spacing: 4px; text-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
.hub-desc { color: #cbd5e1; font-size: 1.1rem; margin-bottom: 40px; }

.game-cards-container { display: flex; gap: 24px; width: 100%; max-width: 800px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap; }

.game-card { flex: 1 1 180px; min-width: 0; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 30px 20px; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; cursor: pointer;}

.game-card .icon {font-size: 3rem;margin-bottom: 16px; min-height: 60px; display: flex; align-items: center; justify-content: center;}
.game-card h3 { color: #fff; font-size: 1.3rem; margin: 0 0 8px 0; font-weight: 900; letter-spacing: 2px}
.game-card p {color: #cbd5e1; font-size: 1rem; margin: 0 0 20px 0; margin-bottom: auto;}
.game-card .status { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 700; background: rgba(255,255,255,0.1); color: #cbd5e1; }
.game-card.active { border-color: rgba(34, 211, 238, 0.4); background: rgba(34, 211, 238, 0.05); }
.game-card.active:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(34, 211, 238, 0.2); }
.game-card.active .status.highlight { background: rgba(34, 211, 238, 0.2); color: #22D3EE; }
.game-card.locked { opacity: 0.5; cursor: not-allowed; }
.game-card.locked:hover { transform: none; }

.back-link { color: #94a3b8; text-decoration: none; font-size: 1rem; font-weight: 600; transition: color 0.3s; }
.back-link:hover { color: #fff; }
.active-game-container { width: 100%; height: 100%; }

@media (max-width: 980px) {
  .glass-board {
    width: min(96vw, 900px);
    min-height: 520px;
    max-height: 92vh;
  }

  .hub-menu {
    padding: 24px 16px;
  }

  .hub-title {
    font-size: clamp(1.9rem, 7vw, 2.8rem);
    letter-spacing: 2px;
  }

  .game-cards-container {
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .slangsnap-game-layout {
    min-height: 100svh;
    align-items: stretch;
  }

  .glass-board {
    width: 100%;
    max-width: none;
    min-height: 100svh;
    border-radius: 0;
    max-height: none;
  }

  .hub-menu {
    padding: 18px 14px 24px;
    justify-content: flex-start;
  }

  .hub-title {
    font-size: 1.8rem;
    line-height: 1.15;
  }

  .hub-desc {
    font-size: 0.98rem;
    margin-bottom: 24px;
  }

  .game-card {
    flex: 1 1 100%;
    padding: 18px 14px;
  }

  .game-card h3 {
    font-size: 1.02rem;
    letter-spacing: 1px;
  }

  .game-card p {
    font-size: 0.92rem;
  }
}

.hub-title, .game-title, .badge {font-family: 'Space Grotesk', sans-serif;letter-spacing: 2px; }
.score-number, .score-display strong, .time-display strong, .stat strong {font-family: 'Share Tech Mono', monospace; letter-spacing: 2px }
</style>