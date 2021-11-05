import { gql, useQuery } from '@apollo/client'
import UserProfileLargeShimmer from '@components/shared/Shimmer/UserProfileLargeShimmer'
import UserProfileLarge from '@components/shared/UserProfileLarge'
import { Card, CardBody } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import { FollowingQuery, User } from '@graphql/types.generated'
import { UsersIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import useInView from 'react-cool-inview'

export const FOLLOWING_QUERY = gql`
  query Following($after: String, $username: String!) {
    user(username: $username) {
      following(first: 10, after: $after) {
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

const FollowingList: React.FC = () => {
  const router = useRouter()
  const { data, loading, error, fetchMore } = useQuery<FollowingQuery>(
    FOLLOWING_QUERY,
    {
      variables: {
        after: null,
        username: router.query.username
      },
      skip: !router.isReady
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

  if (loading)
    return (
      <div className="space-y-3">
        <Card>
          <CardBody>
            <UserProfileLargeShimmer showFollow />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <UserProfileLargeShimmer showFollow />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <UserProfileLargeShimmer showFollow />
          </CardBody>
        </Card>
      </div>
    )

  return (
    <div>
      <ErrorMessage title="Failed to load following" error={error} />
      <div className="space-y-3">
        {following?.length === 0 ? (
          <EmptyState
            message={
              <div>
                <span className="font-bold mr-1">@{router.query.username}</span>
                <span>isn’t following anybody.</span>
              </div>
            }
            icon={<UsersIcon className="h-8 w-8 text-brand-500" />}
          />
        ) : (
          following?.map((user) => (
            <Card key={user?.id}>
              <CardBody>
                <UserProfileLarge user={user as User} showFollow />
              </CardBody>
            </Card>
          ))
        )}
        {pageInfo?.hasNextPage && (
          <span ref={observe} className="flex justify-center p-5">
            <Spinner size="md" />
          </span>
        )}
      </div>
    </div>
  )
}

export default FollowingList
