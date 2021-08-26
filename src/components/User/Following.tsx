import { gql, useQuery } from '@apollo/client'
import { UsersIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import useInView from 'react-cool-inview'

import { User } from '~/__generated__/schema.generated'
import DetailsShimmer from '~/components/shared/Shimmer/DetailsShimmer'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import UserProfile from '../shared/UserProfile'
import { Card, CardBody } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { UserFollowingQuery } from './__generated__/Following.generated'
import Details from './Details'
import { UserFragment } from './ViewUser'

export const USER_FOLLOWING_QUERY = gql`
  query UserFollowingQuery($after: String, $username: String!) {
    user(username: $username) {
      ...UserFragment
      followers {
        totalCount
      }
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
  const following = data?.user?.following?.edges?.map((edge: any) => edge?.node)
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
            after: pageInfo?.endCursor
          }
        })
      }
    }
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
          {following?.length === 0 ? (
            <EmptyState
              message={
                <div>
                  <span className="font-bold mr-1">
                    @{data?.user?.username}
                  </span>
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
        </GridItemEight>
      </GridLayout>
    </Fragment>
  )
}

export default Following
