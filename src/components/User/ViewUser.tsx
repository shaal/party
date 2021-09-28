import { gql, useQuery } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import DevpartySEO from '@components/shared/SEO'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { PageLoading } from '@components/ui/PageLoading'
import { imagekitURL } from '@components/utils/imagekitURL'
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
      coverBg
      name
      bio
      location
      website
      twitter
      github
      discord
    }
    tip {
      id
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

const ViewUser = () => {
  const router = useRouter()
  const [feedType, setFeedType] = useState<string>('POST')
  const { data, loading, error } = useQuery<ViewUserQuery>(VIEW_USER_QUERY, {
    variables: {
      username: router.query.username
    },
    skip: !router.isReady
  })
  const user = data?.user

  if (!router.isReady || loading) return <PageLoading message="Loading user" />

  if (!user) return window.location.replace('/home')

  return (
    <>
      <DevpartySEO
        title={`${user?.username} (${user?.profile?.name}) · Devparty`}
        description={user?.profile?.bio as string}
        image={user?.profile?.avatar as string}
        path={`/@/${user?.username}`}
      />
      <div
        className="h-64"
        style={{
          backgroundImage: `url(${imagekitURL(
            user?.profile?.cover as string
          )})`,
          backgroundColor: `#${user?.profile?.coverBg}`,
          backgroundSize: '60%'
        }}
      />
      <GridLayout>
        <GridItemFour>
          <ErrorMessage title="Failed to load post" error={error} />
          <Details user={user as User} />
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
