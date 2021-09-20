import { GridLayout } from '@components/GridLayout'
import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <GridLayout>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="mb-2">This page could not be found.</div>
      <Link href="/">Go home.</Link>
    </GridLayout>
  )
}
