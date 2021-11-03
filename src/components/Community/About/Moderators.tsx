import { gql, useQuery } from '@apollo/client'
import UserProfileLargeShimmer from '@components/shared/Shimmer/UserProfileLargeShimmer'
import UserProfileLarge from '@components/shared/UserProfileLarge'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { useRouter } from 'next/router'
import React from 'react'
import { User } from 'src/__generated__/schema.generated'

import { ModeratorsQuery } from './__generated__/Moderators.generated'

export const MODERATORS_QUERY = gql`
  query ModeratorsQuery($after: String, $slug: String!) {
    community(slug: $slug) {
      moderators(first: 10, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            username
            isVerified
            isFollowing
            hasFollowed
            profile {
              id
              name
              avatar
              bio
            }
          }
        }
      }
    }
  }
`

const ModeratorsList: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<ModeratorsQuery>(MODERATORS_QUERY, {
    variables: {
      after: null,
      slug: router.query.slug
    },
    skip: !router.isReady
  })
  const moderators = data?.community?.moderators?.edges?.map(
    (edge) => edge?.node
  )

  if (loading)
    return (
      <div className="space-y-5 py-5">
        <UserProfileLargeShimmer showFollow />
        <UserProfileLargeShimmer showFollow />
        <UserProfileLargeShimmer showFollow />
      </div>
    )

  return (
    <div className="space-y-5 py-5">
      <ErrorMessage title="Failed to load moderators" error={error} />
      {moderators?.map((user) => (
        <div key={user?.id}>
          <UserProfileLarge user={user as User} showFollow />
        </div>
      ))}
    </div>
  )
}

export default ModeratorsList
