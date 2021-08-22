import Link from 'next/link'
import React from 'react'

import { Button } from '../ui/Button'

const Landing: React.FC = () => {
  return (
    <div className="flex flex-grow items-center justify-center justify-items-center">
      <div className="max-w-md w-full">
        <div className="space-y-6 mx-auto">
          <img className="h-14" src="/logo.svg" alt="Devparty" />
          <div className="font-serif font-extrabold text-3xl">
            The social media for developers
          </div>
          <div className="space-x-4 flex">
            <div className="hidden sm:block">
              <Link href="/signup" passHref>
                <Button size="lg" variant="primary">
                  Signup
                </Button>
              </Link>
            </div>
            <div>
              <Link href="/login" passHref>
                <Button size="lg" variant="success">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
