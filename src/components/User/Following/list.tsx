import { gql, useQuery } from '@apollo/client'
import { UsersIcon } from '@heroicons/react/outline'
import React from 'react'
import useInView from 'react-cool-inview'

import { User } from '~/__generated__/schema.generated'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import UserProfile from '../../shared/UserProfile'
import { Card, CardBody } from '../../ui/Card'
import { EmptyState } from '../../ui/EmptyState'
import { FollowingQuery } from './__generated__/list.generated'

export const FOLLOWING_QUERY = gql`
  query FollowingQuery($after: String, $username: String!) {
    user(username: $username) {
      following(first: 5, after: $after) {
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

const FollowingList: React.FC<Props> = ({ user }) => {
  const { data, loading, error, fetchMore } = useQuery<FollowingQuery>(
    FOLLOWING_QUERY,
    {
      variables: {
        after: null,
        username: user?.username
      }
    }
  )
  const following = data?.user?.following?.edges?.map((edge) => edge?.node)
  const pageInfo = data?.user?.following?.pageInfo

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

  if (loading) {
    return <div>Loading following...</div>
  }

  return (
    <div>
      <ErrorMessage title="Failed to load posts" error={error} />
      {following?.length === 0 ? (
        <EmptyState
          message={
            <div>
              <span className="font-bold mr-1">@{user?.username}</span>
              <span>is not following anyone!</span>
            </div>
          }
          icon={<UsersIcon className="h-8 w-8" />}
        />
      ) : (
        <div className="space-y-3">
          {following?.map((user: any) => (
            <Card key={user?.id}>
              <CardBody>
                <UserProfile user={user} showFollow />
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <span ref={observe}></span>
    </div>
  )
}

export default FollowingList
