import { useState } from 'react'
import { Button } from '../ui/Button'

type Props = { open: boolean, onClose: ()=>void, onSubmit: (stars:number, text?:string)=>void }

export function ReviewModal({ open, onClose, onSubmit }: Props) {
  const [stars, setStars] = useState(5)
  const [text, setText] = useState('')
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center z-40">
      <div className="bg-white rounded-xl p-5 w-[420px] shadow-card">
        <div className="headline">Отзыв</div>
        <div className="mt-3">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={()=>setStars(n)} className={"text-2xl "+(n<=stars? "text-amber-500":"text-slate-300")}>★</button>
            ))}
          </div>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Что было полезным?" className="mt-3 w-full min-h-[100px] rounded-lg border border-slate-200 p-2" />
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={()=>{ onSubmit(stars, text||undefined); onClose() }}>Отправить</Button>
        </div>
      </div>
    </div>
  )
}
