import React from 'react'

interface Props {
  username: string | undefined
  prefix?: string
  className?: string
}

const Username: React.FC<Props> = ({ username, prefix, className = '' }) => {
  return (
    <div
      className={`text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-pink-600 dark:to-pink-400 ${className}`}
    >
      {prefix}
      {username}
    </div>
  )
}

export default Username
