import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { User } from 'src/__generated__/schema.generated'

import { ViewUserQuery } from './__generated__/ViewUser.generated'
import Details from './Details'
import UserFeed from './Feed'
import FeedType from './FeedType'

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    username
    hasFollowed
    isFollowing
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
  const [feedType, setFeedType] = useState<string>('POST')
  const { data, loading, error } = useQuery<ViewUserQuery>(VIEW_USER_QUERY, {
    variables: {
      username: router.query.username
    },
    ssr: true,
    skip: !router.isReady
  })

  if (loading) return <PageLoading message="Loading user" />

  return (
    <>
      <DevpartySEO
        title={`${data?.user?.username} (${data?.user?.profile?.name}) · Devparty`}
        description={data?.user?.profile?.bio as string}
        image={data?.user?.profile?.avatar as string}
        path={`/@/${data?.user?.username}`}
      />
      {data?.user?.profile?.cover ? (
        <img
          className="object-cover bg-gradient-to-r from-blue-400 to-purple-400 h-64 w-full"
          src={data?.user?.profile?.cover as string}
          alt={`@${data?.user?.username}'s cover`}
        />
      ) : (
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-64 w-full" />
      )}
      <GridLayout>
        <GridItemFour>
          <ErrorMessage title="Failed to load post" error={error} />
          <Details user={data?.user as User} />
        </GridItemFour>
        <GridItemEight>
          <div className="space-y-3">
            <FeedType setFeedType={setFeedType} feedType={feedType} />
            <UserFeed feedType={feedType} />
          </div>
        </GridItemEight>
      </GridLayout>
    </>
  )
}

export default ViewUser
