type Props = {
  checked: boolean
  onChange: (v:boolean)=>void
  label?: string
}

export function Switch({ checked, onChange, label }: Props) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <span className="muted text-sm">{label}</span>
      <span onClick={()=>onChange(!checked)} className={"w-10 h-6 rounded-full p-0.5 transition " + (checked? "bg-primary-600":"bg-slate-300")}>
        <span className={"block h-5 w-5 bg-white rounded-full transition "+(checked? "translate-x-4":"")} />
      </span>
    </label>
  )
}
