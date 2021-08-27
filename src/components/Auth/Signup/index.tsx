import Link from 'next/link'
import React from 'react'

import SignupForm from './Form'

const Signup: React.FC = () => {
  return (
    <div className="flex flex-grow">
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
              src="https://i.ibb.co/kQ8b5Nb/handshake.png"
              className="w-20"
              alt="Hero"
            />
            <div className="space-y-2">
              <div className="font-extrabold text-4xl">Sign up</div>
              <div className="linkify">
                Already have an account?{' '}
                <Link href="/login">
                  <a className="font-bold">Login now</a>
                </Link>
              </div>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
