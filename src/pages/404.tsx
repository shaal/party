import DevpartySEO from '@components/shared/SEO'
import { Button } from '@components/ui/Button'
import { HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <DevpartySEO title="Page Not Found" />
      <div className="flex flex-col h-full justify-start pt-10 items-center">
        <img
          src="https://assets.devparty.io/images/gifs/nyan-cat.gif"
          alt="Nyan Cat"
          className="h-60"
        />
        <div className="py-10 text-center">
          <h1 className="text-3xl mb-4 font-bold">Oops, Lost‽</h1>
          <div className="mb-4">This page could not be found.</div>
          <Link href="/signup" passHref>
            <a>
              <Button
                className="flex item-center mx-auto"
                size="lg"
                icon={<HomeIcon className="w-4 h-4" />}
              >
                <div>Go to home</div>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
