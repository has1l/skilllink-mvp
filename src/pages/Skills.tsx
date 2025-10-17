import { useState } from 'react'
import { useStore } from '@/lib/store'
import { SkillCard } from '@/components/skills/SkillCard'
import { SkillEditor } from '@/components/skills/SkillEditor'
import { Button } from '@/components/ui/Button'

export default function Skills() {
  const me = useStore(s=>s.me)
  const add = useStore(s=>s.addSkill)
  const remove = useStore(s=>s.removeSkill)
  const [adding, setAdding] = useState(false)

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="headline">Навыки, которые даю</div>
          <Button onClick={()=>setAdding(true)}>Добавить</Button>
        </div>
        {adding && <div className="mb-4"><SkillEditor onSubmit={(s)=>{ add(s); setAdding(false) }} onCancel={()=>setAdding(false)} /></div>}
        <div className="grid gap-3">
          {me.gives.map(s => <SkillCard key={s.id} skill={s} onRemove={()=>remove(s.id)} />)}
        </div>
      </div>
      <div>
        <div className="headline mb-3">Навыки, которые хочу</div>
        <div className="grid gap-3">
          {me.wants.map(s => <SkillCard key={s.id} skill={s} onRemove={()=>remove(s.id)} />)}
        </div>
      </div>
    </div>
  )
}
