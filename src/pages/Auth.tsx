import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Link } from 'react-router-dom'

export default function Auth() {
  return (
    <div className="grid place-items-center">
      <div className="card p-6 w-[420px]">
        <div className="headline text-center">Вход</div>
        <form className="mt-4 space-y-3" onSubmit={(e)=>{e.preventDefault(); alert('Отправили ссылку на почту (mock)')}}>
          <Input placeholder="email@example.com" type="email" />
          <Button type="submit" className="w-full">Войти по почте</Button>
        </form>
        <div className="my-4 text-center text-sm text-slate-500">или</div>
        <Link to="/link-telegram" className="block">
          <Button variant="outline" className="w-full">Войти через Telegram</Button>
        </Link>
      </div>
    </div>
  )
}
