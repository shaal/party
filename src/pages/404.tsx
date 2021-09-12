import { HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Fragment } from 'react'

export default function Custom404() {
  return (
    <Fragment>
      <NextSeo title="Page Not Found" />
      <div className="flex flex-col h-full justify-start pt-10 items-center">
        <img
          src="https://cloudflare-ipfs.com/ipfs/QmcK19jxKgs6EwX7mMXtQoYqqNBfDe7wT99WtSfqdq8sTE"
          alt="Not found"
          className="h-60"
        />
        <div className="py-10 text-center">
          <h1 className="text-3xl mb-4 font-bold">Opps, Lost?! </h1>
          <div className="mb-4">This page could not be found.</div>
          <Link href="/signup">
            <a className="inline-flex items-center justify-center w-full px-6 py-2 no-underline bg-indigo-600 border border-indigo-600 rounded-lg cursor-pointer md:w-auto lg:mt-0 hover:bg-indigo-700 hover:border-indigo-700 text-white hover:text-white focus-within:bg-indigo-700 sm:text-lg md:text-xl">
              <HomeIcon className="w-5 h-5 mr-2" />
              Go Home
            </a>
          </Link>
        </div>
      </div>
    </Fragment>
  )
}
