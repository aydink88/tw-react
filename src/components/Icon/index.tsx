import { ReactNode } from 'react'

type SvgProps = {
  size: number
  iconColor: string
  children: ReactNode
}

export default function Icon({ size = 20, iconColor = 'currentColor', children }: SvgProps) {
  return (
    <svg
      height={size}
      width={size}
      fill="none"
      stroke={iconColor}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}
