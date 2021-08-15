import React from 'react'

interface Props {
  username: string | undefined
  showAt?: boolean
  className?: string
}

const Username: React.FC<Props> = ({
  username,
  className = '',
  showAt = true
}) => {
  return (
    <div
      className={`text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-pink-600 dark:to-pink-400 ${className}`}
    >
      {showAt && '@'}
      {username}
    </div>
  )
}

export default Username
