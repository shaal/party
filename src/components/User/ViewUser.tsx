import { gql, useQuery } from '@apollo/client'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import { User } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import DetailsShimmer from '../shared/Shimmer/DetailsShimmer'
import { UserQuery } from './__generated__/ViewUser.generated'
import Details from './Details'
import UserFeed from './Feed'

export const USER_QUERY = gql`
  query UserQuery($username: String!) {
    user(username: $username) {
      id
      username
      hasFollowed
      followersCount
      followingCount
      isVerified
      isStaff
      spammy
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
  }
`

const ViewUser: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<UserQuery>(USER_QUERY, {
    variables: {
      username: router.query.username!.slice(1)
    },
    skip: !router.isReady
  })

  return (
    <Fragment>
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
          {loading ? <DetailsShimmer /> : <Details user={data?.user as User} />}
        </GridItemFour>
        <GridItemEight>
          <UserFeed user={data?.user as User} />
        </GridItemEight>
      </GridLayout>
    </Fragment>
  )
}

export default ViewUser
