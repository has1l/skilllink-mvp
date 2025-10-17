import { NavLink } from 'react-router-dom'
import { MessageSquare, Users, ListChecks, UserRound, Sparkles, Wallet } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Avatar } from '../ui/Avatar'

const nav = [
  { to:'/feed', text:'Матчи', icon: Sparkles },
  { to:'/chat', text:'Чат', icon: MessageSquare },
  { to:'/skills', text:'Навыки', icon: ListChecks },
  { to:'/sessions', text:'Сессии', icon: Users },
  { to:'/profile', text:'Профиль', icon: UserRound },
]

export function Sidebar() {
  const me = useStore(s=>s.me)
  return (
    <aside className="hidden md:flex w-[260px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <img src="/logo.svg" alt="logo" className="h-7" />
        <div className="text-slate-800 font-semibold">SkillLink</div>
      </div>
      <div className="p-5 flex items-center gap-3">
        <Avatar src={me.avatarUrl} alt={me.name} size={44} />
        <div className="flex-1">
          <div className="font-medium">{me.name}</div>
          <div className="text-xs text-slate-500">{me.city}{me.onlineOnly ? ' • онлайн':' '}</div>
        </div>
      </div>

      <nav className="p-2 flex-1">
        {nav.map(item=>{
          const Icon = item.icon
          return (
            <NavLink key={item.to} to={item.to} className={({isActive}) => "flex items-center gap-3 px-4 h-11 rounded-lg mb-1 text-sm "+(isActive? "bg-primary-50 text-primary-700":"hover:bg-slate-50") }>
              <Icon className="h-4 w-4" />
              {item.text}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="w-4 h-4" />
            Токены
          </div>
          <div className="font-semibold">{me.tokens}</div>
        </div>
        <div className="text-xs text-slate-500 mt-2">Рейтинг: <span className="font-medium text-slate-700">{me.rating.toFixed(1)}</span>/5</div>
      </div>
    </aside>
  )
}
