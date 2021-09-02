import React, { useState } from 'react'

interface Props {
  children: React.ReactChild
  content: string
}

export const Tooltip: React.FC<Props> = ({ children, content }) => {
  const [expanded, setExpanded] = useState(false)

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
            top: '-0.5rem',
            left: '50%',
            transform: 'translate(-50%, -100%)'
          }}
          className={`mt-2 z-50 py-1 px-2 bg-gray-900 text-gray-100 text-sm absolute flex flex-col border border-gray-200 dark:border-gray-800 rounded-md truncated whitespace-nowrap`}
        >
          {content}
        </div>
      ) : null}
    </div>
  )
}
