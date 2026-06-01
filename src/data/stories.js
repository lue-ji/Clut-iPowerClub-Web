import { eventload } from '@/utils/imgloader'
import logoPng from '@/../logo.png'

const imgmap = eventload()
const getImage = (folder, file) => imgmap[folder]?.find(i => i.name === file)?.url || logoPng

// 精簡版 stories 結構：只保留必要欄位，方便在 About 頁簡單渲染
export const stories = [
  {
    id: 1,
    slug: 'wanmei-20260528',
    author: '婉媚',
    excerpt: '很高興能接觸到不同的人跟信仰，學習到不同的看法，改變了一些價值觀，更加成長進步，也感受到大家的溫暖~',
    image: getImage('staff', 'wanmei.jpg'),
    date: '2026-05-28',
    featured: true
  },
  {
    id: 2,
    slug: 'wenxin-20260528',
    author: '文馨',
    excerpt: '我從一個I(90%)人成為一個I(40%)人',
    image: getImage('staff', 'wenxin.jpg'),
    date: '2026-05-28',
    featured: true
  },
  {
    id: 3,
    slug: 'weijin-20260528',
    author: '韋靜',
    excerpt: '',
    image: getImage('staff', 'weijin.jpg'),
    date: '2026-05-28',
    featured: true
  },
  {
    id: 4,
    slug: 'chenkie-20260528',
    author: '宸愷',
    excerpt: '',
    image: getImage('staff', 'chenkie.jpg'),
    date: '2026-05-28',
    featured: true
  },
  {
    id: 5,
    slug: '',
    author: '',
    excerpt: '',
    image: getImage('staff', '.jpg'),
    date: '',
    featured: true
  },
    {
    id: 6,
    slug: '',
    author: '',
    excerpt: '',
    image: getImage('staff', '.jpg'),
    date: '',
    featured: true
  },
    {
    id: 7,
    slug: '',
    author: '',
    excerpt: '',
    image: getImage('staff', '.jpg'),
    date: '',
    featured: true
  },
]