import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import React, { Fragment, useState } from 'react'

import { User } from '~/__generated__/schema.generated'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { PageLoading } from '../ui/PageLoading'
import { ViewUserQuery } from './__generated__/ViewUser.generated'
import Details from './Details'
import UserFeed from './Feed'
import FeedType from './FeedType'

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    username
    hasFollowed
    hasWakatimeIntegration
    hasSpotifyIntegration
    isVerified
    isStaff
    spammy
    followers {
      totalCount
    }
    following {
      totalCount
    }
    posts {
      totalCount
    }
    profile {
      id
      avatar
      cover
      name
      bio
      location
      website
      twitter
      github
      discord
    }
  }
`

export const VIEW_USER_QUERY = gql`
  query ViewUserQuery($username: String!) {
    user(username: $username) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

const ViewUser: React.FC = () => {
  const router = useRouter()
  const [feedType, setFeedType] = useState<string>('ALL')
  const { data, loading, error } = useQuery<ViewUserQuery>(VIEW_USER_QUERY, {
    variables: {
      username: router.query.username
    },
    skip: !router.isReady
  })

  if (loading) return <PageLoading message="Profile Loading..." />

  return (
    <Fragment>
      <NextSeo
        title={`${data?.user?.username} (${data?.user?.profile?.name})`}
        description={data?.user?.profile?.bio as string}
      />
      {data?.user?.profile?.cover ? (
        <img
          className="object-cover bg-gradient-to-r from-blue-400 to-purple-400 h-60 w-full"
          src={data?.user?.profile?.cover as string}
          alt={`@${data?.user?.username}'s cover`}
        />
      ) : (
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-60 w-full" />
      )}
      <GridLayout>
        <GridItemFour>
          <ErrorMessage title="Failed to load post" error={error} />
          <Details user={data?.user as User} />
        </GridItemFour>
        <GridItemEight>
          <div className="space-y-3">
            <FeedType user={data?.user as User} setFeedType={setFeedType} />
            <UserFeed user={data?.user as User} feedType={feedType} />
          </div>
        </GridItemEight>
      </GridLayout>
    </Fragment>
  )
}

export default ViewUser
