import React from 'react'

interface Props {
  message: string
}

export const PageLoading: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <div>{message}</div>
    </div>
  )
}
