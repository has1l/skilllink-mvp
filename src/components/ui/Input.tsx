import { InputHTMLAttributes } from 'react'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={"h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-200 w-full bg-white "+(props.className||'') } />
}
