import { SetStateAction, useState } from 'react'
import type { TTimelineMenu, TTimelineOption } from 'types'

export default function TimelineMenu({
  options,
  activeOption,
  setActiveOption
}: {
  options: TTimelineMenu
  activeOption: TTimelineOption
  setActiveOption: SetStateAction<any>
}) {
  return (
    <div className="py-4 bg-base-100 card">
      {options.map((item) => (
        <div
          key={item.text}
          className={`px-4 py-1 border-l-4 border-white${
            item.id === activeOption
              ? ' border-l-4 border-blue-500 text-blue-500'
              : ' cursor-pointer'
          }`}
          onClick={() => setActiveOption(item.id)}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}
