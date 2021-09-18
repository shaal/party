import { HeartIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'
import React, { Fragment } from 'react'

import Footer from '../shared/Footer'

interface Props {
  name: string
  logo: string
  url: string
  size: number
  children: React.ReactNode
}

const Sponsor: React.FC<Props> = ({ name, logo, url, size, children }) => {
  const { resolvedTheme } = useTheme()

  return (
    <div className="space-y-5 pt-10">
      <img
        className="mx-auto"
        style={{ height: size }}
        src={`https://assets.devparty.io/images/sponsors/${logo}-${
          resolvedTheme === 'dark' ? 'dark' : 'light'
        }.svg`}
        alt={`${name}'s Logo`}
      />
      <div className="pt-2">{children}</div>
      <div>
        <a className="font-bold" href={url} target="_blank" rel="noreferrer">
          ➜ Go to {name}
        </a>
      </div>
    </div>
  )
}

const Sponsors: React.FC = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center bg-brand-400 h-44 w-full">
        <div className="relative text-center">
          <div className="flex items-center space-x-2 text-3xl md:text-4xl font-semibold text-white">
            <div>Thank you!</div>
            <HeartIcon className="h-7 w-7 text-pink-600" />
          </div>
          <div className="text-white">for supporting our community</div>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center">
          <div className="relative mx-auto rounded-lg max-w-3/4 lg:w-2/4">
            <div className="pb-10 px-5 max-w-none text-gray-900 dark:text-gray-200 text-center space-y-10 divide-y dark:divide-gray-800">
              <Sponsor
                name="Vercel"
                logo="vercel"
                url="https://vercel.com/?utm_source=Devparty&utm_campaign=oss"
                size={40}
              >
                Vercel combines the best developer experience with an obsessive
                focus on end-user performance. Vercel platform enables frontend
                teams to do their best work.
              </Sponsor>
              <Sponsor
                name="Upstash"
                logo="upstash"
                url="https://upstash.com"
                size={55}
              >
                Upstash has REST API that enables access to Redis from
                serverless and Edge functions like Cloudflare Workers and Fastly
                Compute@Edge.
              </Sponsor>
              <Sponsor
                name="Netlify"
                logo="netlify"
                url="https://netlify.com"
                size={50}
              >
                An intuitive Git-based workflow and powerful serverless platform
                to build, deploy, and collaborate on web apps
              </Sponsor>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 pb-6 px-5">
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default Sponsors
