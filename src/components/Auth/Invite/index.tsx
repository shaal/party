import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import React from 'react'

import Hero from '~/components/shared/Hero'
import Slug from '~/components/shared/Slug'

import { GetInviteQuery } from './__generated__/index.generated'
import SignupForm from './Form'

export const GET_INVITE_QUERY = gql`
  query GetInviteQuery($code: String!) {
    invite(code: $code) {
      user {
        id
        username
      }
    }
  }
`

const InviteSignup: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<GetInviteQuery>(GET_INVITE_QUERY, {
    variables: {
      code: router.query.code
    },
    skip: !router.isReady
  })

  return (
    <div className="flex flex-grow">
      <NextSeo
        title="Join Devparty"
        description="Join the social media for developers"
      />
      <div className="grid grid-cols-12 w-full">
        <Hero />
        <div className="lg:col-span-5 md:col-span-12 col-span-12 py-8 lg:px-14 md:px-10 sm:px-5 px-5 flex flex-col">
          <div className="space-y-7 flex-grow">
            <img
              src="https://i.ibb.co/BKTVBtF/invite.png"
              className="w-20"
              alt="Hero"
            />
            <div className="space-y-2">
              <div className="font-extrabold text-4xl">Signup</div>
              {loading ? (
                <div className="shimmer h-7 max-w-sm rounded-lg" />
              ) : (
                !error && (
                  <div className="text-xl">
                    <Link href={`/@/${data?.invite?.user?.username}`}>
                      <a className="font-bold">
                        <Slug slug={data?.invite?.user?.username} prefix="@" />{' '}
                        invited you to the party
                      </a>
                    </Link>
                  </div>
                )
              )}
              <div className="linkify">
                Already have an account?{' '}
                <Link href="/login">
                  <a className="font-bold">Login now</a>
                </Link>
              </div>
            </div>
            {error ? (
              <div className="text-red-500 text-xl font-bold">
                {error?.message}
              </div>
            ) : (
              <SignupForm />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InviteSignup
