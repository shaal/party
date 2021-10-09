import React, { useState } from 'react'

interface Props {
  children: React.ReactNode
  content: string
}

export const Tooltip: React.FC<Props> = ({ children, content }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div
      onMouseLeave={() => setExpanded(false)}
      onMouseEnter={() => setExpanded(true)}
      className="relative"
    >
      <div>{children}</div>
      {expanded ? (
        <div
          style={{
            transform: 'translate(-50%, -100%)'
          }}
          className="-top-3 left-1/2 mt-2 z-50 py-0.5 px-2 bg-gray-900 text-gray-100 text-xs font-bold absolute flex flex-col border border-gray-800 rounded-lg truncated whitespace-nowrap"
        >
          {content}
        </div>
      ) : null}
    </div>
  )
}
