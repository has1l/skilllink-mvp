import { TextareaHTMLAttributes } from 'react'

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={"min-h-[120px] p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-200 w-full bg-white "+(props.className||'') } />
}
