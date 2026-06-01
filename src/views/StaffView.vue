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

    <section class="section ip-bg-blue">
      <div class="page">
        <div class="grid grid-3">
          <div v-for="(member, index) in staffList" :key="index" class="card ip-glass-card staff-card-full fade-in">
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
              
              <a v-if="member.ig" :href="`https://instagram.com/${member.ig.replace('@', '').replace('IG:', '')}`" target="_blank" class="ig-link">
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
import { ref } from 'vue'

// 1. 引入本地圖片 (請確認路徑是否符合你的專案結構)
import viceImg from '@/assets/staff/vice.jpg'
import presidentImg from '@/assets/staff/president.jpg'
import activityImg from '@/assets/staff/activity.jpg'
import lightimg from '@/assets/staff/light.jpg'

// 沒有照片時的預設替換圖
const defaultAvatar = 'https://i.pravatar.cc/150'

// 2. 將引入的圖片變數放入 avatar 屬性中
const staffList = ref([
  { 
    name: '陸聖傑', role: '副社長', avatar: viceImg, 
    tags: ['網頁設計師', '程式設計控', '資安爆破大師[to致理](尚未開始)'],
    duty: '協助社長推動社務與成員連結',
    desc: '熱愛活動與人際互動，喜歡讓大家在參與中更認識彼此。\n\n也會協助現場氣氛與活動支援。',
    quote: '讓每一次參與，都成為一次靠近',
    ig: 'IG:@foo_axol'
  },
  { 
    name: '李韋靜', role: '社長', avatar: presidentImg, 
    tags: ['溫暖小太陽', '團隊成長', '超級爵士鼓手', '輕度卡納赫拉控'],
    duty: '統籌社團方向與團隊協作',
    desc: '喜歡帶著團隊一起成長，也希望每位成員都能在社團裡找到自己的位置。\n\n平常會協助整體規劃與內部溝通。',
    quote: '團隊一起成長，比一個人走更遠',
    ig: 'IG:@flower_cony.130'
  },
  { 
    name: '馮聖裕', role: '社團代言人', avatar: activityImg, // 換上真實照片
    tags: ['五子棋國手', '笑話大師', '重度卡娜赫拉控'],
    duty: '負責卡娜赫拉、五子棋與講笑話',
    desc: '希望每場活動都充滿笑聲，讓大家留下美好的回憶。\n\n從分享個人愛好到引入話題，都會全力以赴。',
    quote: '細節做好，體驗就會被記住',
    ig: 'IG:@vudjp850419'
  },
  { 
    name: '江品萱', role: '社團神秘幕後', avatar: '', // 尚未有照片，會自動使用 defaultAvatar
    tags: ['財務管理', '溫柔關心', '默默守護'],
    duty: '負責財務管理、與社員多重關心連結',
    desc: '在團隊中默默補上各種重要細節，讓社團運作更穩定，也讓夥伴之間更有連結。',
    quote: '把細節做好，也是在愛人',
    ig: ''
  },
  { 
    name: '李曉光', role: '社團顧問', avatar: lightimg, 
    tags: ['陪伴成長', '方向引導', '經驗分享'],
    duty: '陪伴社團成長，提供方向與建議',
    desc: '透過經驗與觀點陪伴團隊前進，在需要的時候給予支持與提醒。',
    quote: '看見每個人的潛力，也相信團隊的可能',
    ig: ''
  },
  { 
    name: '張博智', role: '社團行政扛霸子', avatar: '', // 尚未有照片
    tags: ['流程控', '執行力', '行政擔當'],
    duty: '協助行政、流程安排與內部支援',
    desc: '擅長把繁雜的事情整理清楚，讓活動和社務推進得更順。',
    quote: '把事情做好，團隊就能走得更穩',
    ig: ''
  }
])
</script>

<style scoped>
/* Hero 區塊專屬設定 */
.staff-hero {
  position: relative; background: #091321; padding: 120px 0 100px; overflow: hidden; text-align: center;
}
.glow-1 { width: 450px; height: 450px; background: rgba(35, 77, 116, 0.6); top: -10%; left: 10%; }
.glow-2 { width: 350px; height: 350px; background: rgba(138, 99, 210, 0.4); bottom: -10%; right: 10%; }

/* 卡片內部排版 */
.staff-card-full {
  padding: 40px 24px;
  text-align: center;
}

.avatar-wrap { width: 100px; height: 100px; margin: 0 auto 16px; border-radius: 50%; overflow: hidden; }
.avatar { width: 100%; height: 100%; object-fit: cover; }

.staff-name { font-size: 1.4rem; color: var(--primary-dark); margin-bottom: 4px; font-weight: 800; }
.staff-role { color: var(--primary); font-weight: 700; margin-bottom: 18px; font-size: 1.05rem; }

.tags-wrap { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 24px; }
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

.duty { color: var(--primary-dark); margin-bottom: 16px; font-weight: 700;}
.desc { margin-bottom: 24px; white-space: pre-line; }

.quote { 
  font-style: italic; 
  font-weight: 700; 
  margin-bottom: 24px; 
  color: var(--primary-dark); 
}

/* IG 連結按鈕樣式 */
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