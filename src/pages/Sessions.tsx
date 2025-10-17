import { useState } from 'react'
import { useStore } from '@/lib/store'
import { SessionCard } from '@/components/sessions/SessionCard'
import { ReviewModal } from '@/components/reviews/ReviewModal'

export default function Sessions() {
  const sessions = useStore(s=>s.sessions)
  const confirm = useStore(s=>s.confirmSession)
  const addReview = useStore(s=>s.addReview)
  const [reviewFor, setReviewFor] = useState<string|null>(null)

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="headline">Мои сессии</div>
        {sessions.map(s => (
          <SessionCard key={s.id} s={s} onConfirm={()=>confirm(s.id)} onReview={()=>setReviewFor(s.id)} />
        ))}
      </div>
      <div className="card p-4">
        <div className="headline mb-2">Как это работает</div>
        <ol className="text-sm text-slate-600 list-decimal pl-5 space-y-1">
          <li>Договариваетесь о времени через чат.</li>
          <li>Проводите сессию онлайн / офлайн.</li>
          <li>Подтверждаете факт сессии, оставляете отзыв.</li>
          <li>Система начисляет токены времени.</li>
        </ol>
      </div>
      <ReviewModal open={!!reviewFor} onClose={()=>setReviewFor(null)} onSubmit={(stars,text)=>{ if(reviewFor) addReview(reviewFor, stars, text) }} />
    </div>
  )
}
