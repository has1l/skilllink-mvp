import { Card } from '../ui/Card'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Match } from '@/lib/types'
import { MessageSquareText, CalendarClock } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = { m: Match }

export function MatchCard({ m }: Props) {
  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar src={m.partner.avatarUrl} alt={m.partner.name} size={48} />
        <div className="flex-1">
          <div className="font-semibold">{m.partner.name}</div>
          <div className="text-xs text-slate-500">{m.partner.city} • рейтинг {m.partner.rating.toFixed(1)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">совпадение</div>
          <div className="text-lg font-semibold text-primary-700">{m.score}%</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500 mb-1">Они дают</div>
          <div className="flex flex-wrap gap-1">
            {m.partner.gives.slice(0,4).map(g => <Badge key={g.id}>{g.title}</Badge>)}
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500 mb-1">Они хотят</div>
          <div className="flex flex-wrap gap-1">
            {m.partner.wants.slice(0,4).map(w => <Badge key={w.id}>{w.title}</Badge>)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs text-slate-500">
          {m.cityCompatible ? 'Город подходит' : 'Разные города'} • {m.onlineCompatible ? 'Онлайн ок' : 'Только офлайн'}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/chat"><Button variant="outline"><MessageSquareText className="w-4 h-4 mr-2" />Написать</Button></Link>
          <Link to="/sessions"><Button><CalendarClock className="w-4 h-4 mr-2" />Предложить время</Button></Link>
        </div>
      </div>
    </Card>
  )
}
