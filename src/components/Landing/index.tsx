import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import { Button } from '../ui/Button'

const Landing: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-screen-2xl flex-grow py-8 lg:px-16 md:px-10 sm:px-5 px-0">
        <div className="grid grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 md:col-span-12 col-span-12">
            <div className="space-y-6 mx-auto">
              <div className="font-serif font-extrabold text-3xl">
                The social media for developers
              </div>
              <div className="space-x-4 flex">
                <div className="hidden sm:block">
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
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 md:col-span-12 col-span-12">hi</div>
        </div>
      </div>
    </div>
  )
}

export default Landing
