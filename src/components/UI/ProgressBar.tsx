import React from 'react'

interface Props {
  percentage: number
  className?: string
}

export const ProgressBar: React.FC<Props> = ({
  percentage,
  className = ''
}) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-brand-500 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}
