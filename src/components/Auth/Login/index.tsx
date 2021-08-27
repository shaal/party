import Link from 'next/link'
import React from 'react'

import LoginForm from './Form'

const Login: React.FC = () => {
  return (
    <div className="flex flex-grow">
      <div className="grid grid-cols-12 w-full">
        <div
          className="lg:col-span-7 md:col-span-12 col-span-12 bg-indigo-600 dark:bg-indigo-700 md:block hidden"
          style={{
            backgroundImage: `url('https://cloudflare-ipfs.com/ipfs/bafybeicsg73girok5jgd23wau7xyoq7fquvmr5qss6ojeycxkqelmhsnlm/topography.svg')`
          }}
        ></div>
        <div className="lg:col-span-5 md:col-span-12 col-span-12 py-8 lg:px-14 md:px-10 sm:px-5 px-5 flex flex-col">
          <div className="space-y-7 flex-grow">
            <img
              src="https://i.ibb.co/pz5w2Np/lock.png"
              className="w-20"
              alt="Hero"
            />
            <div className="space-y-2">
              <div className="font-extrabold text-4xl">Login</div>
              <div className="linkify">
                New to Devparty?{' '}
                <Link href="/signup">
                  <a className="font-bold">Sign up for an account</a>
                </Link>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
