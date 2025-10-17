import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export function Badge({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex items-center gap-1 px-2.5 h-7 rounded-full text-xs bg-slate-100 text-slate-700', className)} {...rest} />
}
