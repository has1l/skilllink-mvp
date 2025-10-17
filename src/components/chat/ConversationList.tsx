import { Conversation } from '@/lib/types'
import { Avatar } from '../ui/Avatar'

type Props = { list: Conversation[], currentId?: string, onSelect: (id:string)=>void }

export function ConversationList({ list, currentId, onSelect }: Props) {
  return (
    <div className="border-r border-slate-200 w-full md:w-[320px]">
      {list.map(c => (
        <button key={c.id} onClick={()=>onSelect(c.id)} className={"w-full p-4 flex items-center gap-3 border-b border-slate-100 hover:bg-slate-50 text-left " + (currentId===c.id ? 'bg-slate-50' : '')}>
          <Avatar src={c.partner.avatarUrl} alt={c.partner.name} size={44} />
          <div className="flex-1">
            <div className="font-medium">{c.partner.name}</div>
            <div className="text-xs text-slate-500 line-clamp-1">{c.messages[c.messages.length-1]?.text || 'Предложение времени'}</div>
          </div>
          {c.unread>0 && <span className="text-xs bg-primary-600 text-white rounded-full h-5 px-2 grid place-items-center">{c.unread}</span>}
        </button>
      ))}
    </div>
  )
}
