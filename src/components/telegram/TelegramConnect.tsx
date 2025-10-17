import { Button } from '../ui/Button'
import { useStore } from '@/lib/store'
import { telegramDeepLink } from '@/lib/telegram'

export function TelegramConnect() {
  const code = useStore(s=>s.linkCode)
  const gen = useStore(s=>s.generateLinkCode)
  const complete = useStore(s=>s.completeTelegramLink)
  const me = useStore(s=>s.me)

  return (
    <div className="card p-5 max-w-xl">
      <div className="headline">Привязка Telegram</div>
      <p className="text-slate-600 mt-2">Свяжите аккаунт, чтобы получать уведомления о новых совпадениях, сообщениях и запросах на отзыв.</p>

      {!me.telegramLinked ? (
        <>
          <div className="mt-4">
            <div className="text-sm text-slate-600 mb-1">1) Получите одноразовый код</div>
            <div className="flex gap-2">
              <input readOnly value={code || '— — — — — —'} className="h-10 px-3 rounded-lg border border-slate-200 w-[160px] text-center tracking-widest font-mono" />
              <Button onClick={gen}>Сгенерировать</Button>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-slate-600 mb-1">2) Откройте бота и нажмите Start</div>
            <div className="flex gap-2">
              <a href={telegramDeepLink(code || '')} target="_blank" className="inline-flex"><Button>Открыть бота</Button></a>
              <div className="text-sm text-slate-500 self-center">или найдите <span className="font-mono">@skilllink_demo_bot</span></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-slate-600 mb-1">3) Введите код для подтверждения</div>
            <form className="flex gap-2" onSubmit={(e)=>{e.preventDefault(); const ok = complete((document.getElementById('code') as HTMLInputElement).value.trim()); alert(ok?'Готово! Аккаунты связаны.':'Код не подходит');}}>
              <input id="code" placeholder="Вставьте код" className="h-10 px-3 rounded-lg border border-slate-200 w-[160px] text-center tracking-widest font-mono" />
              <Button type="submit">Подтвердить</Button>
            </form>
          </div>
        </>
      ) : (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">Telegram успешно привязан ✅</div>
      )}
    </div>
  )
}
