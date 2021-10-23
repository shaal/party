import { gql, useQuery } from '@apollo/client'
import UserProfileLarge from '@components/shared/UserProfileLarge'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { useRouter } from 'next/router'
import React from 'react'

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
      <div className="font-bold text-center space-y-2 text-sm">
        <Spinner size="md" className="mx-auto" />
        <div>Loading moderators</div>
      </div>
    )

  return (
    <div>
      <ErrorMessage title="Failed to load moderators" error={error} />
      <div className="space-y-3">
        {moderators?.map((user: any) => (
          <div key={user?.id}>
            <UserProfileLarge user={user} showFollow />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModeratorsList
