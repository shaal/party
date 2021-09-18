import { HeartIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'

import Footer from '../shared/Footer'

interface Props {
  name: string
  logo: string
  url: string
  children: React.ReactNode
}

const Sponsor: React.FC<Props> = ({ name, logo, url, children }) => (
  <div className="space-y-5 pt-10">
    <img className="h-14 mx-auto" src={logo} alt={`${name}'s Logo`} />
    <div className="pt-2">{children}</div>
    <div>
      <a className="font-bold" href={url} target="_blank" rel="noreferrer">
        ➜ Go to {name}
      </a>
    </div>
  </div>
)

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
            <div className="pb-10 px-5 max-w-none text-gray-900 dark:text-gray-200 text-center space-y-10 divide-y">
              <Sponsor
                name="Vercel"
                logo="https://assets.devparty.io/images/sponsors/vercel-dark.svg"
                url="https://vercel.com/?utm_source=Devparty&utm_campaign=oss"
              >
                Vercel combines the best developer experience with an obsessive
                focus on end-user performance. Vercel platform enables frontend
                teams to do their best work.
              </Sponsor>
              <Sponsor
                name="Upstash"
                logo="https://assets.devparty.io/images/sponsors/upstash-light.svg"
                url="https://upstash.com"
              >
                Upstash has REST API that enables access to Redis from
                serverless and Edge functions like Cloudflare Workers and Fastly
                Compute@Edge.
              </Sponsor>
              <Sponsor
                name="Netlify"
                logo="https://assets.devparty.io/images/sponsors/netlify-light.svg"
                url="https://netlify.com"
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
