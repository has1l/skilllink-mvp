import { Link, useLocation } from 'react-router-dom'
import { Bell, Link2, LogIn } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useStore } from '@/lib/store'

export function Topbar() {
  const me = useStore(s=>s.me)
  const location = useLocation()
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="md:hidden">
          <img src="/logo.svg" className="h-6" />
        </div>

        <div className="hidden md:block w-[420px]">
          <Input placeholder="Поиск по навыкам, людям, тегам" />
        </div>

        <div className="flex items-center gap-3">
          {!me.telegramLinked && location.pathname !== '/link-telegram' && (
            <Link to="/link-telegram" className="hidden sm:inline-flex">
              <Button variant="outline"><Link2 className="w-4 h-4 mr-2" /> Привязать Telegram</Button>
            </Link>
          )}
          <Link to="/auth" className="sm:hidden">
            <Button variant="outline"><LogIn className="w-4 h-4 mr-2" />Войти</Button>
          </Link>
          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] rounded-full h-4 w-4 grid place-items-center">3</span>
          </button>
        </div>
      </div>
    </header>
  )
}
