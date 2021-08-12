import { gql, useQuery } from '@apollo/client'
import { UsersIcon } from '@heroicons/react/outline'
import React from 'react'

import { User } from '../../__generated__/schema.generated'
import UserProfileShimmer from '../shared/Shimmer/UserProfileShimmer'
import UserProfile from '../shared/UserProfile'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { RecentUsersQuery } from './__generated__/RecentUsers.generated'

const RECENT_USERS_QUERY = gql`
  query RecentUsersQuery {
    users(first: 5) {
      edges {
        node {
          id
          username
          hasFollowed
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

const RecentUsersCard = ({ children }: any) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <UsersIcon className="h-4 w-4" />
        <div>Recent users</div>
      </div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

const RecentUsers: React.FC = () => {
  const { data, loading, error } =
    useQuery<RecentUsersQuery>(RECENT_USERS_QUERY)

  if (loading)
    return (
      <RecentUsersCard>
        <div className="space-y-3">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </div>
      </RecentUsersCard>
    )

  return (
    <RecentUsersCard>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {data?.users?.edges?.map((user: any) => (
          <UserProfile
            key={user?.node?.id}
            user={user?.node as User}
            showFollow
          />
        ))}
      </div>
    </RecentUsersCard>
  )
}

export default RecentUsers
