import { Conversation, Message } from '@/lib/types'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { fmtDateISO } from '@/lib/utils'
import { useState } from 'react'
import { useStore } from '@/lib/store'

type Props = { conv?: Conversation }

export function ChatWindow({ conv }: Props) {
  const [text, setText] = useState('')
  const sendMessage = useStore(s=>s.sendMessage)
  const respondOffer = useStore(s=>s.respondOffer)
  if (!conv) return <div className="flex-1 grid place-items-center text-slate-500">Выберите диалог</div>

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-white">
        <img src={conv.partner.avatarUrl} className="h-9 w-9 rounded-full" />
        <div>
          <div className="font-medium">{conv.partner.name}</div>
          <div className="text-xs text-slate-500">{conv.partner.city}</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3 bg-[radial-gradient(circle_at_20%_0,rgba(99,102,241,.06),transparent_50%)]">
        {conv.messages.map(m => <Bubble key={m.id} me={m.authorId==='me'} m={m} onRespond={(accept)=>respondOffer(conv.id, m.id, accept)} />)}
      </div>

      <div className="p-3 border-t border-slate-200 bg-white">
        <form className="flex gap-2" onSubmit={(e)=>{e.preventDefault(); if(text.trim()) { sendMessage(conv.id, text.trim()); setText('') }}}>
          <Input placeholder="Напишите сообщение…" value={text} onChange={e=>setText(e.target.value)} />
          <Button type="submit">Отправить</Button>
        </form>
      </div>
    </div>
  )
}

function Bubble({ m, me, onRespond }: { m: Message, me?: boolean, onRespond: (accept:boolean)=>void }) {
  if (m.offer) {
    const color = m.offer.status==='accepted' ? 'bg-green-50 border-green-200' : m.offer.status==='declined' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
    return (
      <div className={"max-w-[520px] p-3 rounded-xl border " + color + " " + (me? "ml-auto":"") }>
        <div className="text-sm">Предложение: {fmtDateISO(m.offer.dateISO)} • {m.offer.durationMin} мин</div>
        {m.offer.note && <div className="text-xs text-slate-500 mt-1">{m.offer.note}</div>}
        <div className="text-[11px] text-slate-500 mt-1">{new Date(m.at).toLocaleString()}</div>
        {m.offer.status==='pending' && (
          <div className="flex gap-2 mt-2">
            <button onClick={()=>onRespond(true)} className="px-3 h-8 bg-green-600 text-white rounded-lg">Принять</button>
            <button onClick={()=>onRespond(false)} className="px-3 h-8 border border-slate-200 rounded-lg">Отклонить</button>
          </div>
        )}
        {m.offer.status==='accepted' && <div className="text-green-700 text-sm mt-2">Принято ✅</div>}
        {m.offer.status==='declined' && <div className="text-red-700 text-sm mt-2">Отклонено ❌</div>}
      </div>
    )
  }
  return (
    <div className={"max-w-[520px] p-3 rounded-xl " + (me? "bg-primary-600 text-white ml-auto":"bg-white border border-slate-200") }>
      <div className="text-sm whitespace-pre-wrap">{m.text}</div>
      <div className={"text-[11px] mt-1 "+(me? "text-white/80":"text-slate-500")}>{new Date(m.at).toLocaleString()}</div>
    </div>
  )
}
