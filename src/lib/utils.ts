import clsx from 'clsx'

export function cn(...args: any[]) {
  return clsx(args)
}

export function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleString()
}

export function fmtDateISO(iso: string) {
  const d = new Date(iso)
  const date = d.toLocaleDateString()
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${date} ${time}`
}
