import { gql, useQuery } from '@apollo/client'
import { UsersIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { User } from '~/__generated__/schema.generated'
import UserProfileShimmer from '~/components/shared/Shimmer/UserProfileShimmer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import UserProfile from '../../shared/UserProfile'
import { Card, CardBody } from '../../ui/Card'
import { EmptyState } from '../../ui/EmptyState'
import { FollowersQuery } from './__generated__/list.generated'

export const FOLLOWERS_QUERY = gql`
  query FollowersQuery($after: String, $userId: ID!) {
    user(id: $userId) {
      followers(first: 10, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            username
            hasFollowed
            profile {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
`

interface Props {
  user: User
}

const FollowersList: React.FC<Props> = ({ user }) => {
  const { data, loading, error, fetchMore } = useQuery<FollowersQuery>(
    FOLLOWERS_QUERY,
    {
      variables: {
        after: null,
        userId: user?.id
      }
    }
  )
  const followers = data?.user?.followers?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.user?.followers?.pageInfo

  const { observe } = useInView({
    threshold: 1,
    onChange: ({ observe, unobserve }) => {
      unobserve()
      observe()
    },
    onEnter: () => {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            after: pageInfo?.endCursor ? pageInfo?.endCursor : null
          }
        })
      }
    }
  })

  if (loading)
    return (
      <div className="space-y-3">
        <Card>
          <CardBody>
            <UserProfileShimmer showFollow />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <UserProfileShimmer showFollow />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <UserProfileShimmer showFollow />
          </CardBody>
        </Card>
      </div>
    )

  return (
    <div>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {followers?.length === 0 ? (
          <EmptyState
            message={
              <div>
                <span className="font-bold mr-1">@{user?.username}</span>
                <span>doesn’t have any followers yet.</span>
              </div>
            }
            icon={<UsersIcon className="h-8 w-8" />}
          />
        ) : (
          followers?.map((user: any) => (
            <Card key={user?.id}>
              <CardBody>
                <UserProfile user={user} showFollow />
              </CardBody>
            </Card>
          ))
        )}
        <span ref={observe}></span>
      </div>
    </div>
  )
}

export default FollowersList
