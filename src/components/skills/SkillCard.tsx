import { Skill } from '@/lib/types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

type Props = { skill: Skill, onEdit?: ()=>void, onRemove?:()=>void }

export function SkillCard({ skill, onEdit, onRemove }: Props) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="font-medium">{skill.title}</div>
        <Badge className={skill.type==='give' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
          {skill.type==='give' ? 'даю' : 'хочу'}
        </Badge>
      </div>
      {skill.tags && <div className="flex flex-wrap gap-2 mt-2">{skill.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>}
      <div className="flex gap-2 mt-3">
        <Button variant="outline" onClick={onEdit}>Редактировать</Button>
        <Button variant="ghost" onClick={onRemove}>Удалить</Button>
      </div>
    </div>
  )
}
