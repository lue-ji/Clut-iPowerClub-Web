import { eventload } from '@/utils/imgloader'
import logoPng from '@/../logo.png'
const imgmap = eventload()
export const getImage = (folder, fileName) => {
  // 若找不到對應圖片，回傳預設 logo（避免空 src 導致壞圖）
  return imgmap[folder]?.find(img => img.name === fileName)?.url || logoPng
}
//helper
export const events = [
  {
    id: 1,
    slug: "welcome-party-20250918",
    title: "期初迎新",
    summary: "大型迎新，秉持玩中學學中玩的精神，用各項經典體驗活動帶領大一學生彼此認識",
    desc: `促進跨科系的人脈拓展，也增進社團內部的團隊合作意識，並且訓練社團幹部成為活動帶領者。同時也預備美味雞排及溫馨的分享
不只能好吃好玩好聊且更可以認識很多好朋友，
讓進到大學的大一學生一來到社團就有一種像家的感覺。`,
    image: getImage('Welcome', 'cover.jpg'),
    gallery: [
      getImage('Welcome', 'photo-2.jpg'),
      getImage('Welcome', 'photo-1.jpg'),
      getImage('Welcome', 'photo-4.jpg')
    ],
    date: "2025-09-18",
    startDate: "2025-09-18T00:00:00",
    endDate: "2025-09-18T23:59:59",
    location: "新北市板橋區致理科技大學",
    type: "社團迎新活動",
    status: "圓滿完成",
    highlights: [
    "超好玩又充滿趣味的體驗活動!",
    "為每位願意參與的新生預備免費超大雞排!!",
    "超棒團康分享活動，保證大家滿有收穫!!!"
    ],
    featured: true,
    order: 1
  },
  {
    id: 2,
    slug: "unlock-mrt-20250927",
    title: "Unlock新生線",
    summary: "與其他學校共辦的超大型社遊活動，獨特的體驗闖關一步步帶領你認識其他校園",
    desc: `其中包括台大、台&北科大、北教大、世新、康寧、淡江、亞東、政大等大學ipower社一起參與
透過趣味解謎和體驗活動，讓各大學學生能彼此認識增進友誼，
活動範圍在圓山花博~士林(夜市附近)
不少人都因為這次活動認識到跨校的好捧友。`,
    image: getImage('unlock', 'cover.jpg'),
    gallery: [
      getImage('unlock', 'photo-1.jpg'),
      getImage('unlock', 'photo-2.jpg'),
      getImage('unlock', 'photo-3.jpg')
    ],
    date: "2025-09-27",
    startDate: "2025-09-27T00:00:00",
    endDate: "2025-09-27T23:59:59",
    location: "台北市中山區~士林區(圓山站~士林站)",
    type: "超大型跨校聯合活動",
    status: "圓滿完成",
    featured: true,
    order: 2
  },
  {
    id: 3,
    slug: "all-pass-20251105",
    title: "歐趴糖祝福策展&擺攤",
    summary: "透過考試將近的季節將溫暖小禮物送給致理的大學部、五專部學生",
    desc: `讓校內學生感受到不一樣的校園文化,
透過祝福的發送,也同步訓練社團幹部及社員發動iPower社正向的影響力,培育領袖人才。
也希望學生能夠在這樣一個充滿溫馨的祝福中能每科都歐趴~`,
    image: getImage('allpass', 'cover.jpg'),
    gallery: [
      getImage('allpass', 'photo-1.jpg'),
      getImage('allpass', 'photo-2.jpg'),
      getImage('allpass', 'photo-3.jpg')
    ],
    date: "2025-11-05(&10-30)",
    startDate: "2025-11-05T00:00:00",
    endDate: "2025-11-05T23:59:59",
    location: "新北市板橋區致理科技大學",
    type: "校園擺攤",
    status: "圓滿完成",
    featured: true,
    order: 3
  },
  {
    id: 4,
    slug: "smile-on-20260307",
    title: "微笑ON大專營會",
    summary: "每學期都會有的固定跨校活動，迎合今年的國際微笑日，從而發起這次的活動~",
    desc: `與去年unlock新生線類似，同樣為台大、台科&北科大、北教大、世新、康寧、淡江、亞東、政大等眾ipower社共同參與，
今年特地邀請兩位講師，分別對生涯顧問指引和教育社會學&社群媒體哲學有諸多研究，透過講師重新認識到在生活中微笑的重要性，
希望大家在參與完這次活動後能重新拾起那份微笑，並散播給周遭人，讓大家一起微笑ON!!!!!`,
    image: getImage('smileon', 'cover.jpg'),
    gallery: [
      getImage('smileon', 'photo-2.jpg'),getImage('smileon', 'photo-1.jpg'),
      getImage('smileon', 'photo-3.jpg'),getImage('smileon', 'photo-4.jpg'),
      getImage('smileon', 'photo-6.jpg'),getImage('smileon', 'photo-5.jpg'),
      getImage('smileon', 'photo-7.jpg'),getImage('smileon', 'photo-8.jpg'),
      getImage('smileon', 'photo-9.jpg'),getImage('smileon', 'photo-10.jpg'),
    ],
    date: "2026-03-07",
    startDate: "2026-03-07T00:00:00",
    endDate: "2026-03-07T23:59:59",
    location: "台北市國立台灣大學博雅教學館",
    type: "超大型跨校聯合活動",
    status: "圓滿完成",
    highlights: [
      "How about情緒家族{憤怒-恐懼-幸福-悲傷}","SMILE OS重啟",
      "學習拆解並辨識情緒","近10年來參與人數最多的活動"
    ],
    featured: true,
    order:4
  },
  {
    id: 5, 
    slug: "32-missed-calls-20260510",
    title: "32通未接來電",
    summary: "一部關於家、恐懼、愛與和好的溫馨小短劇。",
    desc: `「一通、兩通、三十通... 我只想知道你平安...」
他不是不想回家，他只是怕一回家，又變成那個「怎麼做都不夠好」的人。
這不只是孩子的故事，這包含了媽媽的害怕、爸爸的憤怒、孩子的逃避，還有一個家說不出口的愛。

這一次，當電話再次響起，他們能不能真正聽見彼此？
不是比誰對，而是學會一起回家。邀請你，一起來聽見這個家的故事！

【活動資訊】
📍 演出地點：iPower 關懷中心 (新北市永和區成功路一段82號9樓)
🕒 演出時間：2026/5/10 (日) 9:40入場，10:00開演`,
    image: getImage('latest', '32call.jpg'), 
    gallery: [], 
    date: "2026-05-10",
    startDate: "2026-05-10T00:00:00",
    endDate: "2026-05-10T23:59:59",
    location: "新北市永和區iPower關懷中心",
    type: "家庭溫馨小短劇",
    status: "圓滿完成", 
    highlights: [
      "探討家庭關係、恐懼與和好的深刻議題",
      "精采動人的家庭溫馨短劇演出",
      "引導彼此學習傾聽，重新聽見愛"
    ],
    featured: true,
    order: 0 
  },
]