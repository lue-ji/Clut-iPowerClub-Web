<template>
  <div class="staff-view">
    <section class="hero staff-hero">
      <div class="ambient-glow glow-1"></div>
      <div class=" ambient-glow glow-2"></div>
      <div class="page hero-inner relative-z">
        <span class="hero-badge fade-in">Our Team</span>
        <h1 class="hero-title fade-in">認識 iPower 團隊</h1>
        <p class="hero-text fade-in">
          一群熱愛挑戰、喜歡看見笑容的夥伴。我們在幕後努力，只為給你最好的活動體驗。
        </p>
      </div>
    </section>

    <section v-if="president" class="section president-section">
      <div class="page">
        <p class="section-label fade-in">Leadership</p>
        <h2 class="section-heading fade-in">社長</h2>
        <div class="president-spotlight fade-in">
          <div class="president-glow president-glow-1"></div>
          <div class="president-glow president-glow-2"></div>
          <div class="president-glow president-glow-3"></div>
          <div class="president-card">
            <div class="president-layout">
              <div class="president-visual">
                <span class="president-crown" aria-hidden="true">★</span>
                <div class="avatar-wrap president-avatar-wrap">
                  <img :src="president.avatar || defaultAvatar" :alt="president.name" class="avatar" />
                </div>
              </div>
              <div class="president-body">
                <div class="president-intro">
                  <span class="president-badge">社團負責人</span>
                  <h3 class="president-name">{{ president.name }}</h3>
                  <div class="tags-wrap president-tags">
                    <span v-for="tag in president.tags" :key="tag" class="staff-tag">#{{ tag }}</span>
                  </div>
                </div>
                <div class="staff-details president-details">
                  <p class="duty"><strong>職責：</strong>{{ president.duty }}</p>
                  <p class="desc">{{ president.desc }}</p>
                  <p class="quote">「{{ president.quote }}」</p>
                  <a
                    v-if="president.ig"
                    :href="`https://instagram.com/${president.ig.replace('@', '').replace('IG:', '')}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ig-link"
                  >
                    {{ president.ig.includes('IG:') ? president.ig : 'IG:' + president.ig }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section ip-bg-blue">
      <div class="page">
        <h2 v-if="president" class="team-grid-heading fade-in">核心團隊</h2>
        <div class="grid grid-3">
          <div
            v-for="(member, index) in otherStaff"
            :key="index"
            class="card ip-glass-card staff-card-full fade-in"
          >
            <div class="avatar-wrap">
              <img :src="member.avatar || defaultAvatar" :alt="member.name" class="avatar" />
            </div>

            <h3 class="staff-name">{{ member.name }}</h3>
            <p class="staff-role">{{ member.role }}</p>

            <div class="tags-wrap">
              <span v-for="tag in member.tags" :key="tag" class="staff-tag">#{{ tag }}</span>
            </div>

            <div class="staff-details">
              <p class="duty"><strong>職責：</strong>{{ member.duty }}</p>
              <p class="desc">{{ member.desc }}</p>
              <p class="quote">「{{ member.quote }}」</p>

              <a
                v-if="member.ig"
                :href="`https://instagram.com/${member.ig.replace('@', '').replace('IG:', '')}`"
                target="_blank"
                class="ig-link"
              >
                {{ member.ig.includes('IG:') ? member.ig : 'IG:' + member.ig }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import viceImg from '@/assets/staff/vice.jpg'
import presidentImg from '@/assets/staff/president.jpg'
import activityImg from '@/assets/staff/activity.jpg'
import lightimg from '@/assets/staff/light.jpg'

const defaultAvatar = 'https://i.pravatar.cc/150'

const staffList = ref([
  {
    name: '李韋靜',
    role: '社長',
    avatar: presidentImg,
    tags: ['溫暖小太陽', '團隊成長', '超級爵士鼓手'],
    duty: '統籌社團方向與團隊協作',
    desc: '喜歡帶著團隊一起成長，也希望每位成員都能在社團裡找到自己的位置。\n\n平常會協助整體規劃與內部溝通。',
    quote: '團隊一起成長，比一個人走更遠',
    ig: 'IG:@flower_cony.130',
  },
  {
    name: '陸聖傑',
    role: '副社長',
    avatar: viceImg,
    tags: ['網頁設計師', '程式設計控', '資安爆破大師[to致理](尚未開始)'],
    duty: '協助社長推動社務與成員連結',
    desc: '熱愛活動與人際互動，喜歡讓大家在參與中更認識彼此。\n\n也會協助現場氣氛與活動支援。',
    quote: '讓每一次參與，都成為一次靠近',
    ig: 'IG:@foo_axol',
  },
  {
    name: '馮聖裕',
    role: '社團代言人',
    avatar: activityImg,
    tags: ['五子棋國手', '笑話大師', '重度卡娜赫拉控'],
    duty: '負責卡娜赫拉、五子棋與講笑話',
    desc: '希望每場活動都充滿笑聲，讓大家留下美好的回憶。\n\n從分享個人愛好到引入話題，都會全力以赴。',
    quote: '細節做好，體驗就會被記住',
    ig: 'IG:@vudjp850419',
  },
  {
    name: '江品萱',
    role: '社團神秘幕後',
    avatar: '',
    tags: ['財務管理', '溫柔關心', '默默守護'],
    duty: '負責財務管理、與社員多重關心連結',
    desc: '在團隊中默默補上各種重要細節，讓社團運作更穩定，也讓夥伴之間更有連結。',
    quote: '把細節做好，也是在愛人',
    ig: '',
  },
  {
    name: '李曉光',
    role: '社團顧問',
    avatar: lightimg,
    tags: ['陪伴成長', '方向引導', '經驗分享'],
    duty: '陪伴社團成長，提供方向與建議',
    desc: '透過經驗與觀點陪伴團隊前進，在需要的時候給予支持與提醒。',
    quote: '看見每個人的潛力，也相信團隊的可能',
    ig: '',
  },
  {
    name: '張博智',
    role: '社團行政扛霸子',
    avatar: '',
    tags: ['流程控', '執行力', '行政擔當'],
    duty: '協助行政、流程安排與內部支援',
    desc: '擅長把繁雜的事情整理清楚，讓活動和社務推進得更順。',
    quote: '把事情做好，團隊就能走得更穩',
    ig: '',
  },
])

const president = computed(() => staffList.value.find((m) => m.role === '社長'))
const otherStaff = computed(() => staffList.value.filter((m) => m.role !== '社長'))
</script>

<style scoped>
.staff-hero {
  position: relative;
  background: #091321;
  padding: 120px 0 100px;
  overflow: hidden;
  text-align: center;
}
.glow-1 {
  width: 450px;
  height: 450px;
  background: rgba(35, 77, 116, 0.6);
  top: -10%;
  left: 10%;
}
.glow-2 {
  width: 350px;
  height: 350px;
  background: rgba(138, 99, 210, 0.4);
  bottom: -10%;
  right: 10%;
}

.president-section {
  padding-top: 56px;
  padding-bottom: 32px;
}

.section-label {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #22d3ee;
  margin-bottom: 8px;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.5);
}

.section-heading {
  text-align: center;
  color: var(--primary-dark);
  font-weight: 900;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 36px;
  text-shadow: 0 0 24px rgba(35, 77, 116, 0.25);
}

.team-grid-heading {
  text-align: center;
  color: var(--primary-dark);
  font-weight: 800;
  font-size: 1.75rem;
  margin-top: 8px;
  margin-bottom: 32px;
}

.president-spotlight {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
}

.president-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(48px);
  pointer-events: none;
  z-index: 0;
}
.president-glow-1 {
  width: 280px;
  height: 280px;
  background: rgba(0, 242, 254, 0.22);
  top: -40px;
  left: -20px;
  animation: president-orb-float 8s ease-in-out infinite;
}
.president-glow-2 {
  width: 220px;
  height: 220px;
  background: rgba(251, 191, 36, 0.28);
  bottom: -30px;
  right: 10%;
  animation: president-orb-float 7s ease-in-out infinite;
}
.president-glow-3 {
  width: 200px;
  height: 200px;
  background: rgba(255, 0, 122, 0.22);
  top: 38%;
  right: -30px;
  animation: president-orb-float 9s ease-in-out infinite reverse;
}

@keyframes president-orb-float {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.85;
  }
  50% {
    transform: translateY(-12px);
    opacity: 1;
  }
}

.president-card {
  position: relative;
  z-index: 1;
  padding: 48px 36px;
  border-radius: var(--radius-xl);
  background: linear-gradient(145deg, #081420 0%, #0f2438 40%, #17324c 100%);
  border: 1px solid rgba(0, 242, 254, 0.35);
  box-shadow:
    0 24px 48px rgba(9, 19, 33, 0.35),
    0 0 24px rgba(0, 242, 254, 0.12),
    0 0 48px rgba(255, 0, 122, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  animation: president-neon-pulse 4.5s ease-in-out infinite;
  overflow: hidden;
}

.president-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0, 242, 254, 0.12), transparent 55%),
    radial-gradient(ellipse 60% 40% at 90% 100%, rgba(255, 0, 122, 0.1), transparent 50%);
  pointer-events: none;
}

.president-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 242, 254, 0.9),
    rgba(252, 211, 77, 0.9),
    rgba(255, 0, 122, 0.8),
    transparent
  );
  opacity: 0.85;
}

@keyframes president-neon-pulse {
  0%,
  100% {
    border-color: rgba(0, 242, 254, 0.35);
    box-shadow:
      0 24px 48px rgba(9, 19, 33, 0.35),
      0 0 20px rgba(0, 242, 254, 0.15),
      0 0 40px rgba(255, 0, 122, 0.06);
  }
  50% {
    border-color: rgba(0, 242, 254, 0.55);
    box-shadow:
      0 28px 52px rgba(9, 19, 33, 0.4),
      0 0 32px rgba(0, 242, 254, 0.28),
      0 0 56px rgba(255, 0, 122, 0.14);
  }
}

@media (prefers-reduced-motion: reduce) {
  .president-card,
  .president-glow-1,
  .president-glow-2,
  .president-glow-3,
  .president-crown {
    animation: none;
  }
}

.president-layout {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.president-visual {
  position: relative;
  flex-shrink: 0;
}

.president-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.president-intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.president-tags {
  justify-content: center;
  margin-bottom: 0;
}

.president-crown {
  position: absolute;
  top: -10px;
  right: 4px;
  z-index: 2;
  font-size: 1.5rem;
  color: #fde047;
  text-shadow:
    0 0 12px rgba(252, 211, 77, 0.9),
    0 0 24px rgba(0, 242, 254, 0.4);
  line-height: 1;
  animation: crown-glow 2.5s ease-in-out infinite;
}

@keyframes crown-glow {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.25);
  }
}

.president-card .president-details {
  width: 100%;
  text-align: center;
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.president-card .president-details::before {
  content: '';
  display: block;
  height: 2px;
  margin-bottom: 24px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 242, 254, 0.85),
    rgba(255, 0, 122, 0.75),
    transparent
  );
  box-shadow: 0 0 12px rgba(0, 242, 254, 0.35);
}

@media (min-width: 768px) {
  .president-card {
    padding: 52px 48px;
  }

  .president-layout {
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
  }

  .president-body {
    flex: 1;
    align-items: flex-start;
    text-align: left;
  }

  .president-intro {
    align-items: flex-start;
  }

  .president-tags {
    justify-content: flex-start;
  }

  .president-card .president-details {
    text-align: left;
    align-self: stretch;
  }
}

.president-avatar-wrap {
  width: 168px;
  height: 168px;
  margin: 0;
  border: 3px solid rgba(0, 242, 254, 0.65);
  box-shadow:
    0 0 0 4px rgba(255, 0, 122, 0.25),
    0 0 24px rgba(0, 242, 254, 0.35),
    0 0 40px rgba(252, 211, 77, 0.2),
    0 16px 40px rgba(0, 0, 0, 0.4);
}

@media (min-width: 768px) {
  .president-avatar-wrap {
    width: 200px;
    height: 200px;
  }
}

.president-badge {
  display: inline-block;
  margin-bottom: 14px;
  padding: 8px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fde047 0%, #f59e0b 100%);
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 0 16px rgba(245, 158, 11, 0.5),
    0 0 28px rgba(252, 211, 77, 0.25);
}

.president-name {
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  text-shadow:
    0 0 20px rgba(0, 242, 254, 0.5),
    0 0 36px rgba(255, 0, 122, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.35);
}

.president-card .staff-tag {
  background: rgba(0, 242, 254, 0.1);
  color: #f0f9ff;
  border: 1px solid rgba(0, 242, 254, 0.45);
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.12);
}

.president-card .staff-details {
  color: #f1f5f9;
  text-align: inherit;
  font-size: 1rem;
}

.president-card .duty {
  color: #ffffff;
  font-size: 1.05rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
}

.president-card .duty strong {
  color: #67e8f9;
}

.president-card .desc {
  color: #e2e8f0;
  line-height: 1.85;
}

.president-card .quote {
  color: #fef08a;
  font-size: 1.1rem;
  text-shadow: 0 0 16px rgba(254, 240, 138, 0.35);
}

.president-card .ig-link {
  color: #22d3ee;
  font-weight: 800;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.4);
}
.president-card .ig-link:hover {
  color: #a5f3fc;
  text-shadow: 0 0 18px rgba(165, 243, 252, 0.6);
}

.staff-card-full {
  padding: 40px 24px;
  text-align: center;
}

.avatar-wrap {
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.staff-name {
  font-size: 1.4rem;
  color: var(--primary-dark);
  margin-bottom: 4px;
  font-weight: 800;
}
.staff-role {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 18px;
  font-size: 1.05rem;
}

.tags-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}
.staff-tag {
  background: rgba(35, 77, 116, 0.08);
  color: var(--primary-dark);
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.staff-details {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--muted);
  text-align: center;
}

.duty {
  color: var(--primary-dark);
  margin-bottom: 16px;
  font-weight: 700;
}
.desc {
  margin-bottom: 24px;
  white-space: pre-line;
}

.quote {
  font-style: italic;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--primary-dark);
}

.ig-link {
  display: inline-block;
  color: var(--primary);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
}
.ig-link:hover {
  text-decoration: underline;
}
</style>
