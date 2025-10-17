import { useState } from 'react'
import { Skill } from '@/lib/types'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'

type Props = { initial?: Partial<Skill>, onSubmit: (s:Skill)=>void, onCancel: ()=>void }

export function SkillEditor({ initial={}, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial.title || '')
  const [type, setType] = useState<'give'|'want'>(initial.type || 'give')
  const [tags, setTags] = useState((initial.tags||[]).join(', '))
  const [description, setDescription] = useState(initial.description || '')

  return (
    <div className="p-4 border border-slate-200 rounded-lg bg-white">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-slate-600">Название</label>
          <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Напр. Rust базовый" />
        </div>
        <div>
          <label className="text-sm text-slate-600">Тип</label>
          <div className="flex gap-2">
            <button onClick={()=>setType('give')} className={"px-3 h-10 rounded-lg border "+(type==='give'?'bg-green-50 border-green-200':'border-slate-200')}>Даю</button>
            <button onClick={()=>setType('want')} className={"px-3 h-10 rounded-lg border "+(type==='want'?'bg-blue-50 border-blue-200':'border-slate-200')}>Хочу</button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label className="text-sm text-slate-600">Теги (через запятую)</label>
        <Input value={tags} onChange={e=>setTags(e.target.value)} placeholder="rust, backend, algorithms" />
      </div>
      <div className="mt-3">
        <label className="text-sm text-slate-600">Описание</label>
        <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Коротко опиши, что именно предлагаешь / ищешь" />
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={()=>onSubmit({ id: Math.random().toString(36).slice(2), title, type, tags: tags? tags.split(',').map(s=>s.trim()).filter(Boolean):[], description })}>Сохранить</Button>
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
      </div>
    </div>
  )
}
