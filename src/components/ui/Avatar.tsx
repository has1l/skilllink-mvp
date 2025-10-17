type Props = { src?: string; alt?: string; size?: number }

export function Avatar({ src, alt, size=40 }: Props) {
  return (
    <img src={src || '/avatar-placeholder.svg'} alt={alt} width={size} height={size}
      className="rounded-full object-cover border border-white shadow-soft" />
  )
}
