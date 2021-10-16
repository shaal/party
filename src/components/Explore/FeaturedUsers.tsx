import { gql, useQuery } from '@apollo/client'
import UserProfileShimmer from '@components/shared/Shimmer/UserProfileShimmer'
import UserProfile from '@components/shared/UserProfile'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { UsersIcon } from '@heroicons/react/outline'
import { SparklesIcon } from '@heroicons/react/solid'
import React from 'react'

import { FeaturedUsersQuery } from './__generated__/FeaturedUsers.generated'

const FEATURED_USERS_QUERY = gql`
  query FeaturedUsersQuery {
    featuredUsers {
      edges {
        node {
          id
          username
          hasFollowed
          isVerified
          profile {
            id
            avatar
            name
          }
        }
      }
    }
  }
`

const FeaturedUsersCard = ({ children }: any) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3 lg:mb-2 px-3 lg:px-0">
        <SparklesIcon className="h-4 w-4 text-yellow-500" />
        <div>Featured users</div>
      </div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

const FeaturedUsers: React.FC = () => {
  const { data, loading, error } = useQuery<FeaturedUsersQuery>(
    FEATURED_USERS_QUERY,
    {
      notifyOnNetworkStatusChange: true
    }
  )
  const users = data?.featuredUsers?.edges?.map((edge) => edge?.node)

  if (loading)
    return (
      <FeaturedUsersCard>
        <div className="space-y-4">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </div>
      </FeaturedUsersCard>
    )

  return (
    <FeaturedUsersCard>
      <ErrorMessage title="Failed to load users" error={error} />
      <div className="space-y-3">
        {users?.length === 0 && (
          <div className="grid justify-items-center space-y-2">
            <div>
              <UsersIcon className="h-5 w-5" />
            </div>
            <div>No users are featured</div>
          </div>
        )}
        {users?.map((user: any) => (
          <UserProfile key={user?.id} user={user} showFollow />
        ))}
      </div>
    </FeaturedUsersCard>
  )
}

export default FeaturedUsers
