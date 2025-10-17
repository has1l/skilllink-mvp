import { useStore } from '@/lib/store'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Switch } from '../ui/Switch'

export function ProfileForm() {
  const me = useStore(s=>s.me)
  const setCity = useStore(s=>s.setCity)
  const setOnlineOnly = useStore(s=>s.setOnlineOnly)

  return (
    <div className="card p-5 max-w-2xl">
      <div className="headline mb-4">Профиль</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-600">Имя</label>
          <Input defaultValue={me.name} />
        </div>
        <div>
          <label className="text-sm text-slate-600">Город</label>
          <Input value={me.city} onChange={e=>setCity(e.target.value)} />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm text-slate-600">О себе</label>
        <Textarea defaultValue={me.bio} />
      </div>
      <div className="mt-4">
        <Switch checked={me.onlineOnly} onChange={setOnlineOnly} label="Только онлайн" />
      </div>
      <div className="mt-5 flex gap-2">
        <Button>Сохранить</Button>
        <Button variant="outline">Отмена</Button>
      </div>
    </div>
  )
}
