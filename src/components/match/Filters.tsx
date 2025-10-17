import { Input } from '../ui/Input'
import { Switch } from '../ui/Switch'
import { Chip } from '../ui/Chip'
import { useState } from 'react'

const chips = ['Онлайн', 'Офлайн', 'В моём городе', 'Только проверенные', 'Сопровождение проекта']

export function Filters() {
  const [active, setActive] = useState<string[]>(['Онлайн','В моём городе'])
  return (
    <div className="card p-4 sticky top-20">
      <div className="headline mb-3">Фильтры</div>
      <div className="mb-3">
        <Input placeholder="Навыки, люди, теги" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {chips.map(c => (
          <Chip key={c} text={c} active={active.includes(c)} onClick={()=>setActive(a => a.includes(c) ? a.filter(x=>x!==c) : [...a, c])} />
        ))}
      </div>
      <div className="space-y-3">
        <Switch checked={true} onChange={()=>{}} label="Только с доступным временем" />
        <Switch checked={false} onChange={()=>{}} label="С общими контактами" />
      </div>
    </div>
  )
}
