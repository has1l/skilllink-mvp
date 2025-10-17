import { useState } from 'react'
import { useStore } from '@/lib/store'
import { ConversationList } from '@/components/chat/ConversationList'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { Button } from '@/components/ui/Button'

export default function Chat() {
  const convs = useStore(s=>s.conversations)
  const sendOffer = useStore(s=>s.sendOffer)
  const [current, setCurrent] = useState(convs[0]?.id)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row h-[70vh]">
        <ConversationList list={convs} currentId={current} onSelect={setCurrent} />
        <div className="flex-1 flex flex-col">
          <div className="p-2 bg-slate-50 border-b border-slate-200">
            <div className="flex gap-2">
              <Button variant="outline" onClick={()=>{
                const iso = new Date(Date.now()+1000*60*60*24).toISOString()
                if(current) sendOffer(current, iso, 60, 'Созвон в Zoom')
              }}>Предложить время +60мин</Button>
            </div>
          </div>
          <ChatWindow conv={convs.find(c=>c.id===current)} />
        </div>
      </div>
    </div>
  )
}
