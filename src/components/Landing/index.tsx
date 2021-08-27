import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { Button } from '../ui/Button'

const Landing: React.FC = () => {
  return (
    <div className="flex flex-grow justify-center">
      <div className="grid grid-cols-12 w-full">
        <div
          className="lg:col-span-7 md:col-span-12 col-span-12 bg-indigo-600 md:block hidden"
          style={{
            backgroundImage: `url('https://cloudflare-ipfs.com/ipfs/bafybeicsg73girok5jgd23wau7xyoq7fquvmr5qss6ojeycxkqelmhsnlm/topography.svg')`
          }}
        ></div>
        <div className="lg:col-span-5 md:col-span-12 col-span-12 py-8 lg:px-14 md:px-10 sm:px-5 px-5 flex flex-col">
          <div className="space-y-7 flex-grow">
            <img
              src="https://i.ibb.co/MZrdTpS/hero.png"
              className="w-20"
              alt="Hero"
            />
            <div className="font-extrabold text-4xl">
              Welcome, To the social media for developers
            </div>
            <div className="font-bold text-gray-700 text-2xl">
              Join Devparty today.
            </div>
            <div className="space-x-4 flex">
              <Link href="/signup" passHref>
                <Button
                  size="lg"
                  variant="primary"
                  className="flex items-center space-x-1.5"
                >
                  <ArrowCircleRightIcon className="h-5 w-5" />
                  <div>Get started</div>
                </Button>
              </Link>
            </div>
            <div className="linkify">
              Already have an account?{' '}
              <Link href="/login">
                <a className="font-bold">Log in</a>
              </Link>
            </div>
          </div>
          <footer className="leading-7 flex flex-wrap">
            <span className="text-gray-500 dark:text-gray-300 font-bold pr-3">
              © Devparty
            </span>
            <span className="pr-3">
              <Link href="/">About</Link>
            </span>
            <span className="pr-3">
              <Link href="/">Terms</Link>
            </span>
            <span className="pr-3">
              <Link href="/">Privacy</Link>
            </span>
            <a
              href="https://gitlab.com/yo/devparty"
              target="_blank"
              rel="noreferrer"
            >
              Status
            </a>
          </footer>
          <a
            className="mt-2 hover:font-bold"
            href="https://vercel.com/?utm_source=Devparty&utm_campaign=oss"
            target="_blank"
            rel="noreferrer"
          >
            ▲ Powered by Vercel
          </a>
        </div>
      </div>
    </div>
  )
}

export default Landing
