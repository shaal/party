import Head from 'next/head'
import React from 'react'

import { Spinner } from './Spinner'

interface Props {
  message: string
}

export const PageLoading: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="space-y-3">
        <Spinner className="mx-auto" />
        <div>{message}</div>
      </div>
    </div>
  )
}
