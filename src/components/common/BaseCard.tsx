import type { ReactNode } from 'react'

export default function BaseCard({
  title = '',
  children,
  actions: Actions = ''
}: {
  title?: string
  children: ReactNode
  actions?: JSX.Element | string
}) {
  return (
    <div className="overflow-visible mb-8 shadow card bg-base-100">
      <div className="card-body">
        <h2 className="card-title custom-title">{title}</h2>
        <hr />
        <div className="mt-2"></div>
        {children}
        <div className="mt-2"></div>
        {Actions}
      </div>
    </div>
  )
}
