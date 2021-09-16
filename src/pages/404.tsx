import { Button } from '@components/ui/Button'
import { HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function Custom404() {
  return (
    <>
      <NextSeo title="Page Not Found" />
      <div className="flex flex-col h-full justify-start pt-10 items-center">
        <img
          src="https://cloudflare-ipfs.com/ipfs/QmcK19jxKgs6EwX7mMXtQoYqqNBfDe7wT99WtSfqdq8sTE"
          alt="Not found"
          className="h-60"
        />
        <div className="py-10 text-center">
          <h1 className="text-3xl mb-4 font-bold">Oops, Lost‽</h1>
          <div className="mb-4">This page could not be found.</div>
          <Link href="/signup" passHref>
            <a>
              <Button className="flex item-center mx-auto" size="lg">
                <HomeIcon className="w-5 h-5 mr-2" />
                <div>Go to home</div>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
