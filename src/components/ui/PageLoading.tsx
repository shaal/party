import { NextSeo } from 'next-seo'
import React from 'react'

import { Spinner } from './Spinner'

interface Props {
  message: string
}

export const PageLoading: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <NextSeo title="Loading..." />
      <div className="space-y-3">
        <Spinner className="mx-auto" />
        <div>{message}</div>
      </div>
    </div>
  )
}
