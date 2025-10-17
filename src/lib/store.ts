import { create } from 'zustand'
import { Conversation, Match, Message, Profile, Session, Skill } from './types'
import { generateLinkCode } from './telegram'

const me: Profile = {
  id: 'me',
  name: 'Родион',
  city: 'Санкт-Петербург',
  onlineOnly: false,
  avatarUrl: '/avatar-me.svg',
  telegramLinked: false,
  tokens: 120,
  rating: 4.8,
  bio: 'Продуктовый дизайнер / фронтенд. Обмениваюсь опытом, менторю по UI. Хочу подтянуть Rust.',
  gives: [
    { id: 'g1', title: 'UI/UX ревью', level: 'senior', type: 'give', tags: ['design', 'ux', 'figma']},
    { id: 'g2', title: 'React архитектура', level: 'senior', type: 'give', tags: ['react', 'spa', 'nextjs']},
  ],
  wants: [
    { id: 'w1', title: 'Rust базовый', level: 'beginner', type: 'want', tags: ['systems', 'rust']},
    { id: 'w2', title: 'ML для продакта', level: 'junior', type: 'want', tags: ['ml', 'embeddings']},
  ]
}

const u = (id:string, name:string, city:string, avatar:string, gives: string[], wants: string[], rating=4.6): Profile => ({
  id, name, city, onlineOnly: false, avatarUrl: avatar, telegramLinked: true, tokens: Math.floor(Math.random()*200),
  rating, gives: gives.map((t,i)=>({id:`${id}-g${i}`, title:t, type:'give'} as Skill)),
  wants: wants.map((t,i)=>({id:`${id}-w${i}`, title:t, type:'want'} as Skill))
})

const p1 = u('u1','Марина','Санкт-Петербург','/avatar-1.svg',
  ['Rust базовый','Алгоритмы для интервью'], ['Figma авто-лейаут','Next.js SSR'])
const p2 = u('u2','Илья','Москва','/avatar-2.svg',
  ['ML для продакта','LLM промт-инженерия'], ['React архитектура','UX копирайтинг'], 4.9)
const p3 = u('u3','Катя','Онлайн','/avatar-3.svg',
  ['Figma продвинутый'], ['Rust базовый','Github Actions'])

function mkMatch(id:string, partner:Profile, score:number, overlap:{give:string[], want:string[]}): Match {
  return {
    id, partner, score, overlap,
    cityCompatible: partner.city === me.city || partner.city === 'Онлайн' || !me.onlineOnly,
    onlineCompatible: true
  }
}

const matches: Match[] = [
  mkMatch('m1', p1, 92, { give: ['UI/UX ревью'], want: ['Rust базовый'] }),
  mkMatch('m2', p2, 87, { give: ['React архитектура'], want: ['ML для продакта'] }),
  mkMatch('m3', p3, 78, { give: ['UI/UX ревью'], want: ['Rust базовый'] }),
]

const conv: Conversation[] = [
  {
    id: 'c1', partner: p1, unread: 1,
    messages: [
      { id:'m1', authorId: p1.id, text: 'Привет! Могу помочь с Rust, как насчёт завтра?', at: Date.now()-1000*60*60 },
      { id:'m2', authorId: me.id, text: 'Привет! Завтра ок. Удобно 19:00?', at: Date.now()-1000*60*30 },
      { id:'m3', authorId: p1.id, at: Date.now()-1000*60*15, offer: { dateISO: new Date(Date.now()+1000*60*60*24).toISOString(), durationMin: 60, note:'С созвоном в Zoom', status: 'pending' } },
    ]
  },
  {
    id: 'c2', partner: p2, unread: 0,
    messages: [
      { id:'m1', authorId: me.id, text: 'Интересует ML для продакта — покажешь пайплайн?', at: Date.now()-1000*60*400 },
      { id:'m2', authorId: p2.id, text: 'Да, могу. У тебя когда слот?', at: Date.now()-1000*60*380 },
    ]
  }
]

const sessions: Session[] = [
  { id: 's1', partner: p1, dateISO: new Date(Date.now()+1000*60*60*24).toISOString(), durationMin: 60, status: 'pending_confirmation' },
  { id: 's2', partner: p2, dateISO: new Date(Date.now()-1000*60*60*48).toISOString(), durationMin: 45, status: 'completed', review: { stars: 5, text: 'Очень полезно, спасибо!' }, tokensAwarded: 45 }
]

type Store = {
  me: Profile
  linkCode: string | null
  matches: Match[]
  conversations: Conversation[]
  sessions: Session[]

  // Actions
  setCity: (city: string) => void
  setOnlineOnly: (val: boolean) => void
  addSkill: (s: Skill) => void
  removeSkill: (id: string) => void
  updateSkill: (s: Skill) => void

  sendMessage: (cid: string, text: string) => void
  sendOffer: (cid: string, iso: string, durationMin: number, note?: string) => void
  respondOffer: (cid: string, mid: string, accept: boolean) => void

  confirmSession: (sid: string) => void
  addReview: (sid: string, stars: number, text?: string) => void

  generateLinkCode: () => string
  completeTelegramLink: (code: string) => boolean
}

export const useStore = create<Store>((set, get) => ({
  me,
  linkCode: null,
  matches,
  conversations: conv,
  sessions,

  setCity: (city) => set(state => ({ me: { ...state.me, city } })),
  setOnlineOnly: (val) => set(state => ({ me: { ...state.me, onlineOnly: val } })),

  addSkill: (s) => set(state => ({ me: { ...state.me, [s.type === 'give' ? 'gives':'wants']: [...(s.type === 'give' ? state.me.gives : state.me.wants), s] } })),
  removeSkill: (id) => set(state => ({ me: { ...state.me, gives: state.me.gives.filter(s=>s.id!==id), wants: state.me.wants.filter(s=>s.id!==id) } })),
  updateSkill: (s) => set(state => ({ me: { ...state.me, gives: state.me.gives.map(x=>x.id===s.id?s:x), wants: state.me.wants.map(x=>x.id===s.id?s:x) } })),

  sendMessage: (cid, text) => set(state => ({
    conversations: state.conversations.map(c => c.id===cid ? { ...c, messages: [...c.messages, { id: Math.random().toString(36).slice(2), authorId: state.me.id, text, at: Date.now() }] } : c)
  })),
  sendOffer: (cid, iso, durationMin, note) => set(state => ({
    conversations: state.conversations.map(c => c.id===cid ? { ...c, messages: [...c.messages, { id: Math.random().toString(36).slice(2), authorId: state.me.id, at: Date.now(), offer: { dateISO: iso, durationMin, note, status: 'pending' } }] } : c)
  })),
  respondOffer: (cid, mid, accept) => set(state => ({
    conversations: state.conversations.map(c => c.id===cid ? {
      ...c, messages: c.messages.map(m => m.id===mid && m.offer ? { ...m, offer: { ...m.offer, status: accept ? 'accepted':'declined' } } : m )
    } : c)
  })),

  confirmSession: (sid) => set(state => ({
    sessions: state.sessions.map(s => s.id===sid ? { ...s, status: 'confirmed' } : s )
  })),
  addReview: (sid, stars, text) => set(state => ({
    sessions: state.sessions.map(s => s.id===sid ? { ...s, status: 'completed', review: { stars, text }, tokensAwarded: s.durationMin } : s ),
    me: { ...state.me, tokens: state.me.tokens + (state.sessions.find(s=>s.id===sid)?.durationMin ?? 0) }
  })),

  generateLinkCode: () => {
    const code = generateLinkCode()
    set({ linkCode: code })
    return code
  },
  completeTelegramLink: (code) => {
    const ok = code && code === get().linkCode
    if (ok) set(state => ({ me: { ...state.me, telegramLinked: true }, linkCode: null }))
    return !!ok
  }
}))
