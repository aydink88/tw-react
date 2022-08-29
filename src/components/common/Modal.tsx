import type { MouseEventHandler, ReactNode } from 'react'

export default function AppModal({
  children,
  classNames,
  label,
  modalAction,
  onLabelClick,
  modalId
}: {
  children: ReactNode
  classNames?: string
  label: string
  modalAction?: ReactNode
  onLabelClick?: MouseEventHandler
  modalId: string
}) {
  return (
    <>
      <label
        htmlFor={modalId}
        className={`cursor-pointer${classNames ? ' ' + classNames : ''}`}
        onClick={onLabelClick}
      >
        {label}
      </label>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor={modalId}
            className="absolute top-2 right-2 btn btn-ghost btn-sm btn-circle"
          >
            ✕
          </label>
          {children}
          <div className="modal-action">{modalAction}</div>
        </div>
      </div>
    </>
  )
}
