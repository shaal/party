import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { Button } from '../ui/Button'

const Landing: React.FC = () => {
  return (
    <div className="flex flex-grow justify-center">
      <div className="grid grid-cols-12 w-full">
        <div
          className="lg:col-span-7 md:col-span-12 col-span-12 bg-indigo-500"
          style={{ backgroundImage: `url('https://svgur.com/i/_Zt.svg')` }}
        ></div>
        <div className="lg:col-span-5 md:col-span-12 col-span-12 py-8 lg:px-16 md:px-10 sm:px-5 px-3">
          <div className="space-y-6 mx-auto">
            <div className="font-extrabold text-4xl">
              The social media for developers
            </div>
            <div className="font-bold text-gray-700 text-2xl mt-3">
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
        </div>
      </div>
    </div>
  )
}

export default Landing
