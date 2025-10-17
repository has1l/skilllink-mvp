import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm'|'md'|'lg'
}

export function Button({ className, variant='primary', size='md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition shadow-soft disabled:opacity-60 disabled:cursor-not-allowed'
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-5 text-lg'
  }[size]
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border border-slate-200 hover:bg-slate-50',
    ghost: 'hover:bg-slate-100'
  }[variant]
  return <button className={cn(base, sizes, variants, className)} {...props} />
}
