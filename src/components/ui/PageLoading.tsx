import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {
  message: string
}

export const PageLoading: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <NextSeo title="Loading..." />
      <div>{message}</div>
    </div>
  )
}
