type Props = {
  text: string
  active?: boolean
  onClick?: () => void
}

export function Chip({ text, active, onClick }: Props) {
  return (
    <button onClick={onClick} className={"px-3 h-8 rounded-full border text-sm "+(active? "bg-primary-50 text-primary-700 border-primary-200":"bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}>
      {text}
    </button>
  )
}
