import { Filters } from '@/components/match/Filters'
import { MatchCard } from '@/components/match/MatchCard'
import { useStore } from '@/lib/store'

export default function Feed() {
  const matches = useStore(s=>s.matches)
  return (
    <div className="grid md:grid-cols-[280px,1fr] gap-4">
      <Filters />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="headline">Совпадения</div>
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          {matches.map(m => <MatchCard key={m.id} m={m} />)}
        </div>
      </div>
    </div>
  )
}
