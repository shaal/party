import DevpartySEO from '@components/shared/SEO'
import { Button } from '@components/UI/Button'
import { HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { ERROR_MESSAGE, STATIC_ASSETS } from 'src/constants'

export default function Custom500() {
  return (
    <div className="page-center flex-col">
      <DevpartySEO title={`${ERROR_MESSAGE} · Devparty`} />
      <img
        src={`${STATIC_ASSETS}/gifs/nyan-cat.gif`}
        alt="Nyan Cat"
        className="h-60"
      />
      <div className="py-10 text-center">
        <h1 className="text-3xl mb-4 font-bold">
          Looks like something went wrong!
        </h1>
        <div className="mb-4">
          We track these errors automatically, but if the problem persists feel
          free to contact us. In the meantime, try refreshing.
        </div>
        <Link href="/signup" passHref>
          <a href="/signup">
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
  )
}
