import Link from 'next/link'
import React from 'react'

import LandingFooter from '~/components/shared/LandingFooter'

import SignupForm from './Form'

const Signup: React.FC = () => {
  return (
    <div className="flex flex-grow">
      <div className="grid grid-cols-12 w-full">
        <div className="lg:col-span-5 md:col-span-12 col-span-12 py-8 lg:px-14 md:px-10 sm:px-5 px-5 flex flex-col">
          <div className="space-y-7 flex-grow">
            <img
              src="https://i.ibb.co/MZrdTpS/hero.png"
              className="w-20"
              alt="Hero"
            />
            <div className="space-y-2">
              <div className="font-extrabold text-4xl">Signup your account</div>
              <div className="font-extrabold linkify">
                or{' '}
                <Link href="/login">
                  <a>login now</a>
                </Link>
              </div>
            </div>
            <SignupForm />
          </div>
          <LandingFooter />
        </div>
        <div
          className="lg:col-span-7 md:col-span-12 col-span-12 bg-indigo-600 md:block hidden"
          style={{
            backgroundImage: `url('https://cloudflare-ipfs.com/ipfs/bafybeicsg73girok5jgd23wau7xyoq7fquvmr5qss6ojeycxkqelmhsnlm/topography.svg')`
          }}
        ></div>
      </div>
    </div>
  )
}

export default Signup
