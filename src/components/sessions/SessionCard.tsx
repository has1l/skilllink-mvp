import { Session } from '@/lib/types'
import { Button } from '../ui/Button'
import { fmtDateISO } from '@/lib/utils'

type Props = { s: Session, onConfirm?: ()=>void, onReview?: ()=>void }

export function SessionCard({ s, onConfirm, onReview }: Props) {
  return (
    <div className="p-4 bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{s.partner.name}</div>
          <div className="text-sm text-slate-500">{fmtDateISO(s.dateISO)} • {s.durationMin} мин</div>
        </div>
        <div className="text-sm">
          {s.status==='pending_confirmation' && <span className="text-amber-700 bg-amber-50 px-2 py-1 rounded">Ждёт подтверждения</span>}
          {s.status==='confirmed' && <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded">Подтверждено</span>}
          {s.status==='completed' && <span className="text-green-700 bg-green-50 px-2 py-1 rounded">Завершено</span>}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {s.status==='pending_confirmation' && <Button onClick={onConfirm}>Подтвердить</Button>}
        {s.status==='confirmed' && <Button onClick={onReview}>Завершить и оставить отзыв</Button>}
        {s.status==='completed' && s.review && <div className="text-sm text-slate-600">Ваш отзыв: {'★'.repeat(s.review.stars)}{s.review.text? ' — '+s.review.text:''}</div>}
      </div>
      {s.tokensAwarded!=null && <div className="text-xs text-slate-500 mt-2">Начислено токенов: {s.tokensAwarded}</div>}
    </div>
  )
}
