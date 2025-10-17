export type Skill = {
  id: string
  title: string
  level?: 'beginner' | 'junior' | 'middle' | 'senior' | 'expert'
  description?: string
  tags?: string[]
  type: 'give' | 'want'
}

export type Profile = {
  id: string
  name: string
  city: string
  onlineOnly: boolean
  avatarUrl?: string
  telegramLinked: boolean
  tokens: number
  rating: number
  bio?: string
  gives: Skill[]
  wants: Skill[]
}

export type Match = {
  id: string
  partner: Profile
  score: number
  overlap: { give: string[]; want: string[] }
  cityCompatible: boolean
  onlineCompatible: boolean
}

export type Message = {
  id: string
  authorId: string
  text?: string
  at: number
  offer?: { dateISO: string; durationMin: number; note?: string; status?: 'pending'|'accepted'|'declined' }
  system?: boolean
}

export type Conversation = {
  id: string
  partner: Profile
  messages: Message[]
  unread: number
  pinned?: boolean
}

export type Session = {
  id: string
  partner: Profile
  dateISO: string
  durationMin: number
  status: 'pending_confirmation' | 'confirmed' | 'completed'
  review?: { stars: number; text?: string }
  tokensAwarded?: number
}
