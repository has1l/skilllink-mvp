import { ProfileForm } from '@/components/profile/ProfileForm'
import { useStore } from '@/lib/store'
import { Badge } from '@/components/ui/Badge'

export default function Profile() {
  const me = useStore(s=>s.me)
  return (
    <div className="space-y-4">
      <ProfileForm />
      <div className="card p-5 max-w-2xl">
        <div className="headline mb-3">Публичный профиль (превью)</div>
        <div className="flex items-center gap-3">
          <img src={me.avatarUrl} className="h-12 w-12 rounded-full" />
          <div>
            <div className="font-semibold">{me.name} <span className="text-slate-400 font-normal">• {me.city}</span></div>
            <div className="text-sm text-slate-600">{me.bio}</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm text-slate-500">Даю:</div>
          <div className="flex flex-wrap gap-2 mt-1">{me.gives.map(s=> <Badge key={s.id}>{s.title}</Badge>)}</div>
        </div>
        <div className="mt-3">
          <div className="text-sm text-slate-500">Хочу:</div>
          <div className="flex flex-wrap gap-2 mt-1">{me.wants.map(s=> <Badge key={s.id}>{s.title}</Badge>)}</div>
        </div>
      </div>
    </div>
  )
}
