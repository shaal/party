import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import { User } from '~/__generated__/schema.generated'
import DetailsShimmer from '~/components/shared/Shimmer/DetailsShimmer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { GridItemEight, GridItemFour, GridLayout } from '../../GridLayout'
import Details from '../Details'
import { UserFragment } from '../ViewUser'
import { UserFollowingQuery } from './__generated__/index.generated'

export const USER_FOLLOWING_QUERY = gql`
  query UserFollowingQuery($username: String!) {
    user(username: $username) {
      ...UserFragment
    }
  }
  ${UserFragment}
`

const Following: React.FC = () => {
  const router = useRouter()
  const { data, loading, error, fetchMore } = useQuery<UserFollowingQuery>(
    USER_FOLLOWING_QUERY,
    {
      variables: {
        after: null,
        username: router.query.username!.slice(1)
      },
      skip: !router.isReady
    }
  )

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
        <GridItemEight>WIP</GridItemEight>
      </GridLayout>
    </Fragment>
  )
}

export default Following
